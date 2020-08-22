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
              Chinese Buddhist Electronic Text Association (CBETA).
            </p>
            <p>
              The minimum length for a match has been set to six characters,
              even though due to the allowed variance of characters
              five-syllable matches are detected occasionally as well. In order
              to avoid the over-detection of frequent fixed terms consisting of
              five or more syllables, such instances have been filtered from the
              results.
            </p>
            <span class="copyright"
              >Background image with courtesy to the ICABS, Tokyo(via Prof.
              Ochiai).</span
            >
          </div>
        </div>
      </div>
    `;
  }
}
