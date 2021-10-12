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
              October 12, 2021:  update of the BuddhaNexus database
            </h2>
            <p>
              We are happy to announce an update of the BuddhaNexus
              database. The following functions have been added:
              <ol>
               <li>The textual matches as presented in the table-view can now be downloaded in excel-format by clicking on the ‘download’ button (found in the header of the table-view to the right of the inquiry text ID).</li>
               <li>The fullscreen mode of all view options was modified so as to allow better use of the screen space.</li>
               <li>Various minor bugs have been fixed to increase the interface usability.</li>  
              </ol>
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


            <h2>
              August 4, 2021: Major updates of BuddhaNexus
            </h2>
            <p>
              We are happy to announce several major updates of BuddhaNexus, as
              follows:
            </p>
            <ol>
              <li>
                First and foremost the Sanskrit corpus has been considerably
                enlarged and now also contains the collection of the
                <a
                  target="_blank"
                  class="content-link"
                  href="http://www.dsbcproject.org"
                  >Digital Sanskrit Buddhist Canon (DSBC, University of the
                  West)</a
                >, and a few other texts obtained from
                <a
                  target="_blank"
                  class="content-link"
                  href="https://suttacentral.net"
                  >SuttaCentral</a
                >. The Sanskrit collection has been accordingly reorganized. For
                practical and structural reasons, the corpus of Buddhist texts
                is thematically arranged in accordance with the organizational
                scheme of the Tibetan Buddhist Canon. An overview of the new
                organization can be found in the sidebar upon clicking the
                triple bar symbol
                <iron-icon
                  class="info-icon"
                  icon="vaadin:vaadin:menu"
                ></iron-icon>
                situated on the left side of the menu bar of the Sanskrit
                category.
              </li>
              <li>
                Another major update has been the publication of multilingual
                matches of Sanskrit texts with their Tibetan translations. The
                multilingual data has been <b>automatically generated</b>.
                Accordingly, the multilingual alignments are currently only
                offered to those texts for which relatively good results could
                be achieved.
              </li>
              <li>
                On the Pāli side, a new “English mode” was introduced. This view
                mode displays the Pāli text together with a
                <b>machine translation</b>
                into English created by the
                <a
                  target="_blank"
                  class="content-link"
                  href="https://github.com/tensorflow/tensor2tensor"
                  >Transformer machine learning model</a
                >. This model is based on English translations by Bhikkhu Sujato
                (Suttas) or Bhikkhu Bhahmali (Vinaya) that were made available
                by SC. Additionally, the original English SC translations are
                also offered whenever available. Note that the machine- made
                translations merely aim at facilitating research and should by
                no means be considered definite.
              </li>
              <li>
                We have also widen our cooperation in terms of linking to other
                databases. Currently links with the following websites are
                available:
                <a
                  target="_blank"
                  class="content-link"
                  href="https://suttacentral.net"
                  >SuttaCentral</a
                >
                and
                <a
                  target="_blank"
                  class="content-link"
                  href="https://tipitaka.org/"
                  >VRI</a
                >
                for Pāli,
                <a
                  target="_blank"
                  class="content-link"
                  href="http://gretil.sub.uni-goettingen.de/gretil.html"
                  >GRETIL</a
                >,
                <a
                  target="_blank"
                  class="content-link"
                  href="http://www.dsbcproject.org"
                  >DSBC</a
                >
                and
                <a
                  target="_blank"
                  class="content-link"
                  href="https://suttacentral.net"
                  >SuttaCentral</a
                >
                for Sanskrit,
                <a
                  target="_blank"
                  class="content-link"
                  href="https://www.bdrc.io/buda-archive/"
                  >BUDA</a
                >
                and
                <a
                  target="_blank"
                  class="content-link"
                  href="https://www.istb.univie.ac.at/kanjur/rktsneu/sub/index.php"
                  >rKTs</a
                >
                for Tibetan, and
                <a target="_blank" class="content-link" href="https://cbeta.org"
                  >CBETA</a
                >,
                <a
                  target="_blank"
                  class="content-link"
                  href="https://suttacentral.net"
                  >SuttaCentral</a
                >
                and
                <a
                  target="_blank"
                  class="content-link"
                  href="https://dazangthings.nz/cbc/"
                  >CBC@</a
                >
                for Chinese.
              </li>
            </ol>
            <p>
              We are currently working on further updates, which will be
              announced in due time.
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
            <h2>
              January 19, 2021: Major update of the BuddhaNexus database
            </h2>
            <p>
              We are happy to announce a major update of the BuddhaNexus
              database. The Tibetan corpus has been enlarged and contains now
              the two paracanonical collections of the rNying ma rgyud ’bum
              (based on the 56-vols. modern edition) and the rNying ma bka’ ma
              (based on the 133 vols. modern edition). The files do not contain
              page numbers yet, but we hope to be able to supplement them in the
              near future.<br />
              This update also includes links to BUDA (at BDRC) of the bKa’
              ’gyur and bsTan ’gyur texts. Links to the rKTs will be provided
              soon.<br />
              We are currently working on further updates, including enlarging
              the Sanskrit corpus to include texts from the Digital Sanskrit
              Buddhist Canon (DSBC) and other projects, and generating
              translingual matches.
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

            <h2>
              January 5, 2021: The BuddhaNexus in
              <i>The Digital Orientalist</i> (Part II)
            </h2>
            <p>
              Matthew Hayes, editor for Buddhist Studies at
              <i>The Digital Orientalist</i> continues to introduce readers to
              the BuddhaNexus project in his online article "<a
                href="https://digitalorientalist.com/2021/01/05/text-matching-at-the-canonical-crossroads-an-introduction-to-buddhanexus-part-ii/"
                class="content-link"
                target="blank"
                >Text-Matching at the Canonical Crossroads: An Introduction to
                BuddhaNexus (Part II)</a
              >". The contribution includes interview material with Sebastian
              Nehrdich, a PhD student working on the technical development of
              BuddhaNexus..
            </p>

            <h2>
              November 5, 2021: The BuddhaNexus in
              <i>The Digital Orientalist</i> (Part I)
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
