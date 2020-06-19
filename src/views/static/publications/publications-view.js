import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('publications-view')
export class PublicationsView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
          <h1>PUBLICATIONS</h1>
          <p>
            <table class="activity">
              <tr>
                <td>2019</td><td>Orna Almogi. “The Human behind the Divine: An Investigation into the Evolution of Scriptures with Special Reference to the Ancient Tantras of Tibetan Buddhism.” In Volker Caumanns, Marta Sernesi, Nikolai Solmsdorf (eds.), Unearthing Himalayan Treasures: Festschrift for Franz-Karl Ehrhard. Indica et Tibetica 59. Marburg: Indica et Tibetica Verlag, 1–26. </td>
              </tr>
              <tr>
                <td>2019</td><td>Orna Almogi, Lena Dankin, Nachum Dershowitz, Lior Wolf. “<a href="https://jdmdh.episciences.org/5058/pdf" target="_blank" class="content-link">A Hackathon for Classical Tibetan.</a>” Journal of Data Mining and Digital Humanities. Episciences.org. Special Issue on Computer Aided Processing of Intertextuality in Ancient Languages, 1–10.</td>
              </tr>
              <tr>
                <td>2018</td><td>Oliver Hellwig, Sebastian Nehrdich. “<a href="https://www.aclweb.org/anthology/D18-1295.pdf" target="_blank" class="content-link">Sanskrit Word Segmentation Using Character-level Recurrent and Convolutional Neural Networks.</a>” Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing, 2754–2763.</td>
              </tr>
              <tr>
                <td>2018</td><td>Orna Almogi, Lena Dankin, Nachum Dershowitz, Yair Hoffman, Dimitri Pauls, Dorji Wangchuk, Lior Wolf. “<a href="" target="_blank" class="content-link">Stemming and Segmentation for Classical Tibetan.</a>” In A. Gelbukh (ed.), Proceedings of the Seventeenth International Conference on Computational Linguistics and Intelligent Text Processing (CICLing), Konya, Turkey (April 2016). Revised Selected Papers, Part I. Lecture Notes in Computer Science, vol. 9623. Springer-Verlag, Switzerland, 294–306.</td>
              </tr>
              <tr>
                <td>2016</td><td>Dorji Wangchuk (ed.). Cross-Cultural Transmission of Buddhist Texts: Theories and Practices of Translation. Indian and Tibetan Studies 5, Hamburg: Department of Indian and Tibetan Studies, Universität Hamburg.</td>
              </tr>
              <tr>
                <td>2016</td><td>Daniel Labenski. <a href="http://www.cs.tau.ac.il/thesis/thesis/Labenski.Daniel-MSc-thesis.pdf" target="_blank" class="content-link">Finding Inter-textual Relations in Historical Texts</a>, Tel Aviv University. M.Sc. thesis</td>
              </tr>
              <tr>
                <td>2014</td><td>Benjamin Eliot Klein, Nachum Dershowitz, Lior Wolf, Orna Almogi, Dorji Wangchuk. “<a href="https://dh2014.files.wordpress.com/2014/07/dh2014_abstracts_proceedings_07-11.pdf" target="_blank" class="content-link">Finding inexact quotations within a Tibetan Buddhist corpus.</a>” In: Digital Humanities (DH) 2014: 486–488, Lausanne.</td>
              </tr>
          </table>
          </p>
          </div>
        </div>
      </div>
    `;
  }
}
