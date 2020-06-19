import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('institutions-view')
export class InstitutionsView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h2>COLLABORATING INSTITUTIONS</h2>

            <div>Khyentse Center (KC)</div>
            <div class="partner">
              <img
                src="./src/assets/img/partner_khyentse_center.jpg"
                alt="Khyentse Center"
              />
            </div>

            <div>Universität Hamburg (UHH)</div>
            <div class="partner">
              <img
                src="./src/assets/img/partner_uni_hamburg.jpg"
                alt="UNI Hamburg"
              />
            </div>

            <div>SuttaCentral</div>
            <div class="partner">
              <img
                src="./src/assets/img/partner_sutta_central.jpg"
                alt="Sutta Central"
              />
            </div>

            <div>
              International Institute for Digital Humanities, Tokyo (DHII)
            </div>
            <div class="partner">
              <img
                src="./src/assets/img/partner_digital_humanities.jpg"
                alt="Digital Humanities"
              />
            </div>

            <h2>RESOURCES PARTNERS</h2>

            <div>Vipassana Research Institute (VRI)</div>
            <div class="partner">
              <img
                src="./src/assets/img/partner_vipassana_research_institute.jpg"
                alt="VRI"
              />
            </div>

            <div>Asian Classics Input Projects (ACIP)</div>
            <div class="partner">
              <img src="./src/assets/img/partner_acip.jpg" alt="ACIP" />
            </div>

            <div>Buddhist Digital Resource Center (BDRC)</div>
            <div class="partner">
              <img
                src="./src/assets/img/partner_buddhist_digital_resource_center.jpg"
                alt="Buddhist Digital Resource Center"
              />
            </div>

            <div>
              Göttingen Register of Electronic Texts in Indian Languages
              (GRETIL)
            </div>
            <div class="partner">
              <img
                src="./src/assets/img/partner_uni_goettingen.jpg"
                alt="UNI Göttingen"
              />
            </div>

            <div class="partner">
              <img src="./src/assets/img/partner_sub.jpg" alt="SUB" />
            </div>

            <div>Chinese Buddhist Electronic Text Association (CBETA)</div>
            <div class="partner">
              <img src="./src/assets/img/partner_beta.jpg" alt="CBETA" />
            </div>

            <h2>FUNDING INSTITUTIONS</h2>

            <div>Khyentse Center (KC)</div>
            <div class="partner">
              <img
                src="./src/assets/img/partner_khyentse_center.jpg"
                alt="Khyentse Center"
              />
            </div>

            <div>Universität Hamburg (UHH)</div>
            <div class="partner">
              <img
                src="./src/assets/img/partner_uni_hamburg.jpg"
                alt="UNI Hamburg"
              />
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
