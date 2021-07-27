import { customElement, html, LitElement, property } from 'lit-element';

import '@polymer/paper-toggle-button/paper-toggle-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-group';

import styles from './data-view-settings-container.styles';

@customElement('data-view-settings-container')
export class DataViewSettingsContainer extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) viewMode;
  @property({ type: Function }) toggleShowSegmentNumbers;
  @property({ type: Function }) toggleSegmentDisplaySide;
  @property({ type: Function }) toggleShowSCTranslation;

  static get styles() {
    return [styles];
  }

  disableSC() {
    return this.fileName.match(
      '^(atk|tik|any|[bkpv]v|th[ai]-|cp|[yj]a|[cm]nd|[dp][psa]|[np]e|mil|pli-tv-p|vb|dt|snp)'
    ) || this.viewMode !== 'english'
      ? 'display: none'
      : '';
  }

  render() {
    const shouldShowChecked = this.lang === 'pli' || this.lang === 'chn';
    //prettier-ignore
    return html`
        ${shouldShowChecked
        ? html`
            <paper-toggle-button @checked-changed="${this.toggleShowSegmentNumbers}" checked>
              <span class="button-font">Show Segment Numbers</span>
            </paper-toggle-button>`
        : html `
            <paper-toggle-button @checked-changed="${this.toggleShowSegmentNumbers}">
              <span class="button-font">Show Segment Numbers</span>
            </paper-toggle-button>`}

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

    <paper-toggle-button @checked-changed="${this.toggleShowSCTranslation}" style="${this.disableSC()}">
      <span class="button-font">Show SuttaCentral Translation</span>
    </paper-toggle-button>
  `;
  }
}
