import { property, html, customElement, LitElement } from 'lit-element';

import '../numbersview/numbers-view';
import '../graphview/graph-view';
import '../tableview/table-view';
import '../tableview/table-view-multiling';
import '../textview/text-view-router';
import '../englishview/english-view-router';
import '../neutralview/neutral-view';

import { DATA_VIEW_MODES } from './data-view-filters-container';

@customElement('data-view-router')
export class DataViewRouter extends LitElement {
  @property({ type: String }) selectedView;
  @property({ type: Function }) setSelectedView;
  @property({ type: String }) fileName;
  @property({ type: Function }) setFileName;
  @property({ type: String }) folio;
  @property({ type: String }) searchString;
  @property({ type: String }) multiSearchString;
  @property({ type: String }) activeSegment;
  @property({ type: String }) sortMethod;
  @property({ type: Array }) multiLingualMode;
  @property({ type: String }) lang;
  @property({ type: Number }) cooccurance;
  @property({ type: Array }) limitCollection;
  @property({ type: Array }) targetCollection;
  @property({ type: Number }) score;
  @property({ type: Number }) quoteLength;
  @property({ type: String }) headerVisibility;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: String }) transMethod;
  @property({ type: Boolean }) showSCEnglish;

  render() {
    if (
      this.selectedView === DATA_VIEW_MODES.TEXT ||
      this.selectedView === DATA_VIEW_MODES.TEXT_SEARCH
    ) {
      return html`
        <text-view-router
          .fileName="${this.fileName}"
          .activeSegment="${this.activeSegment}"
          .folio="${this.folio}"
          .setFileName="${this.setFileName}"
          .limitCollection="${this.limitCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .score="${this.score}"
          .multiLingualMode="${this.multiLingualMode}"
          .searchString="${this.searchString}"
          .selectedView="${this.selectedView}"
          .setSelectedView="${this.setSelectedView}"
          .showSegmentNumbers="${this.showSegmentNumbers}"
          .segmentDisplaySide="${this.segmentDisplaySide}"
          .headerVisibility="${this.headerVisibility}"
          .transMethod="${this.transMethod}"
        ></text-view-router>
      `;
    } else if (this.selectedView === DATA_VIEW_MODES.NUMBERS) {
      return html`
        <numbers-view
          .fileName="${this.fileName}"
          .folio="${this.folio}"
          .limitCollection="${this.limitCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .score="${this.score}"
          .headerVisibility="${this.headerVisibility}"
        ></numbers-view>
      `;
    } else if (this.selectedView === DATA_VIEW_MODES.GRAPH) {
      return html`
        <graph-view
          .fileName="${this.fileName}"
          .targetCollection="${this.targetCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .score="${this.score}"
        ></graph-view>
      `;
    } else if (this.selectedView === DATA_VIEW_MODES.TABLE) {
      return html`
        <table-view
          .fileName="${this.fileName}"
          .folio="${this.folio}"
          .limitCollection="${this.limitCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .sortMethod="${this.sortMethod}"
          .score="${this.score}"
          .searchString="${this.searchString}"
          .transMethod="${this.transMethod}"
        ></table-view>
      `;
    } else if (this.selectedView === DATA_VIEW_MODES.MULTILING) {
      return html`
        <table-view-multiling
          .fileName="${this.fileName}"
          .score="${this.score}"
          .multiSearchString="${this.multiSearchString}"
          .multiLingualMode="${this.multiLingualMode}"
          .transMethod="${this.transMethod}"
        ></table-view-multiling>
      `;
    } else if (this.selectedView === DATA_VIEW_MODES.ENGLISH) {
      return html`
        <english-view-router
          .fileName="${this.fileName}"
          .folio="${this.folio}"
          .showSCEnglish="${this.showSCEnglish}"
          .showSegmentNumbers="${this.showSegmentNumbers}"
          .segmentDisplaySide="${this.segmentDisplaySide}"
          .headerVisibility="${this.headerVisibility}"
          .transMethod="${this.transMethod}"
        ></english-view-router>
      `;
    } else if (this.selectedView === DATA_VIEW_MODES.NEUTRAL) {
      return html`
        <neutral-view .lang="${this.lang}"></neutral-view>
      `;
    } else {
      return html`
        <h2>Select the view mode.</h2>
      `;
    }
  }
}
