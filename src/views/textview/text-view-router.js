/**
 * @class Switches between the normal text-view and the text-view search results.
 */
import { customElement, html, LitElement, property } from 'lit-element';

import './text-view-search';
import './text-view';
import { DATA_VIEW_MODES } from '../data/data-view-filters-container';

/**
 * TODO
 * - Add text view search to URL path
 * - remove activesegments attribute in middle text
 */

@customElement('text-view-router')
export class TextViewRouter extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) folio;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: String }) activeSegment;
  @property({ type: Number }) score;
  @property({ type: String }) searchString;
  @property({ type: Array }) multiLingualMode;
  @property({ type: Function }) setFileName;
  @property({ type: String }) rightFileName = '';
  @property({ type: Object }) rightTextData;
  @property({ type: Object }) middleData = {};
  @property({ type: Object }) leftTextData;
  @property({ type: String }) lang;
  @property({ type: String }) selectedView;
  @property({ type: Function }) setSelectedView;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: String }) headerVisibility;
  @property({ type: String }) transMethod;

  handleSearchResultClicked(e) {
    this.leftTextData = e.detail;
    this.setSelectedView(DATA_VIEW_MODES.TEXT);
  }

  handleReturnButtonClicked() {
    this.setSelectedView(DATA_VIEW_MODES.TEXT);
  }

  render() {
    if (this.selectedView === DATA_VIEW_MODES.TEXT_SEARCH) {
      return html`
        <text-view-search
          .lang="${this.lang}"
          .fileName="${this.fileName}"
          .searchString="${this.searchString}"
          .transMethod="${this.transMethod}"
          @click-result="${this.handleSearchResultClicked}"
          @click-return="${this.handleReturnButtonClicked}"
        ></text-view-search>
      `;
    }

    return html`
      <text-view
        .fileName="${this.fileName}"
        .folio="${this.folio}"
        .transMethod="${this.transMethod}"
        .setFileName="${this.setFileName}"
        .limitCollection="${this.limitCollection}"
        .leftTextData="${this.leftTextData}"
        .leftActiveSegment="${this.activeSegment}"
        .quoteLength="${this.quoteLength}"
        .cooccurance="${this.cooccurance}"
        .score="${this.score}"
        .multiLingualMode="${this.multiLingualMode}"
        .searchString="${this.searchString}"
        .showSegmentNumbers="${this.showSegmentNumbers}"
        .segmentDisplaySide="${this.segmentDisplaySide}"
        .headerVisibility="${this.headerVisibility}"
      ></text-view>
    `;
  }
}
