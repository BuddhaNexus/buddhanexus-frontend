import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('institutions-view')
export class InstitutionsView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div>
        <div class="main-border">
          <div class="main-content">
            <p class="construction">INSTITUTIONS PAGE</p>
          </div>
        </div>
      </div>
    `;
  }
}
