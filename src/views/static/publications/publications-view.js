import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('publications-view')
export class PublicationsView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div>
        <div class="main-border">
          <div class="main-content">
            <p class="construction">PUBLICATIONS PAGE</p>
          </div>
        </div>
      </div>
    `;
  }
}
