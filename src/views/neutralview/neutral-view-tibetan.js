import { customElement, html, LitElement } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './neutral-view.styles';

@customElement('neutral-view-tibetan')
export class NeutralViewTibetan extends LitElement {
  static get styles() {
    return [styles, sharedDataViewStyles];
  }

  render() {
    return html`
      <div class="static-page-container lang_tib">
        <div class="main-border">
          <div class="main-content">
            <h2>Tibetan</h2>
            <p>
              The Tibetan textual corpora used in BuddhaNexus were obtained from
              various sources, including
              <a
                href="https://asianclassics.org/"
                class="content-link"
                target="blank"
                >Asian Classics Input Projects (ACIP)</a
              >
              for the Tibetan Buddhist Canon,
              <a
                href="https://www.tbrc.org/"
                class="content-link"
                target="blank"
                >Buddhist Digital Resource Center (BDRC)</a
              >
              for the rNying ma bka’ ma, and Karma Delek for the rNying ma rgyud
              ’bum. As a result the digital texts might occasionally differ in
              their conventions. Moreover, due to the huge amount of material,
              there has been no attempt by BuddhaNexus to improve the quality of
              the texts (e.g. removing typos, introducing identical conventions,
              and the like). Occasionally, however, some minor changes to the
              texts were made for technical reasons (e.g. standardization of
              transliterations or formats). Since our algorithms search for
              approximate (and not exact) matches, we believe that in most cases
              variants resulting from typos, or from different orthographies and
              the like, should not pose major problems in detecting textual
              matches.
            </p>
            <p>
              Regarding matches involving the Prajñāpāramitā Section of the bKa’
              ’gyur, due to the extremely repetitive nature of this corpus
              within itself, all matches among files of this section have been
              excluded from the results for the sake of a better performance.
            </p>
            <p>
              The minimum match length is 14 syllables. Shorter matches are also
              displayed if the match in either the Inquiry or Hit text is a
              verse line consisting of a precise length of 7, 9, or 11
              syllables. The verse lines are only detected if they are placed
              between a pair of either a single or double stroke (shad) at the
              beginning and a double stroke at the end. Matches that are longer
              than 13 syllables but consist to a large degree of stop words,
              grammatical particles, and the like have been filtered out from
              the results.
            </p>
            <span class="copyright"
              >Background image: Courtesy of Burkhard Quessel.</span
            >
          </div>
        </div>
      </div>
    `;
  }
}
