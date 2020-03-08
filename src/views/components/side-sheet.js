import { customElement, html, LitElement } from 'lit-element';

import styles from './side-sheet.styles';

@customElement('side-sheet')
export class SideSheet extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <aside class="side-sheet"><slot></slot></aside>
    `;
  }
}
