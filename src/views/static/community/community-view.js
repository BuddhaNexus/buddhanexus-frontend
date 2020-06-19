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
            <p class="construction">Collaborating Institutions</p>

            <div class="partner">
              <img
                src="/src/assets/img/partner_uni_hamburg.jpg"
                alt="UNI Hamburg"
              />
            </div>
            <div class="partner">
              <img
                src="/src/assets/img/partner_sutta_central.jpg"
                alt="Sutta Central"
              />
            </div>
            <div class="partner">
              <img
                src="/src/assets/img/partner_khyentse_center.jpg"
                alt="Khyentse Center"
              />
            </div>
            <div class="partner">
              <img
                src="/src/assets/img/partner_digital_humanities.jpg"
                alt="Digital Humanities"
              />
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
