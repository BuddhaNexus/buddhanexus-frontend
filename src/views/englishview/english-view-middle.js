import { customElement, html, LitElement, property } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './english-view-table.styles';
import { LeftSegmentContainer } from './LeftSegment';


@customElement('english-view-middle')
export class EnglishViewMiddle extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Object }) middleData;
  @property({ type: String }) activeSegment;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: Function }) handleSegmentClick;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }
 
  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'middleData' && this.activeSegment && this.activeSegment !== 'none') {
        let allSegments = this.shadowRoot.querySelectorAll('.segment');
        allSegments.forEach(el => {
          if (el.id === 'en-'+this.activeSegment.split('_')[0]) {
            el.scrollIntoView();
          }
        })
      }
    });
  }

  render() {
    let newActiveSegment = this.activeSegment
    if (this.activeSegment && this.activeSegment !== 'none') {
      newActiveSegment = 'en-'+this.activeSegment.split('_')[0]
    }
    return html`
      ${this.middleData.map(({ segnr, segtext }, i) =>
        LeftSegmentContainer({
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
