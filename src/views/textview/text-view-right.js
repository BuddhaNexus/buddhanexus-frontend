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

@customElement('text-view-right')
export class TextViewRight extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) rightFileName;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: Object }) rightTextData;

  @property({ type: String }) activeSegment = 'none';
  @property({ type: Array }) textRight = [];
  @property({ type: Object }) parallels = {};
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;
  @property({ type: String }) noScrolling = false;
  @property({ type: String }) fetchLoadingParallels = true;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  firstUpdated() {
    this.activeSegment = this.rightTextData.selectedParallels[0];
    this.fetchDataText();

    this.noScrolling = false;
  }

  // TODO This will need some refactoring
  updated(_changedProperties) {
    this.scrollRightText();
    _changedProperties.forEach((oldValue, propName) => {
      if (['rightFileName'].includes(propName)) {
        this.parallels = {};
        this.textRight = [];
        this.noScrolling = false;
      }
    });

    _changedProperties.forEach((oldValue, propName) => {
      if (
        [
          'score',
          'rightFileName',
          'activeSegment',
          'cooccurance',
          'sortMethod',
          'quoteLength',
          'limitCollection',
        ].includes(propName)
      ) {
        this.fetchDataText();
      }
    });
    _changedProperties.forEach((oldValue, propName) => {
      if (['parallels', 'textRight'].includes(propName)) {
        this.addSegmentObservers();
      }
    });
    _changedProperties.forEach((oldValue, propName) => {
      if (['rightTextData'].includes(propName)) {
        this.noScrolling = false;
        this.activeSegment = this.rightTextData.selectedParallels[0];
        this.fetchDataText();
      }
    });
  }

  async fetchDataText() {
    if (!this.rightFileName) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;
    const { textleft, parallels, error } = await getFileTextAndParallels({
      fileName: this.rightFileName,
      limit_collection: [this.fileName],
      score: this.score,
      par_length: this.quoteLength,
      co_occ: this.cooccurance,
      active_segment: this.activeSegment,
    });
    this.textRight = this.textRight.concat(textleft);
    this.textRight = removeDuplicates(this.textRight, 'segnr');
    this.textRightBySegNr = {};
    this.textRight.forEach(
      ({ segnr, parallel_ids }) => (this.textRightBySegNr[segnr] = parallel_ids)
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

  async scrollRightText() {
    if (
      !this.noScrolling &&
      this.shadowRoot.querySelector('.selected-segment')
    ) {
      let parentWindow = document
        .querySelector('body > vaadin-app-layout')
        .shadowRoot.querySelector('div:nth-child(5)');
      let parentScroll = parentWindow.scrollTop;
      this.shadowRoot.querySelector('.selected-segment').scrollIntoView();
      parentWindow.scrollTop = parentScroll;
      this.noScrolling = true;
    }
  }

  async addSegmentObservers() {
    if (!this.shadowRoot.querySelector('.right-segment')) {
      return;
    }

    let set_flag = false;
    let callback = entries => {
      for (let i = 0; i <= entries.length; i++) {
        if (entries[i] && entries[i].isIntersecting === true && !set_flag) {
          this.activeSegment = entries[i].target.id;
          set_flag = true;
        }
      }
    };

    const config = {
      root: this.shadowRoot.querySelector('#right-text-column'),
      threshold: 1,
    };

    let observer = new IntersectionObserver(callback, config);
    if (!this.shadowRoot.querySelector('.right-segment')) {
      return;
    }
    let targets = this.shadowRoot.querySelectorAll('.right-segment');
    for (let i = 0; i <= targets.length; i++) {
      if (targets[i] && i > targets.length - 50) {
        observer.observe(targets[i]);
      } else if (targets[i]) {
        observer.unobserve(targets[i]);
      }
    }
  }

  displayParallels(e) {
    if (!e || !e.target) {
      return;
    }
    let allSegments = this.shadowRoot.querySelectorAll('.selected-segment');
    allSegments.forEach(item => {
      item.classList.remove('selected-segment');
    });
    allSegments = this.shadowRoot.querySelectorAll('.highlighted-by-parallel');
    allSegments.forEach(item => {
      item.classList.remove('highlighted-by-parallel');
    });
    let selectedWord = e.target;
    let selectedSegment = e.target.parentElement;
    if (selectedSegment.classList.contains('chn-gatha')) {
      selectedSegment = selectedSegment.parentElement;
    }
    this.selectedParallel = selectedSegment;
    if (selectedSegment) {
      selectedWord.classList.add('highlighted-by-parallel');
      let position = selectedWord.getAttribute('position');
      let segnr = selectedSegment.id;
      let parallels = this.textRightBySegNr[segnr];
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
            rightMode: 1,
          },
        })
      );
    }
  }

  render() {
    if (this.fetchLoading && this.rightFileName) {
      return html`
        <bn-loading-spinner marginAdjust="-340px"></bn-loading-spinner>
      `;
    }

    console.log('rendering text-view right');
    return html`
      ${TextViewLayoutRight(
        this.textRight,
        this.parallels,
        this.displayParallels,
        this.rightTextData
      )}
    `;
  }
}

const TextViewLayoutRight = (
  textRight,
  parallels,
  clickFunction,
  rightTextData
) => {
  if (!textRight || !parallels) {
    return null;
  }
  let number = -1;
  return textRight.map(segment => {
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
    return rightSegmentContainer(
      segnr,
      segtext,
      current_parallels,
      number,
      clickFunction,
      rightTextData
    );
  });
};

const rightSegmentContainer = (
  segmentNr,
  segText,
  current_parallels,
  number,
  clickFunction,
  rightTextData
) => {
  let colorValues = [];
  let rightSideHighlight = 0;
  if (rightTextData.selectedParallels.indexOf(segmentNr) > -1) {
    rightSideHighlight = 1;
    colorValues = highlightActiveMainElement(
      segText,
      segmentNr,
      rightTextData.selectedParallels,
      rightTextData.startoffset,
      rightTextData.endoffset,
      true
    );
  } else if (current_parallels[0]) {
    colorValues = findColorValues(segText, segmentNr, current_parallels);
  }
  let lang = getLanguageFromFilename(segmentNr);
  segText = tokenizeWords(
    segText,
    lang,
    colorValues,
    clickFunction,
    rightSideHighlight,
    1
  );
  return rightSegment(segmentNr, segText, number);
};

const rightSegment = (segmentNr, segText, number) =>
  html`
    <div class="right-segment" id=${segmentNr} number="${number}">
      ${segText}
    </div>
  `;
