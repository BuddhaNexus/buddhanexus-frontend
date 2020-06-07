import { property, html, customElement, LitElement } from 'lit-element';

import '../numbersview/numbers-view';
import '../graphview/graph-view';
import '../tableview/table-view';
import '../textview/text-view-router';
import '../neutralview/neutral-view';
import { DATA_VIEW_MODES } from './data-view-filters-container';

@customElement('data-view-router')
export class DataViewRouter extends LitElement {
  @property({ type: String }) selectedView;
  @property({ type: Function }) setSelectedView;
  @property({ type: String }) fileName;
  @property({ type: Function }) setFileName;
  @property({ type: Number }) folio;
  @property({ type: String }) searchString;
  @property({ type: String }) sortMethod;
  @property({ type: String }) lang;
  @property({ type: Number }) cooccurance;
  @property({ type: Array }) limitCollection;
  @property({ type: Array }) targetCollection;
  @property({ type: Number }) score;
  @property({ type: Number }) quoteLength;

  render() {
    if (
      this.selectedView === DATA_VIEW_MODES.TEXT ||
      this.selectedView === DATA_VIEW_MODES.TEXT_SEARCH
    ) {
      return html`
        <text-view-router
          .fileName="${this.fileName}"
          .folio="${this.folio}"
          .setFileName="${this.setFileName}"
          .limitCollection="${this.limitCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .score="${this.score}"
          .searchString="${this.searchString}"
          .selectedView="${this.selectedView}"
          .setSelectedView="${this.setSelectedView}"
        ></text-view-router>
      `;
    } else if (this.selectedView === DATA_VIEW_MODES.NUMBERS) {
      return html`
        <numbers-view
          .fileName="${this.fileName}"
          .limitCollection="${this.limitCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .score="${this.score}"
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
          .limitCollection="${this.limitCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .sortMethod="${this.sortMethod}"
          .score="${this.score}"
          .searchString="${this.searchString}"
        ></table-view>
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
