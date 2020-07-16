import { customElement, html, LitElement } from 'lit-element';

import styles from './static/static-view.styles';

@customElement('not-found-view')
export class NotFoundView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h1>PAGE NOT FOUND</h1>
          </div>
        </div>
      </div>
    `;
  }
}
