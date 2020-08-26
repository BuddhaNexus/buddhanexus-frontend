import { customElement, html, css, LitElement, property } from 'lit-element';

import styles from './text-view-table.styles';
import sharedDataViewStyles from '../data/data-view-shared.styles';
import { isObjectEmpty } from '../utility/utils';

@customElement('text-view-table')
export default class TextViewTable extends LitElement {
  @property({ type: String }) lang;
  @property({ type: String }) fileName;
  @property({ type: Object }) leftTextData;
  @property({ type: Object }) middleData = {};
  @property({ type: Object }) rightTextData;
  @property({ type: String }) rightFileName = '';
  @property({ type: Number }) score;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: String }) leftActiveSegment;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;

  @property({ type: Function }) toggleMiddleData;
  @property({ type: Function }) highlightLeftAfterScrolling;
  @property({ type: Function }) handleMouseOver;
  @property({ type: Function }) handleParallelClicked;
  @property({ type: String }) headerVisibility;

  static get styles() {
    return [
      styles,
      sharedDataViewStyles,
      css`
        .middle-right-texts-container {
          min-width: 30%;
        }
      `,
    ];
  }

  renderMiddleData() {
    //prettier-ignore
    return html`
      <div class="middle-right-texts-container">
        <vaadin-split-layout class="${this.headerVisibility}">
          <div class="middle-text-column">
            <text-view-middle
              id="text-view-middle"
              lang="${this.lang}"
              .score="${this.score}"
              .fileName="${this.fileName}"
              .quoteLength="${this.quoteLength}"
              .limitCollection="${this.limitCollection}"
              .cooccurance="${this.cooccurance}"
              .data="${this.middleData}"
              .leftActiveSegment="${this.leftActiveSegment}"
              @mouseover-parallel="${this.handleMouseOver}"
              @click-parallel="${this.handleParallelClicked}">
            </text-view-middle>
          </div>

          ${this.rightFileName && this.renderRightData()}
        </vaadin-split-layout>
      </div>
    `;
  }

  renderRightData() {
    return html`
      <div class="right-text-column">
        <text-view-right
          id="text-view-right"
          lang="${this.lang}"
          .fileName="${this.fileName}"
          .rightFileName="${this.rightFileName}"
          .rightTextData="${this.rightTextData}"
          .score="${this.score}"
          .limitCollection="${this.limitCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .showSegmentNumbers="${this.showSegmentNumbers}"
          .segmentDisplaySide="${this.segmentDisplaySide}"
          @active-segment-changed="${this.toggleMiddleData}"
        ></text-view-right>
      </div>
    `;
  }

  render() {
    const showMiddleData = !isObjectEmpty(this.middleData);

    if (!this.fileName) {
      return null;
    }

    return html`
      <bn-card light>
        <vaadin-split-layout class="${this.headerVisibility}">
          <div class="left-text-column">
            <text-view-left
              id="text-view-left"
              lang="${this.lang}"
              .fileName="${this.fileName}"
              .leftTextData="${this.leftTextData}"
              .score="${this.score}"
              .limitCollection="${this.limitCollection}"
              .quoteLength="${this.quoteLength}"
              .cooccurance="${this.cooccurance}"
              .leftActiveSegment="${this.leftActiveSegment}"
              .showSegmentNumbers="${this.showSegmentNumbers}"
              .segmentDisplaySide="${this.segmentDisplaySide}"
              @active-segment-changed="${this.toggleMiddleData}"
              @highlight-left-after-scrolling="${this
                .highlightLeftAfterScrolling}"
            ></text-view-left>
          </div>

          ${showMiddleData ? this.renderMiddleData() : null}
        </vaadin-split-layout>
      </bn-card>
    `;
  }
}
