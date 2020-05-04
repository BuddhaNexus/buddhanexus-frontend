import { property, html, customElement, LitElement } from 'lit-element';

import '../numbersview/numbers-view';
import '../graphview/graph-view';
import '../tableview/table-view';
import '../textview/text-view-router';
import { DATA_VIEW_MODES } from './data-view-filters-container';

@customElement('data-view-router')
export class DataViewRouter extends LitElement {
  @property({ type: String }) selectedView;
  @property({ type: String }) fileName;
  @property({ type: Function }) setFileName;
  @property({ type: Number }) folio;
  @property({ type: String }) searchString;
  @property({ type: String }) sortMethod;
  @property({ type: Number }) cooccurance;
  @property({ type: Array }) limitCollection;
  @property({ type: Array }) targetCollection;
  @property({ type: Number }) score;
  @property({ type: Number }) quoteLength;

  render() {
    if (this.selectedView === DATA_VIEW_MODES.TEXT) {
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
    }
    return html`
      <h2>Select the view mode.</h2>
    `;
  }
}
