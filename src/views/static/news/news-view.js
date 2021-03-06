import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('news-view')
export class NewsView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h2>
              November 5, 2020: The BuddhaNexus in
              <i>The Digital Orientalist</i>
            </h2>
            <p>
              Matthew Hayes, editor for Buddhist Studies at
              <i>The Digital Orientalist</i> introduces readers to the
              BuddhaNexus project in his online article "<a
                href="https://digitalorientalist.com/2020/11/03/text-matching-at-the-canonical-crossroads-an-introduction-to-buddhanexus-part-i/"
                class="content-link"
                target="blank"
                >Text-Matching at the Canonical Crossroads: An Introduction to
                BuddhaNexus (Part I)</a
              >". The contribution includes interview material with one of the
              project's directors Orna Almogi.
            </p>

            <h2>August 31, 2020: Addition of the GRETIL Sanskrit data</h2>
            <p>
              We are happy to announce that the Sanskrit data from the GRETIL
              collection is now available on BuddhaNexus:
              <a
                href="https://buddhanexus.net/skt/neutral"
                class="content-link"
                target="blank"
                >https://buddhanexus.net/skt/neutral</a
              >
            </p>

            <h2>August 21, 2020: Online publication of BuddhaNexus</h2>
            <p>
              We are happy to announce the online publication of the BuddhaNexus
              database at
              <a
                href="https://buddhanexus.net/"
                class="content-link"
                target="blank"
                >https://buddhanexus.net/</a
              >.
            </p>
            <p>
              BuddhaNexus, a collaborative project of the Khyentse Center,
              Universität Hamburg, is a database devoted to the study of
              Buddhist texts and literary corpora in Pāli, Sanskrit, Tibetan,
              and Chinese—with particular emphasis on evolution of scriptures,
              formation of canons, and intellectual networks—by way of locating
              textual matches within various Buddhist literary corpora and
              texts. The current version includes material in Pāli, Tibetan, and
              Chinese. Sanskrit material will be published soon.
            </p>
            <p>
              Several other features are being currently developed, including
              linking to other databases and generating translingual matches.
            </p>
            <p>
              For questions and/or feedback, please contact us under
              <a
                href="mailto:buddhanexus.info@gmail.com"
                class="content-link"
                target="blank"
                >buddhanexus.info@gmail.com</a
              >.
            </p>
            <p>
              With regards,<br />
              BuddhaNexus Team
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
