import { customElement, html, LitElement, property } from 'lit-element';
import { removeDuplicates } from '../utility/views-common';
import { getFileTextAndParallels } from '../../api/actions';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view-table.styles';
import { LeftSegmentContainer } from './LeftSegment';
import { C_HIGHLIGHTED_SEGMENT, C_SELECTED_SEGMENT } from './text-view';

@customElement('text-view-left')
export class TextViewLeft extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) currentPosition = 0;
  @property({ type: Object }) leftTextData;
  @property({ type: Number }) score;
  @property({ type: String }) leftActiveSegment;

  // Local variables
  @property({ type: String }) reachedEndOfText = false;
  @property({ type: Array }) textLeft = [];
  @property({ type: Object }) parallels = {};
  @property({ type: String }) noScrolling = true;
  @property({ type: String }) noEndlessScrolling = true;
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;
  @property({ type: Number }) currentPage = 0;
  @property({ type: Object }) textLeftBySegNr = {};
  @property({ type: Boolean }) addedSegmentObservers = false;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  firstUpdated() {
    if (this.leftTextData) {
      return;
    }
    if (this.leftActiveSegment === undefined) {
      this.fetchNewText();
    } else {
      this.leftTextData = { selectedParallels: [this.leftActiveSegment] };
    }
  }

  updated(_changedProperties) {
    this.scrollLeftText();
    _changedProperties.forEach(async (oldValue, propName) => {
      if (propName === 'fileName') {
        this.handleFilenameChanged();
      }

      if (propName === 'leftTextData') {
        this.handleLeftTextDataChanged();
      }

      const fileChanged = [
        'score',
        'cooccurance',
        'quoteLength',
        'limitCollection',
      ].includes(propName);

      if (fileChanged && !this.fetchLoading) {
        console.log('file changed. fetching text');
        await this.fetchNewText();
      }

      if (propName === 'textLeft') {
        console.log({ oldValue });
        console.log(_changedProperties);
      }

      if (propName === 'textLeft' && oldValue) {
        await this.addSegmentObservers();
        this.scrollAfterEndlessReload();
      }

      if (propName === 'currentPage') {
        // todo: append text instead of replacing it.
        console.log('page changed');
        await this.fetchNewText();
        // this.scrollAfterEndlessReload();
      }
    });
  }

  handleLeftTextDataChanged() {
    this.noScrolling = false;
    this.noEndlessScrolling = true;
    this.parallels = {};
    this.textLeft = [];
    this.leftActiveSegment = this.leftTextData.selectedParallels[0];
    this.fetchNewText();
  }

  handleFilenameChanged() {
    this.textLeft = [];
    this.parallels = {};
    this.leftActiveSegment = undefined;
  }

  async fetchNewText() {
    console.log('FETCHING NEW TEXT DATA');
    this.fetchLoading = true;
    const { textleft, parallels, error } = await getFileTextAndParallels({
      fileName: this.fileName,
      limit_collection: this.limitCollection,
      score: this.score,
      par_length: this.quoteLength,
      co_occ: this.cooccurance,
      active_segment: this.leftActiveSegment,
    });
    this.reachedEndOfText = textleft.length !== 200;
    this.textLeft = removeDuplicates(textleft, 'segnr');
    this.textLeftBySegNr = {};
    this.textLeft.forEach(
      ({ segnr, parallel_ids }) => (this.textLeftBySegNr[segnr] = parallel_ids)
    );
    if (parallels.length >= 1) {
      this.parallels = {};
      for (let i = 0; i <= parallels.length; i++) {
        if (parallels[i]) {
          this.parallels[parallels[i].id] = parallels[i];
        }
      }
    }
    this.fetchError = error;
    this.fetchLoading = false;
  }

  scrollAfterEndlessReload() {
    const activeSegment = this.shadowRoot.getElementById(
      this.leftActiveSegment
    );
    if (!activeSegment) {
      return;
    }
    const rootEl = document.querySelector('html');
    const rootElScroll = rootEl.scrollTop;
    activeSegment.scrollIntoView({
      // depends on direction of scrolling (downwards/upwards)
      block: this.currentPosition > 100 ? 'end' : 'start',
      inline: 'nearest',
    });
    rootEl.scrollTop = rootElScroll;
  }

  incrementPage() {
    this.currentPage = this.currentPage + 1;
    this.addedSegmentObservers = false;
  }

  // TODO: Uncomment if this turns out to be needed
  async scrollLeftText() {
    if (this.noScrolling) {
      return;
    }
    let selectedSegment = this.shadowRoot.querySelector('.selected-segment');
    if (!selectedSegment) {
      return;
    }
    const parentWindow = this;
    const parentScroll = parentWindow.scrollTop;
    const mainElement = document.querySelector('html');
    const mainElementScroll = mainElement.scrollTop;
    selectedSegment.scrollIntoView();
    parentWindow.scrollTop = parentScroll;
    mainElement.scrollTop = mainElementScroll;
    this.noScrolling = true;
    const allSegments = this.shadowRoot.querySelectorAll('.selected-segment');

    allSegments.forEach(item => item.classList.remove('selected-segment'));

    this.dispatchEvent(
      new CustomEvent('highlight-left-after-scrolling', {
        bubbles: true,
        composed: true,
        detail: this.leftTextData,
      })
    );
  }

  async addSegmentObservers() {
    // this.scrollLeftText();
    const targets = this.shadowRoot.querySelectorAll('.left-segment');
    if (
      targets.length === 0 ||
      this.reachedEndOfText ||
      this.addedSegmentObservers
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        for (let i = 0; i < entries.length; i++) {
          let entry = entries[i];
          if (!entry.isIntersecting) {
            continue;
          }
          this.leftActiveSegment = entry.target.id;
          this.incrementPage();
          this.noEndlessScrolling = false;
          this.currentPosition = parseInt(entry.target.getAttribute('number'));
          observer.unobserve(entry.target);
          break;
        }
      },
      {
        root: this.shadowRoot.querySelector('#left-text-column'),
      }
    );
    if (
      this.leftActiveSegment !== 'none' &&
      this.leftActiveSegment !== targets[0].id
    ) {
      observer.observe(targets[0]);
    }
    observer.observe(
      targets[targets.length > 100 ? targets.length - 1 : targets.length]
    );
    this.addedSegmentObservers = true;
  }

  handleSegmentClick(e) {
    this.shadowRoot
      .querySelectorAll(`.${C_SELECTED_SEGMENT}`)
      .forEach(el => el.classList.remove(C_SELECTED_SEGMENT));
    this.shadowRoot
      .querySelectorAll(`.${C_HIGHLIGHTED_SEGMENT}`)
      .forEach(el => el.classList.remove(C_HIGHLIGHTED_SEGMENT));
    if (e) {
      this.displayParallels(e.target);
    }
  }

  displayParallels(element) {
    if (!element) {
      return;
    }

    let selectedWord = element;
    let selectedSegment = element.parentElement;
    if (!selectedSegment) {
      return;
    }

    if (selectedSegment.classList.contains('chn-gatha')) {
      selectedSegment = selectedSegment.parentElement;
    }

    selectedWord.classList.add(C_HIGHLIGHTED_SEGMENT);
    const position = selectedWord.getAttribute('position');
    const segnr = selectedSegment.id;
    const parallels = this.textLeftBySegNr[segnr]
      .map(parallel => {
        if (this.parallels[parallel]) return parallel;
      })
      .filter(el => el != null);

    this.dispatchEvent(
      new CustomEvent('active-segment-changed', {
        bubbles: true,
        composed: true,
        detail: {
          activeSegment: segnr,
          position: position,
          selectedParallels: parallels,
          limitCollection: this.limitCollection,
          rightMode: false,
        },
      })
    );
  }

  filterParallels(parallelIds) {
    if (parallelIds.length >= 1) {
      return parallelIds.map(id => this.parallels[id]).filter(el => el != null);
    } else {
      return [];
    }
  }

  render() {
    return html`
      ${this.fetchLoading
        ? html`
            <bn-loading-spinner></bn-loading-spinner>
          `
        : null}
      ${this.textLeft.map(({ parallel_ids, segnr, segtext }, i) =>
        LeftSegmentContainer({
          segmentNr: segnr,
          segText: segtext,
          current_parallels: this.filterParallels(parallel_ids),
          number: i - 1,
          onClick: this.handleSegmentClick,
          leftTextData: this.leftTextData,
          currentSegment: this.leftActiveSegment,
          currentPosition: this.currentPosition,
        })
      )}
    `;
  }
}
