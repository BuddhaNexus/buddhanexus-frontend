import { customElement, html, LitElement, property } from 'lit-element';

import '@polymer/paper-toggle-button/paper-toggle-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-group';

import styles from './data-view-settings-container.styles';
import { LANGUAGE_CODES } from '../utility/constants';

@customElement('data-view-settings-container')
export class DataViewSettingsContainer extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) viewMode;
  @property({ type: String }) lang;
  @property({ type: Function }) toggleShowSegmentNumbers;
  @property({ type: Function }) toggleSegmentDisplaySide;
  @property({ type: Function }) toggleShowSCTranslation;
  @property({ type: Function }) toggleExternalLink;

  static get styles() {
    return [styles];
  }

  getExternalLinkLabels(language) {
    let exLink1 = '';
    let exLink2 = '';
    switch (language) {
      case LANGUAGE_CODES.TIBETAN:
        exLink1 = 'BDRC';
        exLink2 = 'RKTS';
        break;
      case LANGUAGE_CODES.PALI:
        exLink1 = 'SuttaCentral/VRI';
        exLink2 = '';
        break;
      case LANGUAGE_CODES.SANSKRIT:
        exLink1 = 'DSBC/GRETIL';
        exLink2 = 'SuttaCentral';
        break;
      case LANGUAGE_CODES.CHINESE:
        exLink1 = 'CBETA';
        exLink2 = 'SuttaCental';
        break;
      default:
        exLink1 = '';
        exLink2 = '';
    }
    return [exLink1, exLink2];
  }

  displaySettings = () => {
    return this.viewMode === 'text' || this.viewMode === 'english'
      ? ''
      : 'display: none';
  };

  disableSC() {
    return this.fileName.match(
      '^(atk|tik|any|[bkpv]v|th[ai]-|cp|[yj]a|[cm]nd|[dp][psa]|[np]e|mil|pli-tv-p|vb|dt)'
    ) || this.viewMode !== 'english'
      ? 'display: none'
      : '';
  }

  disableDefaultExLinks() {
    return this.lang === LANGUAGE_CODES.PALI || this.viewMode === 'graph'
      ? 'display: none'
      : '';
  }

  render() {
    const shouldShowChecked =
      this.lang === LANGUAGE_CODES.PALI || this.lang === LANGUAGE_CODES.CHINESE;
    const [exLink1, exLink2] = this.getExternalLinkLabels(this.lang);
    //prettier-ignore
    return html`
      <div style="${this.displaySettings()}">
        ${shouldShowChecked
        ? html`
            <paper-toggle-button 
              @checked-changed="${this.toggleShowSegmentNumbers}" checked>
              <span class="button-font">Show Segment Numbers</span>
            </paper-toggle-button>`
        : html `
            <paper-toggle-button
              @checked-changed="${this.toggleShowSegmentNumbers}">
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
      </div>

      <paper-toggle-button @checked-changed="${this.toggleShowSCTranslation}" style="${this.disableSC()}">
        <span class="button-font">Show SuttaCentral Translation</span>
      </paper-toggle-button>

      <vaadin-radio-group
        label="Primary external segment links to:"
        class="external-link-choice"
        style="${this.disableDefaultExLinks()}"
        @value-changed="${this.toggleExternalLink}">
        <vaadin-radio-button value="exlink1" checked>
          <span class="button-font">${exLink1}</span>
        </vaadin-radio-button>
        <vaadin-radio-button value="exlink2">
          <span class="button-font">${exLink2}</span>
        </vaadin-radio-button>
      </vaadin-radio-group>
  `;
  }
}
