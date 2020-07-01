import { customElement, html, LitElement, property } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './neutral-view.styles';

@customElement('neutral-view-chinese')
export class NeutralViewChinese extends LitElement {
  @property({ type: String }) lang;
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
              <b
                >The Chinese data has not been uploaded yet and is therefore not
                visible in the database. It will be uploaded soon.</b
              >
            </p>
            <p>
              The textual corpus used in BuddhaNexus was obtained from the
              Chinese Buddhist Electronic Text Association (CBETA).
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
