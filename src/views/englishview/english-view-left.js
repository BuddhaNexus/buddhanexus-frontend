import { customElement, html, LitElement, property } from 'lit-element';
// import { removeDuplicates } from '../utility/views-common';
// import { getFileText } from '../../api/actions';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './english-view-table.styles';
import { EnglishSegmentContainer } from './EnglishSegment';
// import { C_HIGHLIGHTED_SEGMENT, C_SELECTED_SEGMENT } from './english-view';

@customElement('english-view-left')
export class EnglishViewLeft extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Array }) leftTextData;
  @property({ type: String }) activeSegment;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;
  @property({ type: Function }) handleSegmentClick;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (
        ['leftTextData', 'activeSegment'].includes(propName) &&
        this.activeSegment &&
        this.activeSegment !== 'none'
      ) {
        let allSegments = this.shadowRoot.querySelectorAll(
          '.segment--highlighted'
        );
        if (allSegments) {
          allSegments[0].scrollIntoView();
        }
      }
    });
  }

  render() {
    return html`
      ${this.leftTextData.map(({ segnr, segtext }) =>
        EnglishSegmentContainer({
          segmentNr: segnr,
          segText: segtext,
          activeSegment: this.activeSegment,
          showSegmentNumbers: this.showSegmentNumbers,
          segmentDisplaySide: this.segmentDisplaySide,
          onClick: this.handleSegmentClick,
        })
      )}
    `;
  }
}
