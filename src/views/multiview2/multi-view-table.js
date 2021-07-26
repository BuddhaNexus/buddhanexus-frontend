import { customElement, html, css, LitElement, property } from 'lit-element';

import styles from './multi-view-table.styles';
import sharedDataViewStyles from '../data/data-view-shared.styles';
import './multi-view-left';
import './multi-view-middle';
import './multi-view-right';

@customElement('multi-view-table')
export default class MultiViewTable extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Boolean }) displaySCEnglish;
  @property({ type: Array }) leftTextData;
  @property({ type: Array }) middleData;
  @property({ type: Array }) rightTextData;
  @property({ type: String }) activeSegment;
  @property({ type: String }) leftActiveSegment;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: String }) headerVisibility;
  @property({ type: String }) transMethod;
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
            <multi-view-middle
              lang="en"
              id="multi-view-middle"
              .middleData="${this.middleData}"
              .activeSegment="${this.activeSegment}"
              .showSegmentNumbers="${this.showSegmentNumbers}"
              .segmentDisplaySide="${this.segmentDisplaySide}"
              .handleSegmentClick="${this.handleSegmentClick}"
            ></multi-view-middle>
          </div>

          ${this.displaySCEnglish && this.renderRightData()}
        </vaadin-split-layout>
      </div>
    `;
  }

  renderRightData() {
    return html`
      <div class="right-text-column">
        <multi-view-right
          id="multi-view-right"
          lang="en"
          .fileName="${this.fileName}"
          .rightTextData="${this.rightTextData}"
          .activeSegment="${this.activeSegment}"
          .showSegmentNumbers="${this.showSegmentNumbers}"
          .segmentDisplaySide="${this.segmentDisplaySide}"
          .handleSegmentClick="${this.handleSegmentClick}"
          .displaySCEnglish="${this.displaySCEnglish}"
        ></multi-view-right>
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
            <multi-view-left
              id="multi-view-left"
              lang="pli"
              trans="${this.transMethod}"
              .fileName="${this.fileName}"
              .leftTextData="${this.leftTextData}"
              .activeSegment="${this.activeSegment}"
              .showSegmentNumbers="${this.showSegmentNumbers}"
              .segmentDisplaySide="${this.segmentDisplaySide}"
              .handleSegmentClick="${this.handleSegmentClick}"
            ></multi-view-left>
          </div>

          ${this.renderMiddleData()}
        </vaadin-split-layout>
      </bn-card>
    `;
  }
}
