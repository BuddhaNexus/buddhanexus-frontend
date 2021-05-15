/**
 * @class Switches between the normal english-view and the english-view search results.
 */
import { customElement, html, LitElement, property } from 'lit-element';

import './english-view';

/**
 * TODO
 * add search function
 */

@customElement('english-view-router')
export class EnglishViewRouter extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) folio;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: String }) headerVisibility;
  @property({ type: Boolean }) showSCEnglish;

  render() {
    return html`
      <english-view
        .fileName="${this.fileName}"
        .folio="${this.folio}"
        .showSCEnglish="${this.showSCEnglish}"
        .showSegmentNumbers="${this.showSegmentNumbers}"
        .segmentDisplaySide="${this.segmentDisplaySide}"
        .headerVisibility="${this.headerVisibility}"
      ></english-view>
    `;
  }
}
