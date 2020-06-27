import { customElement, html, LitElement, property } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './neutral-view.styles';

@customElement('neutral-view-pali')
export class NeutralViewPali extends LitElement {
  @property({ type: String }) lang;
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
              Chaṭṭha Saṅgāyana published by the Vipassana Research Institute
              (VRI), with corrections and proofreading by the Dhamma Society.
            </p>
            <p>
              The texts of the Suttas, Vinaya and Abhidhamma use the
              SuttaCentral versions as its base and have been adapted for
              BuddhaNexus. The texts use the same segment numbers as are used in
              SuttaCentral and link to the corresponding segments on that site.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
