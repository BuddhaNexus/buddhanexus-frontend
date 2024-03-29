import { customElement, html, LitElement } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './neutral-view.styles';

@customElement('neutral-view-chinese')
export class NeutralViewChinese extends LitElement {
  static get styles() {
    return [styles, sharedDataViewStyles];
  }

  render() {
    return html`
      <div class="static-page-container lang_chn">
        <div class="main-border">
          <div class="main-content">
            <h2>Chinese</h2>
            <p>
              The textual corpus used in BuddhaNexus was obtained from the
              <a
                href="https://www.cbeta.org/"
                class="content-link"
                target="blank"
              >
                Chinese Buddhist Electronic Text Association (CBETA)</a
              >.
            </p>
            <p>
              The minimum length for a match has been set to six characters.
              However, five-character matches are occasionally also detected due
              to our policy of “approximate matches” rather than exact ones.<br />
              Matches consisting to a large degree of frequent fixed terms have
              been filtered out from the results.
            </p>
            <span class="copyright"
              >Background image: Courtesy of the International College for
              Postgraduate Buddhist Studies (ICABS), Tokyo.</span
            >
          </div>
        </div>
      </div>
    `;
  }
}
