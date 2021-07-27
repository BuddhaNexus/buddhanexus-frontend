import { customElement, html, LitElement } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './neutral-view.styles';

@customElement('neutral-view-pali')
export class NeutralViewPali extends LitElement {
  static get styles() {
    return [styles, sharedDataViewStyles];
  }

  render() {
    return html`
      <div class="static-page-container lang_pli">
        <div class="main-border">
          <div class="main-content">
            <h2>Pāli</h2>
            <p>
              The Pāli textual corpus used in BuddhaNexus was obtained from the
              Mahāsaṅgīti Tipiṭaka Buddhavasse 2500: World Tipiṭaka Edition in
              Roman Script. Edited and published by The M.L. Maniratana Bunnag
              Dhamma Society Fund, 2005. Based on the digital edition of the
              Chaṭṭha Saṅgāyana published by the
              <a
                href="https://tipitaka.org/"
                class="content-link"
                target="blank"
                >Vipassana Research Institute (VRI)</a
              >, with corrections and proofreading by the Dhamma Society.
            </p>
            <p>
              The Sutta, Vinaya and Abhidhamma texts have been sourced from the
              <a
                href="https://github.com/suttacentral/bilara-data"
                class="content-link"
                target="blank"
                >SuttaCentral JSON-based segmented texts (Bilara)</a
              >, which have been extensively tested to ensure integrity and
              correctness. These texts have the same segment numbers as in
              <a
                href="https://suttacentral.net"
                class="content-link"
                target="blank"
                >SuttaCentral</a
              >
              and are linked to the corresponding segments on that site.
            </p>
            <p>
              The remaining commentary texts of the Aṭṭhakathā, Tikā, and Anya
              have been sourced from the Chaṭṭha Saṅgāyana as published by the
              Vipassana Research Institute.
            </p>
            <p>
              For the calculation of the Pāli matches, SuttaCentral’s
              hyphenation and stemming algorithms have been used. The minimum
              match length used in the calculations is 30 characters. We believe
              that shorter matches are not useful for the purpose of finding
              parallels.
            </p>
            <span class="copyright"
              >Background image: Courtesy of the Fragile Palm Leaves Collection,
              Bangkok.</span
            >
          </div>
        </div>
      </div>
    `;
  }
}
