import { customElement, html, LitElement, property } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './english-view-table.styles';
import { EnglishSegmentContainer } from './EnglishSegment';

@customElement('english-view-right')
export class EnglishViewRight extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Object }) rightTextData;
  @property({ type: String }) activeSegment;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: Function }) handleSegmentClick;
  @property({ type: Boolean }) displaySCEnglish;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (
        ['rightTextData', 'activeSegment', 'displaySCEnglish'].includes(
          propName
        ) &&
        this.activeSegment &&
        this.activeSegment !== 'none'
      ) {
        let allSegments = this.shadowRoot.querySelectorAll(
          '.segment--highlighted'
        );
        if (allSegments[0]) {
          allSegments[0].scrollIntoView();
        }
      } else {
        let allSegments = this.shadowRoot.querySelectorAll('.segment');
        if (allSegments) {
          allSegments[0].scrollIntoView();
        }
      }
    });
  }

  render() {
    let newActiveSegment = this.activeSegment;
    if (this.activeSegment && this.activeSegment !== 'none') {
      if (this.activeSegment.startsWith('ai-')) {
        newActiveSegment = 'en-' + this.activeSegment.substr(3).split('_')[0];
      } else {
        newActiveSegment = 'en-' + this.activeSegment.split('_')[0];
      }
    }
    return html`
      ${this.rightTextData.map(({ segnr, segtext }) =>
        EnglishSegmentContainer({
          segmentNr: segnr,
          segText: segtext,
          activeSegment: newActiveSegment,
          showSegmentNumbers: this.showSegmentNumbers,
          segmentDisplaySide: this.segmentDisplaySide,
          onClick: this.handleSegmentClick,
        })
      )}
    `;
  }
}
