import { customElement, html, LitElement } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './neutral-view.styles';

@customElement('neutral-view-sanskrit')
export class NeutralViewSanskrit extends LitElement {
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
              The textual corpus used in BuddhaNexus was obtained from the
              Göttingen Register of Electronic Texts in Indian Languages (<a
                href="http://gretil.sub.uni-goettingen.de/gretil.html"
                class="content-link"
                target="blank"
                >GRETIL</a
              >) for Sanskrit texts. Due to the huge amount of material, some
              texts from the GRETIL database have been omitted (cumulative pāda
              indexes and duplicate texts from the same source). Moreover, there
              has been no attempt by BuddhaNexus to improve the quality of the
              texts (e.g. removing typos, introducing identical conventions, and
              the like). Some minor changes have, nonetheless, been made for the
              sake of standardization. In order to make the matching process
              feasible, some markup information of the original GRETIL files has
              been neglected.
            </p>
            <p>
              The original structure of the GRETIL collection has been altered
              to some degree. The folders <i>4_rellit/buddh</i> and
              <i>6_sastra/3_phil/buddh/</i> have been merged into one folder.
              This folder has been further divided into subfolders. Also a
              numbering scheme was introduced for the different categories to
              make their identification within the database easier. For example
              "<b>GV01</b>" represents <b>G</b>RETIL <b>V</b>eda 1.
            </p>
            <p>
              For the calculation of the Sanskrit matches and for the global
              search function, a stemming algorithm has been used. This stemming
              algorithm is accessible as a
              <a href="/sanskrit-tools" class="content-link"
                >standalone application</a
              >.
            </p>
            <p>The minimum length for a match has been set to 25 letters.</p>
            <span class="copyright"
              >Background image with courtesy to the Nepal-German Manuscript
              Preservation Project (NGMPP).</span
            >
          </div>
        </div>
      </div>
    `;
  }
}
