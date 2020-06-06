import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('events-view')
export class EventsView extends LitElement {
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
            <h2>EVENTS</h2>
            <p>
            <table class="activity">
              <tr>
                <td>2018</td><td>Conference: “<a href="https://www.kc-tbts.uni-hamburg.de/en/events/2018-09-24-conference-evolution-of-scriptures.html" target="_blank" class="link">Evolution of Scriptures, Formation of Canons.</a>” Tokyo. Sept 24–25, 2018.  A collaborative event of the Khyentse Center, Universität Hamburg & University of Tsukuba convened by Orna Almogi & Chizuko Yoshimizu.</td>
              </tr>
              <tr>
                <td>2017</td><td>Hackathon: “<a href="https://www.kc-tbts.uni-hamburg.de/en/events/2017-02-05-hack-away-ii-at-tibetan-buddhist-texts.html" target="_blank" class="link">Hack Away II at Tibetan Buddhist Texts: Hackathon in the Galilee.</a>” Kibbutz Inbar. Feb 5–9, 2017. A collaborative event of the Khyentse Center, Universität Hamburg and The Blavatnik School of Computer Science, the Tel Aviv University.</td>
              </tr>
              <tr>
                <td>2016</td><td>Hachathon: “<a href="https://www.kc-tbts.uni-hamburg.de/en/events/2016-02-14-hack-away-at-tibetan-buddhist-texts.html" target="_blank" class="link">Hack Away at Tibetan Buddhist Texts: Hachathin in the Arava.</a>” Kibbutz Lotan. Feb 14–18, 2016. A collaborative event of the Khyentse Center, Universität Hamburg and The Blavatnik School of Computer Science, the Tel Aviv University.</td>
              </tr>
              <tr>
                <td>2014</td><td>Workshop: “<a href="https://www.kc-tbts.uni-hamburg.de/en/events/2014-03-05-workshop-computerized-tools.html" target="_blank" class="link">Computer Science and Tibetan Historical Documents.</a>” Zichron Yaakov, Israel March, 07, 2014. Convened by Orna Almogi, funded by KC-TBTS, Universität Hamburg.</td>
              </tr>
              <tr>
                <td>2012</td><td>Symposium: “<a href="https://www.kc-tbts.uni-hamburg.de/en/events/2012-07-23-symposium-cross-cultural-transmission-buddhist-texts.html" target="_blank" class="link">Cross-Cultural Transmission of Buddhist Texts: Theories and Practices of Translation.</a>” Hamburg. Jul 23–25, 2012. An event of the Khyentse Center, Universität Hamburg. Convened by Dorji Wangchuk.</td>
              </tr>
            </table>
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
