import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('institutions-view')
export class InstitutionsView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    //prettier-ignore
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h2>COLLABORATING INSTITUTIONS</h2>

            <div>Khyentse Center (KC)</div>
            <div class="partner">
              <a href="https://www.kc-tbts.uni-hamburg.de/" target="blank">
                <img
                  src="./src/assets/img/partner_khyentse_center.jpg"
                  alt="Khyentse Center" />
              </a>
            </div>

            <div>Universität Hamburg (UHH)</div>
            <div class="partner">
              <a href="https://www.uni-hamburg.de/" target="blank">
                <img
                  src="./src/assets/img/partner_uni_hamburg.jpg"
                  alt="UNI Hamburg" />
              </a>
            </div>

            <div>SuttaCentral</div>
            <div class="partner">
              <a href="https://suttacentral.net/" target="blank">
                <img
                  src="./src/assets/img/partner_sutta_central.jpg"
                  alt="Sutta Central" />
              </a>
            </div>

            <div>
              International Institute for Digital Humanities, Tokyo (DHII)
            </div>
            <div class="partner">
              <a href="https://www.dhii.jp/" target="blank">
                <img
                  src="./src/assets/img/partner_digital_humanities.jpg"
                  alt="Digital Humanities" />
              </a>
            </div>

            <div>
              Resources for Kanjur & Tanjur Studies (rKTs)
            </div>
            <div class="partner">
              <a href="https://www.istb.univie.ac.at/kanjur/rktsneu/sub/index.php" target="blank">
                <img src="./src/assets/img/partner_rkts.jpg" alt="rKTs" />
              </a>
            </div>

            <div>
              Universität Wien
            </div>
            <div class="partner">
              <a href="https://www.univie.ac.at/" target="blank">
                <img
                  src="./src/assets/img/partner_vienna.jpg"
                  alt="UNI Vienna" />
              </a>
            </div>

            <h2>RESOURCES PARTNERS</h2>

            <div>Vipassana Research Institute (VRI)</div>
            <div class="partner">
              <a href="https://tipitaka.org/" target="blank">
                <img
                  src="./src/assets/img/partner_vipassana_research_institute.jpg"
                  alt="VRI" />
              </a>
            </div>

            <div>Asian Classics Input Projects (ACIP)</div>
            <div class="partner">
              <a href="https://asianclassics.org/" target="blank">
                <img src="./src/assets/img/partner_acip.jpg" alt="ACIP" />
              </a>
            </div>

            <div>Buddhist Digital Resource Center (BDRC)</div>
            <div class="partner">
              <a href="https://www.tbrc.org/" target="blank">
                <img
                  src="./src/assets/img/partner_buddhist_digital_resource_center.jpg"
                  alt="Buddhist Digital Resource Center" />
              </a>
            </div>

            <div>
              Göttingen Register of Electronic Texts in Indian Languages
              (GRETIL)
            </div>
            <div class="partner">
              <a href="http://gretil.sub.uni-goettingen.de/" target="blank">
                <img
                  src="./src/assets/img/partner_uni_goettingen.jpg"
                  alt="UNI Göttingen" />
              </a>
            </div>

            <div class="partner">
              <a href="https://www.sub.uni-goettingen.de/" target="blank">
                <img src="./src/assets/img/partner_sub.jpg" alt="SUB" />
              </a>
            </div>

            <div>Chinese Buddhist Electronic Text Association (CBETA)</div>
            <div class="partner">
              <a href="https://www.cbeta.org/" target="blank">
                <img src="./src/assets/img/partner_beta.jpg" alt="CBETA" />
              </a>
            </div>

            <h2>FUNDING INSTITUTIONS</h2>

            <div>Khyentse Center (KC)</div>
            <div class="partner">
              <a href="https://www.kc-tbts.uni-hamburg.de/" target="blank">
                <img
                  src="./src/assets/img/partner_khyentse_center.jpg"
                  alt="Khyentse Center" />
              </a>
            </div>

            <div>Universität Hamburg (UHH)</div>
            <div class="partner">
              <a href="https://www.uni-hamburg.de/" target="blank">
                <img
                  src="./src/assets/img/partner_uni_hamburg.jpg"
                  alt="UNI Hamburg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
