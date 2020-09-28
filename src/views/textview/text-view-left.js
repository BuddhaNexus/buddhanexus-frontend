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
  @property({ type: Array }) multiLingualMode;
  @property({ type: String }) leftActiveSegment;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;

  // Local variables
  @property({ type: String }) veryShortText = false;
  @property({ type: String }) reachedEndText = false;
  @property({ type: Array }) textLeft = [];
  @property({ type: Object }) parallels = {};
  @property({ type: String }) noEndlessScrolling = false;
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
      this.handleLeftTextDataChanged();
    } else if (this.leftActiveSegment === undefined) {
      this.fetchNewText();
    } else {
      this.leftTextData = { selectedParallels: [this.leftActiveSegment] };
    }
  }

  updated(_changedProperties) {
    _changedProperties.forEach(async (oldValue, propName) => {
      if (propName === 'fileName' && !this.fetchLoading) {
        if (!('leftTextData' in _changedProperties)) {
          this.handleFilenameChanged();
        }
      }

      if (propName === 'leftTextData') {
        this.handleLeftTextDataChanged();
      }
      if (propName === 'leftActiveSegment') {
        this.noEndlessScrolling = false;
      }

      const fileChanged = [
        'score',
        'cooccurance',
        'quoteLength',
        'limitCollection',
        'multiLingualMode',
      ].includes(propName);

      if (fileChanged && !this.fetchLoading) {
        this.noEndlessScrolling = true;
        await this.fetchNewText();
      }

      if (propName === 'textLeft' && oldValue) {
        this.scrollAfterEndlessReload();
        this.addedSegmentObservers = false;
        await this.addSegmentObservers();
      }

      if (propName === 'currentPage' && !this.fetchLoading) {
        await this.fetchNewText();
        this.scrollAfterEndlessReload();
      }
    });
  }

  handleLeftTextDataChanged() {
    this.addedSegmentObservers = false;
    this.noEndlessScrolling = false;
    this.parallels = {};
    this.textLeft = [];
    this.leftActiveSegment = this.leftTextData.selectedParallels[0];
    this.currentPage = 0;
    this.veryShortText = false;
    this.reachedEndText = false;
    this.fetchNewText();
  }

  handleFilenameChanged() {
    this.addedSegmentObservers = false;
    this.noEndlessScrolling = true;
    this.textLeft = [];
    this.parallels = {};
    this.leftActiveSegment = undefined;
    this.currentPage = 0;
    this.veryShortText = false;
    this.reachedEndText = false;
    this.fetchNewText();
  }

  async fetchNewText() {
    this.fetchLoading = true;

    const { textleft, parallels, error } = await getFileTextAndParallels({
      fileName: this.fileName,
      limit_collection: this.limitCollection,
      score: this.score,
      par_length: this.quoteLength,
      co_occ: this.cooccurance,
      active_segment: this.leftActiveSegment,
      multi_lingual: this.multiLingualMode,
    });
    if (textleft.length !== 800) {
      if (this.leftActiveSegment) {
        this.reachedEndText = true;
      } else {
        this.veryShortText = true;
      }
    }
    this.textLeft = removeDuplicates(textleft, 'segnr');
    this.textLeftBySegNr = {};
    this.textLeft.forEach(
      ({ segnr, parallel_ids }) => (this.textLeftBySegNr[segnr] = parallel_ids)
    );
    this.parallels = {};
    if (parallels.length >= 1) {
      for (let i = 0; i <= parallels.length; i++) {
        if (parallels[i]) {
          this.parallels[parallels[i].id] = parallels[i];
        }
      }
    }
    this.fetchError = error;
    this.fetchLoading = false;
    this.addedSegmentObservers = false;
  }

  scrollAfterEndlessReload() {
    if (this.noEndlessScrolling) {
      return;
    }
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
      block: this.currentPosition > 400 ? 'end' : 'start',
      inline: 'nearest',
    });
    rootEl.scrollTop = rootElScroll;
    this.noEndlessScrolling = true;
  }

  incrementPage() {
    this.currentPage = this.currentPage + 1;
  }

  async addSegmentObservers() {
    if (this.addedSegmentObservers) {
      return;
    }
    const targets = this.shadowRoot.querySelectorAll('.left-segment');
    if (
      targets.length === 0 ||
      this.veryShortText ||
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
          // when an intersecting element is observed, we need to allow scrolling!
          this.noEndlessScrolling = false;
          this.leftActiveSegment = entry.target.id;
          this.incrementPage();
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
      this.leftActiveSegment !== undefined && // ### delete me?
      this.leftActiveSegment !== targets[0].id
    ) {
      observer.observe(targets[0]);
    }
    if (!this.reachedEndText) {
      observer.observe(targets[targets.length - 1]);
    }
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

    if (selectedSegment.classList.contains('chinese-verse')) {
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
          showSegmentNumbers: this.showSegmentNumbers,
          segmentDisplaySide: this.segmentDisplaySide,
        })
      )}
    `;
  }
}
