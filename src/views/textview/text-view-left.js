import { customElement, html, LitElement, property } from 'lit-element';

import { tokenizeWords } from '../utility/preprocessing';
import { findColorValues, highlightActiveMainElement } from './textViewUtils';
import {
  getLanguageFromFilename,
  removeDuplicates,
} from '../utility/views-common';
import { getFileTextAndParallels } from '../../api/actions';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view.styles';

@customElement('text-view-left')
export class TextViewLeft extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Object }) leftTextData;
  @property({ type: Number }) score;
  @property({ type: String }) leftActiveSegment;

  @property({ type: Array }) textLeft = [];
  @property({ type: Object }) parallels = {};
  @property({ type: String }) noScrolling = true;
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;
  @property({ type: String }) fetchLoadingParallels = true;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  // TODO: see if this might be better done in connectedCallback to avoid extra render
  firstUpdated() {
    if (this.leftActiveSegment == undefined) {
      this.leftActiveSegment = 'none';
    } else {
      this.leftTextData = { selectedParallels: [this.leftActiveSegment] };
    }
    this.fetchDataText();
  }

  // TODO - needs refactoring
  updated(_changedProperties) {
    this.scrollLeftText();
    if (this.leftActiveSegment == undefined) {
      this.leftActiveSegment = 'none';
    }

    _changedProperties.forEach((oldValue, propName) => {
      if (['fileName'].includes(propName)) {
        this.leftActiveSegment = 'none';
        this.parallels = {};
        this.textLeft = [];
      }
    });
    _changedProperties.forEach((oldValue, propName) => {
      if (['leftTextData'].includes(propName)) {
        this.noScrolling = false;
        this.leftActiveSegment = this.leftTextData.selectedParallels[0];
        this.parallels = {};
        this.textLeft = [];
        this.fetchDataText();
      }
      if (['textLeft'].includes(propName)) {
        this.addSegmentObservers();
      }
      if (
        [
          'fileName',
          'leftActiveSegment',
          'score',
          'cooccurance',
          'quoteLength',
          'limitCollection',
        ].includes(propName) &&
        !this.fetchLoading
      ) {
        this.fetchDataText();
      }
    });
  }

  async fetchDataText() {
    if (!this.fileName) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;
    const { textleft, parallels, error } = await getFileTextAndParallels({
      fileName: this.fileName,
      limit_collection: this.limitCollection,
      score: this.score,
      par_length: this.quoteLength,
      co_occ: this.cooccurance,
      active_segment: this.leftActiveSegment,
    });
    this.textLeft = this.textLeft.concat(textleft);
    this.textLeft = removeDuplicates(this.textLeft, 'segnr');
    this.textLeftBySegNr = {};
    this.textLeft.forEach(
      ({ segnr, parallel_ids }) => (this.textLeftBySegNr[segnr] = parallel_ids)
    );
    if (parallels.length >= 1) {
      this.parallels = {};
      for (let i = 0; i <= parallels.length; i++) {
        if (parallels[i]) {
          let current_id = parallels[i].id;
          this.parallels[current_id] = parallels[i];
        }
      }
    }
    this.fetchLoadingParallels = false;
    this.fetchError = error;
    this.fetchLoading = false;
  }

  async scrollLeftText() {
    if (this.noScrolling) {
      return;
    }
    let selectedSegment = this.shadowRoot.querySelector('.selected-segment');
    if (!selectedSegment) {
      return;
    }
    let parentWindow = document
      .querySelector('body > vaadin-app-layout')
      .shadowRoot.querySelector('div:nth-child(5)');
    let parentScroll = parentWindow.scrollTop;
    selectedSegment.scrollIntoView();
    parentWindow.scrollTop = parentScroll;
    this.noScrolling = true;
    let allSegments = this.shadowRoot.querySelectorAll('.selected-segment');

    allSegments.forEach(item => {
      item.classList.remove('selected-segment');
    });

    this.dispatchEvent(
      new CustomEvent('highlight-left-after-scrolling', {
        bubbles: true,
        composed: true,
        detail: this.leftTextData,
      })
    );
  }

  async addSegmentObservers() {
    if (!this.shadowRoot.querySelector('.left-segment')) {
      return;
    }

    let set_flag = false;
    let callback = entries => {
      for (let i = 0; i <= entries.length; i++) {
        if (entries[i] && entries[i].isIntersecting === true && !set_flag) {
          this.leftActiveSegment = entries[i].target.id;
          set_flag = true;
        }
      }
    };

    const config = {
      root: this.shadowRoot.querySelector('#text-view-left'),
      threshold: 1,
    };

    let observer = new IntersectionObserver(callback, config);

    let targets = this.shadowRoot.querySelectorAll('.left-segment');
    for (let i = 0; i <= targets.length; i++) {
      if (targets[i] && i > targets.length - 50) {
        // add observer to the last 10 left-segments
        observer.observe(targets[i]);
      } else if (targets[i]) {
        observer.unobserve(targets[i]);
      }
    }
  }

  displayParallelsEvent(e) {
    let allSegments = this.shadowRoot.querySelectorAll('.selected-segment');
    allSegments.forEach(item => {
      item.classList.remove('selected-segment');
    });
    allSegments = this.shadowRoot.querySelectorAll('.highlighted-by-parallel');
    allSegments.forEach(item => {
      item.classList.remove('highlighted-by-parallel');
    });
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

    this.selectedParallel = selectedSegment;
    selectedWord.classList.add('highlighted-by-parallel');
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
          rightMode: 0,
        },
      })
    );
  }

  render() {
    console.log('rendering text-view left');

    return html`
      ${(this.fetchLoading || this.fetchLoadingParallels) && this.fileName
        ? html`
            <bn-loading-spinner marginAdjust="-300px"></bn-loading-spinner>
          `
        : null}
      ${TextViewLayoutLeft(
        this.textLeft,
        this.parallels,
        this.displayParallelsEvent,
        this.leftTextData
      )}
    `;
  }
}

