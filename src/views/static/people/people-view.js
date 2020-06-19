import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('people-view')
export class PeopleView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h1>PEOPLE</h1>
            <h3>Initiators</h3>
            <p>
              Dr. Orna Almogi<br />
              Sebastian Nehrdich, MA<br />
              Prof. Dr. Dorji Wangchuk
            </p>
            <h3>Textual Matches and Database Programming</h3>
            <p>
              Sebastian Nehrdich (chief programmer; Pāli, Sanskrit, Tibetan,
              Chinese matches)<br />
              Ven. Ayya Vimala (programmer frontend; Pāli data arrangement)<br />
              Hubert Dworczyński (programmer frontend and backend)<br />
              Prof. Dr. Kiyonori Nagasaki (Tibetan visual charts)
            </p>
            <h3>Design</h3>
            <p>
              Lars Wirnhier (web design)<br />
              Noriko Nakagami (logo)
            </p>
            <h3>Photos</h3>
            <p>
              Chinese manuscript: © Research Institute for Old Japanese
              Manuscripts at ICABS<br />
              Tibetan woodblock: © Orna Almogi <br />
              Sanskrit manuscript: Courtesy Nepal-German Manuscript Preservation
              Project (NGMPP)<br />
              Pāli manuscript.: Courtesy Fragile Palm Leaves Collection, Bangkok
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
