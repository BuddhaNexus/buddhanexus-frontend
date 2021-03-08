import { customElement, html, css, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-checkbox/theme/material/vaadin-checkbox';

import { getMultilingualData } from '../../api/actions';
import { LANGUAGE_CODES } from '../utility/constants';

@customElement('data-view-filters-multilingual')
export class DataViewFiltersMultilingual extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Array }) multiLangTotalList;
  @property({ type: Array }) mainLang;
  @property({ type: Array }) multiLingualMode = [];
  @property({ type: Array }) multiLingualBlockList = [];
    @property({ type: Function }) updateMultiLingualMode;
  @property({ type: Boolean }) dataLoading = false;
  @property({ type: String }) dataLoadError = false;

  static get styles() {
    return [
      css`
        vaadin-checkbox {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
        }

        #multi-lingual {
          flex-wrap: wrap;
          padding-bottom: 8px;
        }

        #multi-lingual-label {
          padding-bottom: 8px;
          font-size: 12px;
          opacity: 0.8;
          display: block;
        }
      `,
    ];
  }

  firstUpdated() {
    this.fetchMultilingualData();
  }

  updated(_changedProperties) {
    _changedProperties.forEach(async (oldValue, propName) => {
      if (propName === 'fileName' && !this.dataLoading) {
        this.fetchMultilingualData();
      }
    });
  }
  updateMultiLingualEvent = e => {
    if (e.target.checked) {
      this.multiLingualBlockList = this.multiLingualBlockList.filter(
        x => x !== e.target.value
      );
    } else {
      this.multiLingualBlockList.push(e.target.value);
    }
    this.multiLingualMode = this.multiLangTotalList.filter(
      x => !this.multiLingualBlockList.includes(x)
    );
      this.multiLingualMode = [...new Set(this.multiLingualMode)];
      this.multiLingualMode = this.multiLingualMode.filter(Boolean);
    this.updateMultiLingualMode(this.multiLingualMode);
  };

  async fetchMultilingualData() {
    if (!this.fileName) {
      return;
    }
    this.dataLoading = true;
    const { langList, error } = await getMultilingualData({
      fileName: this.fileName,
    });
    langList.push(this.mainLang);
    this.multiLangTotalList = langList;
    this.multiLingualMode = langList;
    if (this.multiLingualBlockList) {
      this.multiLingualMode.filter(
        x => !this.multiLingualBlockList.includes(x)
      );
    }
    this.dataLoadError = error;
    this.dataLoading = false;
    this.updateMultiLingualMode(this.multiLangTotalList);
  }

  renderPali() {
    if (this.mainLang == LANGUAGE_CODES.PALI) {
      return html`
        <vaadin-checkbox
          value="pli"
          @checked-changed="${this.updateMultiLingualEvent}"
          checked
          >Pāḷi</vaadin-checkbox
        >
      `;
    } else if (this.multiLangTotalList.includes(LANGUAGE_CODES.PALI)) {
      return html`
        <vaadin-checkbox
          value="pli"
          @checked-changed="${this.updateMultiLingualEvent}"
          checked
          >Pāḷi</vaadin-checkbox
        >
      `;
    }
  }

  renderSanskrit() {
    if (this.mainLang == LANGUAGE_CODES.SANSKRIT) {
      return html`
        <vaadin-checkbox
          value="skt"
          @checked-changed="${this.updateMultiLingualEvent}"
          checked
          >Sanskrit</vaadin-checkbox
        >
      `;
    } else if (this.multiLangTotalList.includes(LANGUAGE_CODES.SANSKRIT)) {
      return html`
        <vaadin-checkbox
          value="skt"
          @checked-changed="${this.updateMultiLingualEvent}"
          checked
          >Sanskrit</vaadin-checkbox
        >
      `;
    }
  }

  renderTibetan() {
    if (this.mainLang == LANGUAGE_CODES.TIBETAN) {
      return html`
        <vaadin-checkbox
          value="tib"
          @checked-changed="${this.updateMultiLingualEvent}"
          checked
          >Tibetan</vaadin-checkbox
        >
      `;
    } else if (this.multiLangTotalList.includes(LANGUAGE_CODES.TIBETAN)) {
      return html`
        <vaadin-checkbox
          value="tib"
          @checked-changed="${this.updateMultiLingualEvent}"
          checked
          >Tibetan</vaadin-checkbox
        >
      `;
    }
  }

  renderChinese() {
    if (this.mainLang == LANGUAGE_CODES.CHINESE) {
      return html`
        <vaadin-checkbox
          value="chn"
          @checked-changed="${this.updateMultiLingualEvent}"
          checked
          >Chinese</vaadin-checkbox
        >
      `;
    } else if (this.multiLangTotalList.includes(LANGUAGE_CODES.CHINESE)) {
      return html`
        <vaadin-checkbox
          value="chn"
          @checked-changed="${this.updateMultiLingualEvent}"
          checked
          >Chinese</vaadin-checkbox
        >
      `;
    }
  }

  render() {
    //prettier-ignore
    if(!this.dataLoading && this.multiLangTotalList) {
      return html`
        <div id="multi-lingual-label">Choose Languages:</div>
        <div id="multi-lingual">
          ${this.renderPali()}
          ${this.renderSanskrit()}
          ${this.renderTibetan()}
          ${this.renderChinese()}
        </div>
      `;
      }
  }
}
