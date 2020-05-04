import { customElement, html, LitElement, property } from 'lit-element';
import { removeDuplicates } from '../utility/views-common';
import { getFileTextAndParallels } from '../../api/actions';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view-table.styles';
import { LeftSegmentContainer } from './LeftSegment';
import { C_HIGHLIGHTED_SEGMENT, C_SELECTED_SEGMENT } from './text-view';

/**
 * TODO:
 * - don't remove previous data when endless loading
 */

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

  // TODO - needs refactoring
  updated(_changedProperties) {
    console.log(_changedProperties);
    _changedProperties.forEach(async (oldValue, propName) => {
      if (propName === 'fileName') {
        this.handleFilenameChanged();
      }

      if (propName === 'leftTextData') {
        // this.handleLeftTextDataChanged();
      }

      const fileChanged = [
        'score',
        'cooccurance',
        'quoteLength',
        'limitCollection',
      ].includes(propName);

      if (fileChanged && !this.fetchLoading) {
        await this.fetchNewText();
        this.addSegmentObservers();
      }

      if (propName === 'textLeft') {
        await this.addSegmentObservers();
        if (this.noScrolling && !this.noEndlessScrolling) {
          this.scrollAfterEndlessReload();
        }
      }

      if (propName === 'currentPage') {
        await this.fetchNextPage();
      }
    });
  }

  handleFilenameChanged() {
    this.textLeft = [];
    this.parallels = {};
    this.leftActiveSegment = undefined;
    if (!this.fetchLoading) {
      this.fetchNewText();
    }
  }

  handleLeftTextDataChanged() {
    this.noScrolling = false;
    this.noEndlessScrolling = true;
    this.parallels = {};
    this.textLeft = [];
    this.leftActiveSegment = this.leftTextData.selectedParallels[0];
    this.fetchNewText();
  }

  async fetchNewText() {
    console.log('fetching left text data.');
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

  async fetchNextPage() {
    console.log('fetching NEXT PAGE');
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
    const newPageText = removeDuplicates(textleft, 'segnr');
    newPageText.forEach(
      ({ segnr, parallel_ids }) => (this.textLeftBySegNr[segnr] = parallel_ids)
    );
    if (parallels.length >= 1) {
      parallels.forEach(parallel => {
        if (parallel) {
          this.parallels[parallel.id] = parallel;
        }
      });
    }
    this.textLeft = [...this.textLeft, ...newPageText];
    this.fetchError = error;
    this.fetchLoading = false;
  }

  scrollAfterEndlessReload() {
    const activeSegment = this.shadowRoot.getElementById(
      this.leftActiveSegment
    );
    if (
      !this.noScrolling ||
      this.noEndlessScrolling ||
      !this.leftActiveSegment ||
      !activeSegment
    ) {
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
  }

  async addSegmentObservers() {
    const targets = this.shadowRoot.querySelectorAll('.left-segment');
    if (targets.length === 0 || this.reachedEndOfText) {
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        console.log({ entries });
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.leftActiveSegment = entry.target.id;
            this.incrementPage();
            this.noEndlessScrolling = false;
            this.currentPosition = parseInt(
              entry.target.getAttribute('number')
            );
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: this.shadowRoot.querySelector('#left-text-column'),
      }
    );
    observer.observe(
      targets[targets.length > 100 ? targets.length - 20 : targets.length]
    );
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
    console.log({ textLeft: this.textLeft });
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
