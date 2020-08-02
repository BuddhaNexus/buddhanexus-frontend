import { customElement, html, LitElement, property } from 'lit-element';

import { findColorValues, highlightActiveMainElement } from './textViewUtils';
import {
  getLanguageFromFilename,
  removeDuplicates,
} from '../utility/views-common';
import { getFileTextAndParallels } from '../../api/actions';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view-table.styles';
import { C_HIGHLIGHTED_SEGMENT, C_SELECTED_SEGMENT } from './text-view';
import { TextSegment } from './TextSegment';

@customElement('text-view-right')
export class TextViewRight extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) rightFileName;
  @property({ type: Number }) currentPosition = 0;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: Object }) rightTextData;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;

  // local variables
  @property({ type: String }) activeSegment = undefined;
  @property({ type: String }) endOfRightTextFlag = false;
  @property({ type: Array }) textRight = [];
  @property({ type: Object }) parallels = {};
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;
  @property({ type: String }) noScrolling = false;
  @property({ type: String }) EndlessScrollFlag = false;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  firstUpdated() {
    this.activeSegment = this.rightTextData.selectedParallels[0];
    this.noScrolling = false;
  }

  // TODO This will need some refactoring
  updated(_changedProperties) {
    this.scrollRightText();
    _changedProperties.forEach((oldValue, propName) => {
      if (['rightFileName'].includes(propName)) {
        this.parallels = {};
        this.textRight = [];
        this.noScroolling = false;
      }
    });

    _changedProperties.forEach((oldValue, propName) => {
      if (
        [
          'score',
          'activeSegment',
          'cooccurance',
          'sortMethod',
          'quoteLength',
        ].includes(propName) &&
        !this.fetchLoading
      ) {
        if (!this.fetchLoading) {
          this.fetchDataText();
        }
      }
      if (propName === 'textRight') {
        this.addSegmentObservers();
        if (this.noScrolling) {
          this.scrollAfterEndlessReload();
        }
      }
    });
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'rightTextData') {
        this.noScrolling = false;
        this.activeSegment = this.rightTextData.selectedParallels[0];
        // the following is really just a temporary hack; the update of the segmentnr does not yet work properly; currently, the right text is therefore fetched twice.
        this.fetchDataText();
      }
    });
  }

  scrollAfterEndlessReload() {
    if (this.noScrolling && this.EndlessScrollFlag) {
      if (this.activeSegment) {
        let mainScrollPosition = this.scrollTop;
        let mainElement = document.querySelector('html');
        let mainElementScroll = mainElement.scrollTop;
        let activeElement = this.shadowRoot.getElementById(this.activeSegment);
        if (this.currentPosition > 400) {
          activeElement.scrollIntoView({ block: 'end', inline: 'nearest' });
        } else {
          activeElement.scrollIntoView({ block: 'start', inline: 'nearest' });
        }
        this.scrollTop = mainScrollPosition;
        mainElement.scrollTop = mainElementScroll;
      }
    }
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
    this.endOfRightTextFlag = textleft.length != 800 ? true : false;
    this.textRight = textleft;
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
    this.fetchError = error;
    this.fetchLoading = false;
  }

  async scrollRightText() {
    if (
      !this.noScrolling &&
      !this.fetchLoading &&
      this.shadowRoot.querySelector(`.${C_SELECTED_SEGMENT}`)
    ) {
      let parentWindow = this;
      let parentScroll = parentWindow.scrollTop;
      let mainElement = document.querySelector('html');
      let mainElementScroll = mainElement.scrollTop;
      this.shadowRoot.querySelector(`.${C_SELECTED_SEGMENT}`).scrollIntoView();
      parentWindow.scrollTop = parentScroll;
      mainElement.scrollTop = mainElementScroll;
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
          this.EndlessScrollFlag = true;
          this.currentPosition = parseInt(
            entries[i].target.getAttribute('number')
          );
          set_flag = true;
        }
      }
    };

    const config = {
      root: this.shadowRoot.querySelector('#right-text-column'),
      threshold: 0,
    };

    let observer = new IntersectionObserver(callback, config);
    if (!this.shadowRoot.querySelector('.right-segment')) {
      return;
    }
    let targets = this.shadowRoot.querySelectorAll('.right-segment');
    if (
      this.activeSegment !== undefined &&
      this.activeSegment != targets[0].id
    ) {
      observer.observe(targets[0]);
    }
    if (!this.endOfRightTextFlag) {
      observer.observe(targets[targets.length - 1]);
    }
  }

  displayParallels(e) {
    if (!e || !e.target) {
      return;
    }
    let allSegments = this.shadowRoot.querySelectorAll(
      `.${C_SELECTED_SEGMENT}`
    );
    allSegments.forEach(item => {
      item.classList.remove(C_SELECTED_SEGMENT);
    });
    allSegments = this.shadowRoot.querySelectorAll(`.${C_HIGHLIGHTED_SEGMENT}`);
    allSegments.forEach(item => {
      item.classList.remove(C_HIGHLIGHTED_SEGMENT);
    });
    let selectedWord = e.target;
    let selectedSegment = e.target.parentElement;
    if (selectedSegment.classList.contains('chinese-verse')) {
      selectedSegment = selectedSegment.parentElement;
    }
    this.selectedParallel = selectedSegment;
    if (selectedSegment) {
      selectedWord.classList.add(C_HIGHLIGHTED_SEGMENT);
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
            limitCollection: [this.fileName],
            rightMode: true,
          },
        })
      );
    }
  }

  render() {
    return html`
      ${this.fetchLoading && this.rightFileName
        ? html`
            <bn-loading-spinner></bn-loading-spinner>
          `
        : null}
      ${TextViewLayoutRight(
        this.textRight,
        this.parallels,
        this.displayParallels,
        this.rightTextData,
        this.showSegmentNumbers,
        this.segmentDisplaySide
      )}
    `;
  }
}

