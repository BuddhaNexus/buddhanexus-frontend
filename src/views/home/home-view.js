import { customElement, html, LitElement } from 'lit-element';

import styles from './home-view.styles';

@customElement('home-view')
export class HomeView extends LitElement {
  static get styles() {
    return [styles];
  }

  hiddenElement() {
    const element = this.shadowRoot.querySelector('.popup');
    const bgpanel = this.shadowRoot.querySelector('.backgroundpanel');
    element.style.display = 'block';
    bgpanel.style.display = 'block';
  }

  closeElement() {
    const element = this.shadowRoot.querySelector('.popup');
    const bgpanel = this.shadowRoot.querySelector('.backgroundpanel');
    bgpanel.style.display = 'none';
    element.style.display = 'none';
  }

  render() {
    return html`
      <div id="home">
      
        <div class="popup">
            <div class="popup-head">
                <div class="popup-close" @click="${this.closeElement}">x</div>
            </div>
            <div class="popup-content">
                <p>
                  Traditionally, parallels were found by scholars manually, by studying
                  the texts and noting down similarities among various Buddhist schools.
                  With the advent of computer technology, coupled with the ongoing
                  digitization of Buddhist texts, faster and more accurate methods could
                  be developed.
                </p>
                <p>
                  The BuddhaNexus project aims to create a powerful tool to facilitate
                  the study of parallels using neural networks to compare texts.
                </p>
                <p>
                  As a first step, we have concentrated on what we call "Monolingual
                  Matching" i.e. finding parallels within the corpus of texts of the
                  same language, be it Pāli, Sanskrit, Tibetan or Chinese.
                </p>
                <p>
                  The next step is then to train the neural network to do "Multilingual
                  Matching" i.e. finding parallels between languages and with that
                  between the various Buddhist schools. The neural network can be
                  trained with existing translations between the various languages as
                  well as with known parallels and dictionaries. This step would need
                  far greater computer power than we currently have so for this
                  additional financial support needs to be sought.
                </p>
                <p>There are 4 possible views for the texts:</p>
                <ul>
                  <li>
                    Text-view shows the full text of the chosen text with the parallels
                    in a separate frame when a segment is clicked. A third frame shows
                    the corresponding text.
                  </li>
                  <li>
                    Table-view shows a table of all segments of the original file that
                    is selected in the leftmost column with on the right the
                    corresponding parallels.
                  </li>
                  <li>
                    Numbers-view shows a table with only the numbers of the suttas and
                    their segment number for easy reference.
                  </li>
                  <li>
                    Graph-view shows a pie-chart with the distribution of the parallels
                    for the chosen text.
                  </li>
                </ul>
                <p>There are several filters that can be applied:</p>
                <ul>
                  <li>
                    Similarity score: uses Jaro-Winkler string edit distance as a base
                    for calculation. These can vary between 0 and 100%. 100 means
                    perfect similarity, while a lower value indicates less similarity.
                    The default value is at 0.
                  </li>
                  <li>
                    Length of match: Filters by minimum length based on the length of
                    the parallel excluding punctuation.
                  </li>
                  <li>
                    Number of co-occurrences: his score represents how many times a
                    parallel is contained within other parallels. A higher co-occurrence
                    could mean that this is a standard passage that cannot be regarded
                    as a parallel perse.
                  </li>
                  <li>
                    Text- or collection number: Filter parallels by sutta- or
                    collection-number.
                  </li>
                </ul>
                <p>
                  The Visual Charts tab takes you to a visualization of the parallels
                  amongst collections using a sankey-map. This only works for the
                  Tibetan texts at present.
                </p>
                <p>
                  For a detailed plan, methodology and future planned developments,
                  <a href="./download/Buddhanexus.pdf" target="_blank"
                    >please download the pdf here.</a
                  >
                </p>
            </div>
            <div class="popup-footer"></div>
        </div>
        
        

        <div class="main-border">
            <div class="main-content">
                <p class="construction">THIS SITE IS UNDER CONSTRUCTION</p>
                <p class="construction-sub">Not all views are currently working.</p>
                <p class="construction-sub">
                  NOTE: this site is not available for screen sizes under 1000px.
                </p>
                <h1>About this site</h1>
                <p>
                  The research into parallels between Buddhist texts of all schools has
                  given us a wealth of information about the history of these texts and
                  the teachings of the Buddha. It has played an important role in
                  changing our perspectives on various topics, like for instance the
                  legality of Theravada Bhikkhunī ordination and the authenticity of
                  Early Buddhist texts.
                </p>
                
                <p>
                    <div class="more" @click="${this.hiddenElement}">
                        more &gt;
                    </div>                
                </p>
            </div>
            <div class="box-languages" style="display: flex; justify-content: center; flex-wrap: wrap;">
                <a href="" class="link"><img src="./src/assets/img/buddhanexus_pli.jpg" class="lang-img" alt="Buddha Nexus"><br><span class="link-description">Pāli</span></a>
                <a href="" class="link"><img src="./src/assets/img/buddhanexus_skt.jpg" class="lang-img" alt="Buddha Nexus"><br><span class="link-description">Sanskrit</span></a>
                <a href="" class="link"><img src="./src/assets/img/buddhanexus_tib.jpg" class="lang-img" alt="Buddha Nexus"><br><span class="link-description">Tibetisch</span></a>
                <a href="" class="link"><img src="./src/assets/img/buddhanexus_vio.jpg" class="lang-img" alt="Buddha Nexus"><br><span class="link-description">Chinesisch</span></a>
            </div>
        </div>
      
        <div class="backgroundpanel" @click="${this.closeElement}">&nbsp;</div>
    `;
  }
}
