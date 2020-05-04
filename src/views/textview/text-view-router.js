/**
 * @class Switches between the normal text-view and the text-view search results.
 */
import { customElement, html, LitElement, property } from 'lit-element';

import './text-view-search';
import './text-view';

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
  @property({ type: Number }) score;
  @property({ type: String }) searchString;
  @property({ type: Function }) setFileName;
  @property({ type: String }) rightFileName = '';
  @property({ type: Object }) rightTextData;
  @property({ type: Object }) middleData = {};
  @property({ type: Object }) leftTextData;
  @property({ type: String }) lang;

  updateTextBySearch(e) {
    this.leftTextData = e.detail;
    this.searchString = null;
  }

  render() {
    if (this.searchString) {
      return html`
        <text-view-search
          lang="${this.lang}"
          .fileName="${this.fileName}"
          .searchString="${this.searchString}"
          @click-result="${this.updateTextBySearch}"
        ></text-view-search>
      `;
    }

    return html`
      <text-view
        .fileName="${this.fileName}"
        .folio="${this.folio}"
        .setFileName="${this.setFileName}"
        .limitCollection="${this.limitCollection}"
        .quoteLength="${this.quoteLength}"
        .cooccurance="${this.cooccurance}"
        .score="${this.score}"
        .searchString="${this.searchString}"
      ></text-view>
    `;
  }
}
