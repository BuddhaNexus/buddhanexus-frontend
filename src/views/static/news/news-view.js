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
              January 25, 2022:  Authors and Translators Identification Initiative (ATII)
            </h2>
<p style="text-align: justify;">The Khyentse Center is proud to announce the launch of the collaborative undertaking<strong> Authors and Translators Identification Initiative</strong> (ATII).</p>
<p style="text-align: justify;">One of the goals of the BuddhaNexus project is to explore the Buddhist intellectual networks that were active both within and outside the Indic cultural sphere and that were behind the formation of the individual Buddhist scriptures and non-scriptures and of the Buddhist literary corpora containing them as a whole. Such an exploration requires first and foremost an identification, to the extent possible, of the persons involved, including Indic authors, indigenous translators, and <em>paṇḍita</em>s who were members of translation teams. For this purpose, the Authors and Translators Identification Initiative (ATII), which involves collaboration among several institutions and individuals, was launched at the beginning of 2021. </p>
<p style="text-align: justify;">The goal of ATII is the creation of an open source database of all the persons (authors, translators, etc.) involved in the creation of Indic Buddhist texts and the literary corpora containing them, including particularly the Tibetan and Chinese Buddhist Canons. The ATII uses person records instead of name records, and thus disambiguates names when multiple persons have the same name or one person has multiple names. This methodology has never been applied before in the case of the Tibetan Canon.</p>
<p style="text-align: justify;">ATII consists of a group of students and scholars based at the Universität Hamburg, who works, generally speaking, in two teams. The first team, which focuses on the Indo-Tibetan part of ATII, concentrates on identifying persons of relevance to the Tibetan Buddhist Canon, including mainly Indic authors, Tibetan <em>lo tsā bas</em>, and their collaborating <em>paṇḍita</em>s, by using primary and secondary sources. The team, which mainly consists of Orna Almogi, Nicola Bajetta, and Ryan Conlon, closely collaborates with Élie Roux from the Buddhist Digital Resource Center (BDRC). The basis of the data is BDRC’s person records and canonical texts attributions (authors and translators), which was compiled in collaboration with the Resources for Kangyur and Tengyur Studies (rKTs) project, University of Vienna. In the first stage, we extracted information from the colophons of the <em>sDe dge</em> edition of the <em>bKa’ ’gyur</em> and <em>bsTan ’gyur</em> and created a one of a kind database of 1050 persons (300 Tibetans and 750 non-Tibetans, including 500 authors). More than 250 person records have already been added to BUDA, and dozens of duplicate records have been merged. Many authors of Indic texts represented in the GRETIL corpus have also been added to the database during this first stage. The team has been thus far focusing on offering standardized Sanskrit names, adding dates of the persons involved (Indic authors, Tibetan translators, and <em>paṇḍita</em>-translators), and linking these persons to the works in whose creation or translation they were involved. In this context, the team has also created innovative tools to check the temporal coherence of the data, based on assumptions such as that the dates of a translator and a <em>paṇḍita</em> who worked together must necessarily overlap; translators cannot predate the author of the text they translated, and the like. The translation and authorship attributions visible now on BUDA all come from ATII, and is a significant refinement on the existing data. The data will continue to be refined until the end of the project. The data is open source and collaborations are envisioned with other projects, such as 84000.</p>
<p style="text-align: justify;">The second team, which thus far concentrates on linking Indic persons and their works to the Chinese Buddhist Canon, includes Sebastian Nehrdich and Marco Hummel and enjoys collaboration with Michael Radich and Jamie Norrish of the Chinese Buddhist Canonical Attributions database (CBC@).</p><p style="text-align: justify;">The ATII is financially supported by Khyentse Center, Universität Hamburg under the directorship of Dorji Wangchuk.</p>


            <h2>
              October 12, 2021:  update of the BuddhaNexus database
            </h2>
            <p style="text-align: justify;">
              We are happy to announce an update of the BuddhaNexus
              database. The following functions have been added:
              <ol>
               <li>The textual matches as presented in the table-view can now be
               downloaded in excel-format by clicking on the ‘download’ button
               (found in the header of the table-view to the right of the inquiry text ID).</li>
               <li>The fullscreen mode of all view options was modified so as to
               allow better use of the screen space.</li>
               <li>Various minor bugs have been fixed to increase the interface usability.</li>  
              </ol>
            </p>
            <p style="text-align: justify;">
              For questions and/or feedback, please contact us under
              <a
                href="mailto:buddhanexus.info@gmail.com"
                class="content-link"
                target="blank"
                >buddhanexus.info@gmail.com</a
              >.
            </p>
            <p style="text-align: justify;">
              With regards,<br />
              BuddhaNexus Team
            </p>


            <h2>
              August 4, 2021: Major updates of BuddhaNexus
            </h2>
            <p style="text-align: justify;">
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
            <p style="text-align: justify;">
              We are currently working on further updates, which will be
              announced in due time.
            </p>
            <p style="text-align: justify;">
              For questions and/or feedback, please contact us under
              <a
                href="mailto:buddhanexus.info@gmail.com"
                class="content-link"
                target="blank"
                >buddhanexus.info@gmail.com</a
              >.
            </p>
            <p style="text-align: justify;">
              With regards,<br />
              BuddhaNexus Team
            </p>
            <h2>
              January 19, 2021: Major update of the BuddhaNexus database
            </h2>
            <p style="text-align: justify;">
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
            <p style="text-align: justify;">
              For questions and/or feedback, please contact us under
              <a
                href="mailto:buddhanexus.info@gmail.com"
                class="content-link"
                target="blank"
                >buddhanexus.info@gmail.com</a
              >.
            </p>
            <p style="text-align: justify;">
              With regards,<br />
              BuddhaNexus Team
            </p>

            <h2>
              January 5, 2020: The BuddhaNexus in
              <i>The Digital Orientalist</i> (Part II)
            </h2>
            <p style="text-align: justify;">
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
              November 5, 2020: The BuddhaNexus in
              <i>The Digital Orientalist</i> (Part I)
            </h2>

            <p style="text-align: justify;">
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
            <p style="text-align: justify;">
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
            <p style="text-align: justify;">
              We are happy to announce the online publication of the BuddhaNexus
              database at
              <a
                href="https://buddhanexus.net/"
                class="content-link"
                target="blank"
                >https://buddhanexus.net/</a
              >.
            </p>
            <p style="text-align: justify;">
              BuddhaNexus, a collaborative project of the Khyentse Center,
              Universität Hamburg, is a database devoted to the study of
              Buddhist texts and literary corpora in Pāli, Sanskrit, Tibetan,
              and Chinese—with particular emphasis on evolution of scriptures,
              formation of canons, and intellectual networks—by way of locating
              textual matches within various Buddhist literary corpora and
              texts. The current version includes material in Pāli, Tibetan, and
              Chinese. Sanskrit material will be published soon.
            </p>
            <p style="text-align: justify;">
              Several other features are being currently developed, including
              linking to other databases and generating translingual matches.
            </p>
            <p style="text-align: justify;">
              For questions and/or feedback, please contact us under
              <a
                href="mailto:buddhanexus.info@gmail.com"
                class="content-link"
                target="blank"
                >buddhanexus.info@gmail.com</a
              >.
            </p>
            <p style="text-align: justify;">
              With regards,<br />
              BuddhaNexus Team
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
