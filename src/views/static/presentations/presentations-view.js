import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('presentations-view')
export class PresentationsView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content"></div>
        </div>
      </div>
    `;
  }
}
