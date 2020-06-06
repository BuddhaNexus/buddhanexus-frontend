import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('community-view')
export class CommunityView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <p class="construction">community PAGE</p>
          </div>
        </div>
      </div>
    `;
  }
}
