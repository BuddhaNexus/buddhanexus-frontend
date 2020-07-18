import { customElement, html, LitElement, property } from 'lit-element';

import '@polymer/paper-toggle-button/paper-toggle-button';

import styles from './data-view-settings-container.styles';

@customElement('data-view-settings-container')
export class DataViewSettingsContainer extends LitElement {
  @property({ type: Function }) toggleShowSegmentNumbers;

  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <paper-toggle-button @checked-changed="${this.toggleShowSegmentNumbers}">
        <span id="show-segment-number">Show Segment Numbers</span>
      </paper-toggle-button>
    `;
  }
}
