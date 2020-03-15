import { customElement, html, LitElement, property } from 'lit-element';

import styles from './side-sheet.styles';

@customElement('side-sheet')
export class SideSheet extends LitElement {
  @property({ type: String }) title = null;
  @property({ type: Boolean }) isOpen = false;

  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <aside class="side-sheet">
        <div class="side-sheet__content">
          <div class="side-sheet__title">${this.title}</div>
          <slot></slot>
        </div>
      </aside>
    `;
  }
}
