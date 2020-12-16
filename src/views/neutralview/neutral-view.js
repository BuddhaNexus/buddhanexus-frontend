import { customElement, html, LitElement, property } from 'lit-element';

import './neutral-view-sanskrit';
import './neutral-view-tibetan';
import './neutral-view-chinese';
import './neutral-view-pali';
import './neutral-view-multilang';

import { LANGUAGE_CODES } from '../utility/constants';

@customElement('neutral-view')
export class NeutralView extends LitElement {
  @property({ type: String }) lang;

  render() {
    if (this.lang == LANGUAGE_CODES.SANSKRIT) {
      return html`
        <neutral-view-sanskrit></neutral-view-sanskrit>
      `;
    }
    if (this.lang == LANGUAGE_CODES.TIBETAN) {
      return html`
        <neutral-view-tibetan></neutral-view-tibetan>
      `;
    }
    if (this.lang == LANGUAGE_CODES.CHINESE) {
      return html`
        <neutral-view-chinese></neutral-view-chinese>
      `;
    }
    if (this.lang == LANGUAGE_CODES.PALI) {
      return html`
        <neutral-view-pali></neutral-view-pali>
      `;
    }
   if (this.lang == LANGUAGE_CODES.MULTILANG) {
      return html`
        <neutral-view-multilang></neutral-view-multilang>
      `;
    }     
  }
}
