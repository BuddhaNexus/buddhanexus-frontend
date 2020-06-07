import { customElement, html, LitElement, property } from 'lit-element';

import { getLanguageFromFilename } from '../utility/views-common';
import { highlightTextByOffset } from '../utility/preprocessing';
import { searchFileTextSegments } from '../../api/actions';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view-table.styles';

@customElement('text-view-search')
export class TextViewSearch extends LitElement {
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
        this.fetchSearchResultsData();
      }
    });
  }

  async fetchSearchResultsData() {
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
    this.fetchLoading = false;
    this.fetchError = error;
  }

  handleSearchResultClicked(e) {
    let target = e.target;
    if (!target.getAttribute('segment')) {
      target = target.parentElement;
      if (!target.getAttribute('segment')) {
        target = target.parentElement;
      }
    }
    const segment = target.getAttribute('segment');
    const beg = parseInt(target.getAttribute('beg'));
    const end = parseInt(target.getAttribute('end'));
    const searchResultClickedEvent = new CustomEvent('click-result', {
      bubbles: true,
      composed: true,
      // pass leftTextData from clicked segment.
      // TODO: refactor so that this would navigates to a URL instead of firing an event
      detail: {
        selectedParallels: [segment],
        startoffset: beg,
        endoffset: end,
      },
    });
    this.dispatchEvent(searchResultClickedEvent);
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }

    if (!this.resultSegments) {
      return html`
        <span>No results.</span>
      `;
    }

    return html`
      <div id="text-view-search-header">
        <strong
          >There are ${this.resultSegments.length} search results for
          "${this.searchString}" in ${this.fileName.toUpperCase()}:</strong
        >
      </div>
      <div id="text-view-search-content">
        ${this.resultSegments.map(segment =>
          ResultSegmentContainer(
            segment.segnr,
            segment.segtext,
            this.searchString,
            this.handleSearchResultClicked
          )
        )}
      </div>
    `;
  }
}

function ResultSegmentContainer(
  segmentNr,
  segText,
  searchString,
  clickFunction
) {
  let beg = segText.indexOf(searchString);
  let end = beg + searchString.length;
  segText = highlightTextByOffset({
    textArray: [segText],
    startoffset: beg,
    endoffset: end,
    lang: getLanguageFromFilename(segmentNr),
  });
  return html`
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
}
