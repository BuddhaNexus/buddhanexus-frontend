import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('projects-view')
export class ProjectsView extends LitElement {
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
          <h2>PROJECTS</h2>
          <p>
            <table class="activity">
              <tr>
                <td><nobr>2016–2019</nobr></td><td>“<a href="https://www.kc-tbts.uni-hamburg.de/research/projects.html" target="_blank" class="content-link">A Canon in the Making: The History of the Formation, Production, and Transmission of the bsTan ’gyur, the Corpus of Treatises in Tibetan Translation.</a>” Jun 2016–Jul 2017, Jul 2018–Jun 2019. Lead by Orna Almogi, funded by the Deutsche Forschungsgemeinschaft (DFG).</td>
              </tr>
              <tr>
                <td><nobr>2015–2017</nobr></td><td>“<a href="https://www.kc-tbts.uni-hamburg.de/research/projects.html" target="_blank" class="content-link">Scholars and Scribes: Leveraging Computerized Tools for Navigating an Uncharted Tibetan Buddhist Philosophical Corpus.</a>” A collaborative project of the Khyentse Center, Universität Hamburg and the The Blavatnik School of Computer Science of the Tel Aviv University. Led by Orna Almogi, Dorji Wangchuk, Nachum Dershowitz, Lior Wolf, funded by the German-Israeli Foundation (GIF).</td>
              </tr>
            </table>
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