const TextViewLayoutRight = (
  textRight,
  parallels,
  clickFunction,
  rightTextData,
  showSegmentNumbers,
  segmentDisplaySide
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
      rightTextData,
      showSegmentNumbers,
      segmentDisplaySide
    );
  });
};

const rightSegmentContainer = (
  segmentNr,
  segText,
  current_parallels,
  number,
  clickFunction,
  rightTextData,
  showSegmentNumbers,
  segmentDisplaySide
) => {
  if (!segmentNr) {
    return null;
  }
  let colorValues = [];
  let rightSideHighlight = 0;
  if (rightTextData.selectedParallels.indexOf(segmentNr) > -1) {
    rightSideHighlight = 1;
    colorValues = highlightActiveMainElement({
      rootSegtext: segText,
      rootSegnr: segmentNr,
      selectedNumbers: rightTextData.selectedParallels,
      startoffset: rightTextData.startoffset,
      endoffset: rightTextData.endoffset,
      rightMode: true,
    });
  } else if (current_parallels[0]) {
    colorValues = findColorValues({
      mainSegment: segText,
      segmentName: segmentNr,
      parallels: current_parallels,
      lang: getLanguageFromFilename(segmentNr),
    });
  }
  let lang = getLanguageFromFilename(segmentNr);
  segText = TextSegment({
    inputData: segText,
    lang: lang,
    colorValues: colorValues,
    onClick: clickFunction,
    highlightMode: rightSideHighlight,
    rightMode: 1,
  });
  return rightSegment(
    segmentNr,
    segText,
    number,
    showSegmentNumbers,
    segmentDisplaySide
  );
};

const rightSegment = (
  segmentNr,
  segText,
  number,
  showSegmentNumbers,
  segmentDisplaySide
) => {
  const displayNumber = `${segmentNr.split(':')[1].split('_')[0]}`;
  let firstDisplayNumber =
    segmentNr.split(':')[1].match('_') && !segmentNr.endsWith('_0')
      ? false
      : true;
  // prettier-ignore
  return html`<span 
                class="right-segment"
                id=${segmentNr}
                title=${displayNumber}
                number="${number}">
                ${firstDisplayNumber
                  ? html`
                    <span
                      class="segment-number"
                      style="float: ${segmentDisplaySide}"
                      show-number="${showSegmentNumbers}">
                        ${displayNumber}
                    </span>`
                  : null
                }
                ${segText}</span>`;
};
