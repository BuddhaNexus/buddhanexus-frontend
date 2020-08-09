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
              The textual corpus used in BuddhaNexus was obtained from the
              Chinese Buddhist Electronic Text Association (CBETA).
            </p>
            <span class="copyright"
              >Background image © The British Library Or.8210/S.3693</span
            >
          </div>
        </div>
      </div>
    `;
  }
}
