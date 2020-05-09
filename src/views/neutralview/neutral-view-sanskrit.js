import { customElement, html, LitElement, property } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './neutral-view.styles';

@customElement('neutral-view-sanskrit')
export class NeutralViewSanskrit extends LitElement {
  @property({ type: String }) lang;
  static get styles() {
    return [styles, sharedDataViewStyles];
  }
  render() {
      return html`
        <p>Sanskrit</p>
      `;
    }
}
