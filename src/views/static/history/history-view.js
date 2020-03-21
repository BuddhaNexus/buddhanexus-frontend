import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('history-view')
export class HistoryView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div id="history">
        <div class="main-border">
          <div class="main-content">
            <p class="construction">HISTORY PAGE</p>
            <p class="construction-sub">Not all views are currently working.</p>
            <p class="construction-sub">
              NOTE: this site is not available for screen sizes under 1000px.
            </p>
            <h1>About this site</h1>
            <p>
              The research into parallels between Buddhist texts of all schools
              has given us a wealth of information about the history of these
              texts and the teachings of the Buddha. It has played an important
              role in changing our perspectives on various topics, like for
              instance the legality of Theravada Bhikkhunī ordination and the
              authenticity of Early Buddhist texts.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
