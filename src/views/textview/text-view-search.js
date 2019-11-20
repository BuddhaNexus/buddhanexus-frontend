import { customElement, html, LitElement, property } from 'lit-element';

import { getLanguageFromFilename } from '../utility/views-common';
import { highlightTextByOffset } from '../utility/preprocessing';
import { searchFileTextSegments } from '../../api/actions';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view.styles';

@customElement('text-view-search')
export class TextViewLeft extends LitElement {
  @property({ type: String }) searchString;
  @property({ type: String }) fileName;

  @property({ type: Array }) resultSegments;
  @property({ type: String }) fetchLoading = true;
  @property({ type: String }) fetchError;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (['searchString'].includes(propName)) {
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
    const { result, error } = await searchFileTextSegments({
      fileName: this.fileName,
      searchString: this.searchString,
    });
    this.resultSegments = result;
    console.log('RESULTS', this.resultSegments);
    this.fetchLoading = false;
    this.fetchError = error;
  }

  clickedResult(e) {
    let target = e.target;
    if (!target.getAttribute('segment')) {
      target = target.parentElement;
      if (!target.getAttribute('segment')) {
        target = target.parentElement;
      }
    }
    let segment = target.getAttribute('segment');
    let beg = parseInt(target.getAttribute('beg'));
    let end = parseInt(target.getAttribute('end'));
    this.dispatchEvent(
      new CustomEvent('click-result', {
        bubbles: true,
        composed: true,
        detail: {
          selectedParallels: [segment],
          startoffset: beg,
          endoffset: end,
        },
      })
    );
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }
    console.log('rendering text-view search');
    return html`
      <div id="text-view-search-header">
        <strong
          >There are ${this.resultSegments.length} search results for
          "${this.searchString}" in ${this.fileName.toUpperCase()}:</strong
        >
      </div>
      <div id="text-view-search-content">
        ${showResultList(
          this.resultSegments,
          this.searchString,
          this.clickedResult
        )}
      </div>
    `;
  }
}

const showResultList = (resultSegments, searchString, clickFunction) => {
  return resultSegments.map(segment => {
    return resultSegmentContainer(
      segment.segnr,
      segment.segtext,
      searchString,
      clickFunction
    );
  });
};

const resultSegmentContainer = (
  segmentNr,
  segText,
  searchString,
  clickFunction
) => {
  let beg = segText.indexOf(searchString);
  let end = beg + searchString.length;
  segText = highlightTextByOffset(
    [segText],
    beg,
    end,
    getLanguageFromFilename(segmentNr)
  );
  return resultSegment(segmentNr, segText, beg, end, clickFunction);
};

const resultSegment = (segmentNr, segText, beg, end, clickFunction) =>
  html`
    <div
      class="result-segment"
      id="${segmentNr}"
      @click="${clickFunction}"
      segment="${segmentNr}"
      beg="${beg}"
      end="${end}"
    >
      <span class="result-segment-nr">${segmentNr}</span><br />
      <span class="result-text">${segText}</span>
    </div>
  `;