const TextViewLayoutLeft = (
  textLeft,
  parallels,
  clickFunction,
  leftTextData
) => {
  if (!textLeft || !parallels) {
    return null;
  }
  let number = -1;
  return textLeft.map(segment => {
    const { segnr, segtext, parallel_ids } = segment;
    let current_parallels = [];
    if (parallel_ids.length >= 1) {
      current_parallels = parallel_ids.map(id => {
        return parallels[id];
      });
      current_parallels = current_parallels.filter(function(el) {
        return el != null;
      });
    }
    number += 1;
    return leftSegmentContainer(
      segnr,
      segtext,
      current_parallels,
      number,
      clickFunction,
      leftTextData
    );
  });
};

const leftSegmentContainer = (
  segmentNr,
  segText,
  current_parallels,
  number,
  clickFunction,
  leftTextData
) => {
  let colorValues = [];
  let leftSideHighlight = 0;
  if (leftTextData && leftTextData.selectedParallels.indexOf(segmentNr) > -1) {
    leftSideHighlight = 1;
    colorValues = highlightActiveMainElement(
      segText,
      segmentNr,
      leftTextData.selectedParallels,
      leftTextData.startoffset,
      leftTextData.endoffset,
      false
    );
  }
  if (current_parallels[0]) {
    colorValues = findColorValues(segText, segmentNr, current_parallels);
  }
  let lang = getLanguageFromFilename(segmentNr);
  segText = tokenizeWords(
    segText,
    lang,
    colorValues,
    clickFunction,
    leftSideHighlight
  );
  return leftSegment(segmentNr, segText, number);
};

const leftSegment = (segmentNr, segText, number) => {
  return html`
    <span class="left-segment" id=${segmentNr} number="${number}"
      >${segText}</span
    >
  `;
};
