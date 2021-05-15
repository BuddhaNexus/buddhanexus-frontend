import { customElement, html, css, LitElement, property } from 'lit-element';

import styles from './english-view-table.styles';
import sharedDataViewStyles from '../data/data-view-shared.styles';
// import { isObjectEmpty } from '../utility/utils';
import './english-view-left';
import './english-view-middle';
import './english-view-right';

@customElement('english-view-table')
export default class EnglishViewTable extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Boolean }) showSCEnglish;
  @property({ type: Array }) leftTextData;
  @property({ type: Array }) middleData;
  @property({ type: Array }) rightTextData;
  @property({ type: String }) activeSegment;
  @property({ type: String }) leftActiveSegment;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: String }) headerVisibility;
  @property({ type: Function }) handleSegmentClick;

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
            <english-view-middle
              lang="en"
              id="english-view-middle"
              .middleData="${this.middleData}"
              .activeSegment="${this.activeSegment}"
              .showSegmentNumbers="${this.showSegmentNumbers}"
              .segmentDisplaySide="${this.segmentDisplaySide}"
              .handleSegmentClick="${this.handleSegmentClick}"
            ></english-view-middle>
          </div>

          ${this.showSCEnglish && this.renderRightData()}
        </vaadin-split-layout>
      </div>
    `;
  }

  renderRightData() {
    return html`
      <div class="right-text-column">
        <english-view-right
          id="english-view-right"
          lang="en"
          .fileName="${this.fileName}"
          .rightTextData="${this.rightTextData}"
          .activeSegment="${this.activeSegment}"
          .showSegmentNumbers="${this.showSegmentNumbers}"
          .segmentDisplaySide="${this.segmentDisplaySide}"
          .handleSegmentClick="${this.handleSegmentClick}"
        ></english-view-right>
      </div>
    `;
  }

  render() {
    if (!this.fileName || !this.leftTextData) {
      return null;
    }
    return html`
      <bn-card light>
        <vaadin-split-layout class="${this.headerVisibility}">
          <div class="left-text-column">
            <english-view-left
              id="english-view-left"
              lang="pli"
              .fileName="${this.fileName}"
              .leftTextData="${this.leftTextData}"
              .activeSegment="${this.activeSegment}"
              .showSegmentNumbers="${this.showSegmentNumbers}"
              .segmentDisplaySide="${this.segmentDisplaySide}"
              .handleSegmentClick="${this.handleSegmentClick}"
            ></english-view-left>
          </div>

          ${this.renderMiddleData()}
        </vaadin-split-layout>
      </bn-card>
    `;
  }
}

