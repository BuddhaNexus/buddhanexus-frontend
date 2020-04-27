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
  @property({ type: String }) endOfLeftTextFlag = false;
  @property({ type: Array }) textLeft = [];
  @property({ type: Object }) parallels = {};
  @property({ type: String }) noScrolling = true;
  @property({ type: String }) noEndlessScrolling = true;
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  firstUpdated() {
    if (this.leftTextData) {
      return;
    }
    if (this.leftActiveSegment === undefined) {
      this.leftActiveSegment = 'none';
      this.fetchDataText();
    } else {
      this.leftTextData = { selectedParallels: [this.leftActiveSegment] };
    }
  }

  // TODO - needs refactoring
  updated(_changedProperties) {
    _changedProperties.forEach(async (oldValue, propName) => {
      if (propName === 'fileName') {
        this.handleFilenameChanged();
      }

      if (propName === 'leftTextData') {
        this.handleLeftTextDataChanged();
      }
      const fileChanged = [
        'leftActiveSegment',
        'score',
        'cooccurance',
        'quoteLength',
        'limitCollection',
      ].includes(propName);
      if (fileChanged && !this.fetchLoading) {
        await this.fetchDataText();
      }
      if (propName === 'textLeft') {
        await this.addSegmentObservers();
        if (this.noScrolling && !this.noEndlessScrolling) {
          this.scrollAfterEndlessReload();
        }
      }
    });
  }

  handleFilenameChanged() {
    this.textLeft = [];
    this.parallels = {};
    this.leftActiveSegment = 'none';
    if (!this.fetchLoading) {
      this.fetchDataText();
    }
  }

  handleLeftTextDataChanged() {
    this.noScrolling = false;
    this.noEndlessScrolling = true;
    this.parallels = {};
    this.textLeft = [];
    this.leftActiveSegment = this.leftTextData.selectedParallels[0];
    this.fetchDataText();
  }

  async fetchDataText() {
    this.fetchLoading = true;
    const { textleft, parallels, error } = await getFileTextAndParallels({
      fileName: this.fileName,
      limit_collection: this.limitCollection,
      score: this.score,
      par_length: this.quoteLength,
      co_occ: this.cooccurance,
      active_segment: this.leftActiveSegment,
    });
    this.endOfLeftTextFlag = textleft.length !== 200;
    console.log({ textleft });
    console.log('removing duplicates');
    this.textLeft = removeDuplicates(textleft, 'segnr');
    console.log(this.textLeft);
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

  async addSegmentObservers() {
    if (!this.shadowRoot.querySelector('.left-segment')) {
      return;
    }
    const observedCallback = entries => {
      for (let i = 0; i <= entries.length; i++) {
        if (entries[i] && entries[i].isIntersecting === true) {
          this.leftActiveSegment = entries[i].target.id;
          this.noEndlessScrolling = false;
          this.currentPosition = parseInt(
            entries[i].target.getAttribute('number')
          );
          break;
        }
      }
    };
    const observer = new IntersectionObserver(observedCallback, {
      root: this.shadowRoot.querySelector('#left-text-column'),
    });
    const targets = this.shadowRoot.querySelectorAll('.left-segment');
    if (
      this.leftActiveSegment !== 'none' &&
      this.leftActiveSegment !== targets[0].id
    ) {
      observer.observe(targets[0]);
    }
    if (!this.endOfLeftTextFlag) {
      observer.observe(targets[targets.length - 1]);
    }
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
    let position = selectedWord.getAttribute('position');
    let segnr = selectedSegment.id;
    let parallels = this.textLeftBySegNr[segnr];
    parallels = parallels.map(parallel => {
      if (this.parallels[parallel]) {
        return parallel;
      }
    });
    parallels = parallels.filter(function(el) {
      return el != null;
    });
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
    console.log(this.textLeft);
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
