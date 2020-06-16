import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('history-view')
export class HistoryView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h1>HISTORY</h1>
            <p>
              BuddhaNexus is an initiative of the
              <a
                target="_blank"
                class="content-link"
                href="https://www.kc-tbts.uni-hamburg.de/"
                >Khyentse Center</a
              >
              that pools the efforts and results of several projects and
              individual research. “<a
                target="_blank"
                class="content-link"
                href="https://www.kc-tbts.uni-hamburg.de/research/projects.html"
                >Scholars and Scribes</a
              >,” a collaborative project of the
              <a
                target="_blank"
                class="content-link"
                href="https://www.kc-tbts.uni-hamburg.de/"
                >Khyentse Center</a
              >, Universität Hamburg (Orna Almogi, Dorji Wangchuk) and
              <a
                target="_blank"
                class="content-link"
                href="https://en-exact-sciences.tau.ac.il/computer"
                >The Blavatnik School of Computer Science</a
              >, Tel Aviv University (Nachum Dershowitz, Lior Wolf) funded by
              the German-Israeli Foundation, was launched in 2015 in order to
              develop computerized tools to advance and facilitate Tibetan
              Buddhist textual scholarship. One of the objectives of the project
              has been the development of a tool for locating (approximate)
              textual matches within Tibetan texts, with a special focus on the
              Tibetan Buddhist canon. For this purpose two auxiliary tools for
              the Tibetan language were also developed: a stemmer and a word
              segmenter.
            </p>
            <p>
              In 2018 another collaborative project was launched between
              Sebastian Nehrdich (Universität Hamburg) and Oliver Hellwig
              (Universität Düsseldorf). This project has focused on the
              development of a word segmentation tool for Sanskrit and on
              “translingual text alignment” of Sanskrit Buddhist texts and their
              Tibetan translations. Later the same approach was applied
              (Nehrdich) to other pairs of “Buddhist languages,” such as
              Sanskrit and Chinese or Chinese and Tibetan. Following this, a
              collaboration was initiated between this project (Nehrdich), which
              mainly focused on translingual text alignment, and the Scholars
              and Scribes project, which focused on monolingual textual matches,
              in order to further facilitate and advance the study of the
              evolution of Buddhist scriptures and the formation of the various
              Buddhist canons. The goal has been to first determine monolingual
              approximate textual matches in each of the textual corpora
              available to us (Pāli, Sanskrit, Tibetan, Chinese) and then,
              whenever possible in terms of the availability of material, create
              the respective translingual alignments.
            </p>
            <p>
              Consequently, with the financial support of the Khyentse Center
              the creation of the BuddhaNexus database has been initiated, the
              technical aspect of which was entrusted to Sebastian Nehrdich
              under the conceptual guidance of Orna Almogi and Dorji Wangcuk.
              Since 2019, Nehrdich has been assisted by Ven. Ayya Vimala of
              <a
                target="_blank"
                class="content-link"
                href="https://suttacentral.net/"
                >SuttaCentral</a
              >, a project focusing on Early Buddhist texts, their translations
              and parallels, and Hubert Dworczyński (financed by the Khyentse
              Center).
            </p>
            <p>
              In order to facilitate the visualization of the results towards
              analysis of the numerous matches, in 2018 a further collaboration
              was initiated with the
              <a
                target="_blank"
                class="content-link"
                href="https://www.dhii.jp/index-e.html"
                >International Institute for Digital Humanities</a
              >
              (DHII), Tokyo (Kiyonori Nagasaki), resulting in the creation of
              visual charts of the matches located in the Tibetan Buddhist
              Canon.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
