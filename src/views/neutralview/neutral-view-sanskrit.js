import { customElement, html, LitElement, property } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './neutral-view.styles';

@customElement('neutral-view-sanskrit')
export class NeutralViewSanskrit extends LitElement {
  @property({ type: String }) lang;
  static get styles() {
    return [styles, sharedDataViewStyles];
  }
  render() {
    return html`
      <div class="static-page-container lang_skt">
        <div class="main-border">
          <div class="main-content">
            <h2>Sanskrit</h2>
            <p>
              <b
                ><font size="+1"
                  >The Sanskrit data will be uploaded soon.</font
                ></b
              >
            </p>
            <p>
              The textual corpus used in BuddhaNexus was obtained from the
              Göttingen Register of Electronic Texts in Indian Languages
              (GRETIL) for Sanskrit texts. Due to the huge amount of material,
              some texts from the GRETIL database have been omitted (cumulative
              pāda indexes and duplicate texts from the same source). Moreover,
              there has been no attempt by BuddhaNexus to improve the quality of
              the texts (e.g. removing typos, introducing identical conventions,
              and the like). Some minor changes have, nonetheless, been made for
              the sake of standardization.
            </p>
            <p>
              For the calculation of the Sanskrit matches, a stemming algorithm
              has been used. This stemming algorithm is accessible as a
              standalone application <a href="/tools/sanskrit">here</a>.
            </p>
            <span class="copyright"
              >Background image: Courtesy of the Nepal-German Manuscript
              Preservation Project (NGMPP).</span
            >
          </div>
        </div>
      </div>
    `;
  }
}
