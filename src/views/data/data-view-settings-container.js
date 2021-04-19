import { customElement, html, LitElement, property } from 'lit-element';

import '@polymer/paper-toggle-button/paper-toggle-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-group';

import styles from './data-view-settings-container.styles';

@customElement('data-view-settings-container')
export class DataViewSettingsContainer extends LitElement {
  @property({ type: Function }) toggleShowSegmentNumbers;
  @property({ type: String }) lang;
  @property({ type: Function }) toggleSegmentDisplaySide;
  @property({ type: Function }) toggleTransMode;

  static get styles() {
    return [styles];
  }

  render() {
    if (this.lang == 'tib') {
      //prettier-ignore
      return html`
        <span class="button-font">Display text as:</span>
        <vaadin-radio-group
          class="toggle-transliteration-scheme"
          @value-changed="${this.toggleTransMode}">
          <vaadin-radio-button value="wylie" checked>
            <span class="button-font">Wylie</span>
          </vaadin-radio-button>
          <vaadin-radio-button value="uni">
            <span class="button-font">Unicode</span>
          </vaadin-radio-button>
        </vaadin-radio-group>
      `;
    } else {
      //prettier-ignore
      return html`
      <paper-toggle-button @checked-changed="${this.toggleShowSegmentNumbers}">
        <span class="button-font">Show Segment Numbers</span>
      </paper-toggle-button>

      <vaadin-radio-group
        class="segment-numbers-sides"
        @value-changed="${this.toggleSegmentDisplaySide}">
        <vaadin-radio-button value="left" checked>
          <span class="button-font">Left</span>
        </vaadin-radio-button>
        <vaadin-radio-button value="right">
          <span class="button-font">Right</span>
        </vaadin-radio-button>
      </vaadin-radio-group>
    `;
    }
  }
}
