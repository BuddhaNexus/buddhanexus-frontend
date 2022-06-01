import { customElement, html, LitElement, property } from 'lit-element';
import '@vaadin/vaadin-split-layout/theme/material/vaadin-split-layout';
import { getFileText } from '../../api/actions';

import { NOENGLISHTRANSLATION } from '../utility/constants';

import './english-view-header';
import './english-view-table';

@customElement('english-view')
export class EnglishView extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) language;
  @property({ type: String }) folio;
  @property({ type: String }) activeSegment;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: String }) headerVisibility;
  @property({ type: Boolean }) showSCEnglish;
  @property({ type: Boolean }) displaySCEnglish;
  @property({ type: String }) transMethod;

  @property({ type: Array }) rightTextData;
  @property({ type: Array }) middleData;
  @property({ type: Array }) leftTextData;
  @property({ type: Boolean }) fetchLoading = false;

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'fileName') {
        this.activeSegment = 'none';
        if (this.fileName.match(NOENGLISHTRANSLATION)) {
          this.displaySCEnglish = false;
        } else {
          this.displaySCEnglish = this.showSCEnglish;
        }
        this.folio = '';
        this.fetchNewText();
      }
      if (propName === 'showSCEnglish') {
        this.displaySCEnglish = this.showSCEnglish;
      }
      if (propName === 'transMethod') {
        this.fetchNewText();
      }
      if (propName === 'folio') {
        this.activeSegment = this.folio.segment_nr;
        if (this.language == 'chn') {
          this.activeSegment += '_0';
        }
        this.fetchNewText();
      }
    });
  }

  async fetchNewText() {
    if (!this.fileName || this.fetchLoading) {
      return;
    }
    this.fetchLoading = true;
    let folioNumber = '';
    if (this.folio && this.language == 'chn') {
      folioNumber = this.folio.num;
    } else if (this.language == 'chn') {
      folioNumber = '001';
    }
    const { textleft, textmiddle, textright } = await getFileText({
      fileName: this.fileName,
      transmode: this.transMethod,
      folionr: folioNumber,
    });
    this.leftTextData = textleft;
    this.middleData = textmiddle;
    this.rightTextData = textright;
    this.fetchLoading = false;
    this.addedSegmentObservers = false;
  }

  handleSegmentClick = e => {
    this.activeSegment = e.target.id;
  };

  render() {
    return html`
      ${this.fetchLoading
        ? html`
            <bn-loading-spinner></bn-loading-spinner>
          `
        : null}
      <english-view-header
        .fileName="${this.fileName}"
        .displaySCEnglish="${this.displaySCEnglish}"
        .language="${this.language}"
      ></english-view-header>

      <english-view-table
        id="english-view-table"
        .fileName="${this.fileName}"
        .language="${this.language}"
        .displaySCEnglish="${this.displaySCEnglish}"
        .leftTextData="${this.leftTextData}"
        .middleData="${this.middleData}"
        .rightTextData="${this.rightTextData}"
        .activeSegment="${this.activeSegment}"
        .showSegmentNumbers="${this.showSegmentNumbers}"
        .segmentDisplaySide="${this.segmentDisplaySide}"
        .headerVisibility="${this.headerVisibility}"
        .transMethod="${this.transMethod}"
        .handleSegmentClick="${this.handleSegmentClick}"
      ></english-view-table>
    `;
  }
}
