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

            </table>
          </p>
          </div>
        </div>
      </div>
    `;
  }
}
