import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('imprint-view')
export class ImprintView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <p class="construction">IMPRINT PAGE</p>
          </div>
        </div>
      </div>
    `;
  }
}
