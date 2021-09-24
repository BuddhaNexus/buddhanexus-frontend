import { customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-icons/vaadin-icons.js';

import { createTextViewSegmentUrl } from '../data/dataViewUtils';
import { getLanguageFromFilename } from '../utility/views-common';
import { highlightTextByOffset } from '../utility/preprocessing';
import { searchFileTextSegments } from '../../api/actions';
import '../utility/formatted-segment';

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

  handleReturnButtonClicked() {
    const returnButtonClickedEvent = new CustomEvent('click-return', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(returnButtonClickedEvent);
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }

    return html`
      <div id="return-link" @click="${this.handleReturnButtonClicked}">
        <iron-icon
          id="return-link-arrow"
          icon="vaadin:arrow-left"
          slot="prefix"
        >
        </iron-icon>
        <strong>Return to text-view</strong>
      </div>

      ${this.resultSegments.length == 0
        ? html`
            <div id="text-view-search-header">
              <strong>No results</strong>
            </div>
          `
        : html`
            <div id="text-view-search-header">
              <strong
                >There are ${this.resultSegments.length} search results for
                "${this.searchString}" in
                ${this.fileName.toUpperCase()}:</strong
              >
            </div>
            <div id="text-view-search-content">
              ${this.resultSegments.map(segment =>
                ResultSegmentContainer({
                  segmentNr: segment.segnr,
                  segText: segment.segtext,
                  searchString: this.searchString,
                  rootUrl: createTextViewSegmentUrl(segment.segnr),
                })
              )}
            </div>
          `}
    `;
  }
}

function ResultSegmentContainer({ segmentNr, segText, searchString, rootUrl }) {
  let beg = segText.indexOf(searchString);
  let end = beg + searchString.length;
  let lang = getLanguageFromFilename(segmentNr);
  segText = highlightTextByOffset({
    textArray: [segText],
    startoffset: beg,
    endoffset: end,
    lang: lang,
  });
  //prettier-ignore
  return html`
    <div class="result-segment material-card"
      id="${segmentNr}"
      segment="${segmentNr}"
      beg="${beg}"
      end="${end}">
        <header class="result-segment-list__item-header">
          <formatted-segment
            .segmentnr="${[segmentNr,]}"
            .lang="${getLanguageFromFilename(segmentNr)}"
            .rootUrl="${rootUrl}">
          </formatted-segment>
        </header>
        <div class="horizontal-divider"></div>
        <div class="result-text" lang="${lang}"
        onclick="window.open('${rootUrl}','_blanc');"
        title="Click to open the text at this position">${segText}</div>
    </div>
  `;
}
