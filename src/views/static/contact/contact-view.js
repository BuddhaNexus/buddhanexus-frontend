import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('contact-view')
export class ContactView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <p class="construction">CONTACT PAGE</p>
          </div>
        </div>
      </div>
    `;
  }
}
