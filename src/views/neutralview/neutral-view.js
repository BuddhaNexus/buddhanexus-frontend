import { customElement, html, LitElement, property } from 'lit-element';

import './neutral-view-sanskrit';
import './neutral-view-tibetan';
import './neutral-view-chinese';
import './neutral-view-pali';

import { LANGUAGE_CODES } from '../utility/constants';
import { minimumLengthText } from '../data/data-view-subheader';

@customElement('neutral-view')
export class NeutralView extends LitElement {
  @property({ type: String }) lang;

  render() {
    if (this.lang == LANGUAGE_CODES.SANSKRIT) {
      return html`
        <neutral-view-sanskrit
          .minLengthText="${minimumLengthText(this.lang)}"
        ></neutral-view-sanskrit>
      `;
    }
    if (this.lang == LANGUAGE_CODES.TIBETAN) {
      return html`
        <neutral-view-tibetan
          .minLengthText="${minimumLengthText(this.lang)}"
        ></neutral-view-tibetan>
      `;
    }
    if (this.lang == LANGUAGE_CODES.CHINESE) {
      return html`
        <neutral-view-chinese
          .minLengthText="${minimumLengthText(this.lang)}"
        ></neutral-view-chinese>
      `;
    }
    if (this.lang == LANGUAGE_CODES.PALI) {
      return html`
        <neutral-view-pali
          .minLengthText="${minimumLengthText(this.lang)}"
        ></neutral-view-pali>
      `;
    }
  }
}
