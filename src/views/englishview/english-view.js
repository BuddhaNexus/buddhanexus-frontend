import { customElement, html, LitElement, property } from 'lit-element';
import '@vaadin/vaadin-split-layout/theme/material/vaadin-split-layout';
import { getFileText } from '../../api/actions';

import './english-view-header';
import './english-view-table';

@customElement('english-view')
export class EnglishView extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) folio;
  @property({ type: String }) activeSegment;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: String }) headerVisibility;
  @property({ type: Boolean }) showSCEnglish;

  @property({ type: Array }) rightTextData;
  @property({ type: Array }) middleData;
  @property({ type: Array }) leftTextData;
  @property({ type: Boolean }) fetchLoading = false;


  firstUpdated() {
    if (this.fileName) {
      this.fetchNewText();
    }
  }

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'fileName') {
        this.fetchNewText();
      }
      if (propName === 'folio') {
        this.activeSegment = this.folio.segment_nr;
        this.fetchNewText();
      }
    });
  }

  handleSegmentClick(e) {
    this.activeSegment = e.target.id;
  }

  async fetchNewText() {
    if (!this.fileName || this.fetchLoading) {
      return;
    }
    this.fetchLoading = true;
    const {textleft, textright} = await getFileText({
      fileName: this.fileName,
      active_segment: this.activeSegment,
    });
// This is a temporary hack as long as english segments are not loaded yet
    this.leftTextData = textleft;
    this.rightTextData = textright;
    this.middleData = this.rightTextData;
    // this.fetchError = error;
    this.fetchLoading = false;
    this.addedSegmentObservers = false;
  }

  render() {
    return html`
      ${this.fetchLoading
        ? html`
            <bn-loading-spinner></bn-loading-spinner>
          `
        : null}
      <english-view-header
        .fileName="${this.fileName}"
        .showSCEnglish="${this.showSCEnglish}"
      ></english-view-header>

      <english-view-table
        id="english-view-table"
        .fileName="${this.fileName}"
        .showSCEnglish="${this.showSCEnglish}"
        .leftTextData="${this.leftTextData}"
        .middleData="${this.middleData}"
        .rightTextData="${this.rightTextData}"
        .activeSegment="${this.activeSegment}"
        .showSegmentNumbers="${this.showSegmentNumbers}"
        .segmentDisplaySide="${this.segmentDisplaySide}"
        .headerVisibility="${this.headerVisibility}"
        .handleSegmentClick="${this.handleSegmentClick}"
      >
      </english-view-table>
    `;
  }
}
