import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('presentations-view')
export class PresentationsView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
          <h1>ACTIVITIES</h1>
          <p>
            Since the establishment of the Khyentse Center (KC) various activities, including conferences, workshops, projects, and lectures have been conducted by its members and collaborating colleagues, focusing on various issues concerning the evolution of Buddhist scriptures and the formation of the Buddhist canons. The following is a selection of such activities that in one way or another are connected to the initiation of BuddhaNexus and to its development ever since.
          </p>
          <h2>PRESENTATIONS</h2>
          <p>
            <table class="activity">
              <tr>
                <td>2019</td><td>Sebastian Nehrdich. “A Quotation Network for parallel passages of Buddhist Chinese Sources Based on Million-scale Nearest Neighbor Search.” International Conference Buddhism & Technology: Historical Background and Contemporary Challenges. UBC St. John’s College, September 20–22, 2019.</td>
              </tr>
              <tr>
                <td>2019</td><td>Orna Almogi. “The Formation of the ‘Treatises in [Tibetan] Translation’ (bsTan ’gyur): Some Milestones.” Kyoto University, February 12, 2019.</td>
              </tr>
              <tr>
                <td>2017</td><td>Orna Almogi. “The Making of Canons: Means of Reaching a (Forced) Consensus.” Tokyo University, October 13, 2017.</td>
              </tr>
              <tr>
                <td>2017</td><td>Orna Almogi. “Scholars and Scribes: The Approximate Text Alignment Tool.” 27.09.2017. Panel: “Digital Humanities: ICT Innovations in Classical Studies.” Tsukuba Global Science Week 2017. Tsukuba University, Japan, September 25–27, 2017.</td>
              </tr>
              <tr>
                <td>2016</td><td>Daniel Labenski, Elad Shaked, Orna Almogi, Lena Dankin, Nachum Dershowitz, Lior Wolf. “Intertextuality in Tibetan Texts.” Poster. Israeli Seminar on Computational Linguistics (ISCOL). Haifa, Israel, May 2016.</td>
              </tr>
              <tr>
                <td>2016</td><td>Orna Almogi, Nachum Dershowitz, Dorji Wangchuk, Lior Wolf. “Computerized Tools for Tibetan Textual Studies: Challenges and Solutions.” Panel: “Tibetan Information Technology, Library Resources, and Digital Humanities.” 24.06.2016. XIVth Seminar of the International Association of Tibetan Studies, Bergen, Norway, June 19–25, 2016.</td>
              </tr>
              <tr>
                <td>2015</td><td>Orna Almogi. “The Problem of the Many: Three Solutions to Navigating through the Mass of Tibetan Textual Material.” SOAS, London, April 23, 2015.</td>
              </tr>
              <tr>
                <td>2014</td><td>Orna Almogi, Dorji Wangchuk. “Scholars and Scribes: Leveraging Computerized Tools for Navigating an Uncharted Tibetan Buddhist Philosophical Corpus.” TBRC, Cambridge, MA, October 10, 2014.</td>
              </tr>
              <tr>
                <td>2014</td><td>Orna Almogi, Dorji Wangchuk. “Scholars and Scribes: Leveraging Computerized Tools for Navigating an Uncharted Tibetan Buddhist Philosophical Corpus.” Department of Religion, Columbia University, October 7, 2014.</td>
              </tr>
              <tr>
                <td>2014</td><td>Benjamin Eliot Klein, Nachum Dershowitz, Lior Wolf, Orna Almogi, Dorji Wangchuk. “Finding Inexact Quotations within a Tibetan Buddhist Corpus.” Poster presentation. 10.07.2014. Lausanne, Digital Humanities Conference, July, 7–12 2014.</td>
              </tr>
              <tr>
                <td>2014</td><td>Orna Almogi. “Computerized Tools for the Study of Tibetan Manuscripts and Xylographs: State of Affairs and Future Prospects.” University of Tokyo, July 2, 2014.</td>
              </tr>
              <tr>
                <td>2014</td><td>Orna Almogi. “Computerized Tools for the Study of Tibetan Manuscripts and Xylographs: State of Affairs and Future Prospects.” Dharma Drum Buddhist College, Taiwan, June 30, 2014.</td>
              </tr>
            </table>
          </p>
          </div>
        </div>
      </div>
    `;
  }
}
