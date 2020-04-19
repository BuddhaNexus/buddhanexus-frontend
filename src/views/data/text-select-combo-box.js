import { css, customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';

import { LANGUAGE_CODES } from '../utility/constants';
import { getFilesForMainMenu, getFoliosForFile } from '../menus/actions';
import { DATA_VIEW_MODES } from './data-view-filters-container';

@customElement('text-select-combo-box')
export class TextSelectComboBox extends LitElement {
  @property({ type: String }) language;
  @property({ type: String }) viewMode;
  @property({ type: String }) fileName;
  @property({ type: Array }) menuData;
  @property({ type: Array }) folioData;
  @property({ type: String }) fetchError;

  @property({ type: Function }) setFileName;
  @property({ type: Function }) setFolio;
  @property({ type: Function }) updateSearch;
  @property({ type: Function }) updateSortMethod;

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
        }

        #text-select-combo-box {
          width: 25em;
          margin-right: 1em;
        }

        #folio-select-combo-box {
          width: 8.75em;
          margin-right: 2em;
        }

        vaadin-combo-box {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
        }

        .search-box {
          padding-top: 1em;
          transform: translateY(1.5px);
        }

        .search-icon {
          width: 1em;
          height: 1em;
          margin-right: 0.8em;
          margin-bottom: 4px;
        }
      `,
    ];
  }

  updateFileName(e) {
    if (e.target.selectedItem) {
      this.setFileName(e.target.selectedItem.filename);
    }
  }

  updateFolio(e) {
    if (e.target.selectedItem && e.target.selectedItem !== 'Not available') {
      this.setFolio(e.target.selectedItem);
    }
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.fetchData();
  }

  async updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'fileName') {
        this.fetchFolioData();
        if (this.shadowRoot.querySelector('#folio-select-combo-box')) {
          this.shadowRoot.querySelector('#folio-select-combo-box')._clear();
        }
      }
    });
  }

  async fetchFolioData() {
    if (!this.fileName) {
      return;
    }
    const { folios, error } = await getFoliosForFile({
      fileName: this.fileName,
    });
    this.folioData = folios;
    this.fetchError = error;
  }

  constructNameDic(results) {
    let textNameDic = {};
    let displayNameDic = {};

    results.forEach(result => {
      // textname (the acronym of the text number) is used for headers parallels instead of the filename.
      textNameDic[result.filename] = result.textname;
      displayNameDic[result.filename] = result.displayName;
    });
    return [textNameDic, displayNameDic];
  }

  async fetchData() {
    if (!this.language) {
      return;
    }

    const { result, error } = await getFilesForMainMenu({
      language: this.language,
    });

    this.menuData = result;
    if (!window.menuData) {
      window.menuData = {};
    }
    if (!window.displayData) {
      window.displayData = {};
    }
    // I am not sure if it is hacky to use global scope window here or not,
    // but it works and we avoid having to fetch the data multiple times!
    const nameDic = this.constructNameDic(result);
    if (!window.menuData[this.language]) {
      window.menuData[this.language] = nameDic[0];
    }
    if (!window.displayData[this.language]) {
      window.displayData[this.language] = nameDic[1];
    }
    this.fetchError = error;
  }

  getMenuLabel = language => {
    switch (language) {
      case LANGUAGE_CODES.TIBETAN:
        return 'Find Tibetan texts...';
      case LANGUAGE_CODES.PALI:
        return 'Find Pali texts...';
      case LANGUAGE_CODES.CHINESE:
        return 'Find Chinese texts...';
      case LANGUAGE_CODES.SANSKRIT:
        return 'Find Sanskrit texts...';
    }
  };

  getFolioLabel = language => {
    switch (language) {
      case LANGUAGE_CODES.TIBETAN:
        return 'Folio';
      case LANGUAGE_CODES.PALI:
        return 'Sutta';
      case LANGUAGE_CODES.CHINESE:
        return 'Facsimile';
    }
  };

  shouldShowFolioBox() {
    if (this.language === LANGUAGE_CODES.SANSKRIT) {
      return false;
    }
    if (
      this.viewMode === DATA_VIEW_MODES.TEXT &&
      (this.language !== LANGUAGE_CODES.PALI ||
        this.fileName.match('([as]n[0-9]|dhp)'))
    ) {
      return true;
    }
    return false;
  }

  render() {
    const shouldShowTextSearchBox = this.viewMode === DATA_VIEW_MODES.TEXT;
    const shouldShowSortBox = this.viewMode === DATA_VIEW_MODES.TABLE;

    return html`
      <vaadin-combo-box
        id="text-select-combo-box"
        clear-button-visible
        label="${this.getMenuLabel(this.language)}"
        item-value-path="textname"
        item-label-path="displayName"
        .items="${this.menuData}"
        @value-changed="${e => this.updateFileName(e)}"
      >
      </vaadin-combo-box>

      ${this.shouldShowFolioBox()
        ? html`
            <vaadin-combo-box
              id="folio-select-combo-box"
              label="${this.getFolioLabel(this.language)}"
              item-value-path="folio"
              item-label-path="folio"
              .items="${this.folioData}"
              @value-changed="${e => this.updateFolio(e)}"
            >
            </vaadin-combo-box>
          `
        : null}
      ${shouldShowTextSearchBox
        ? html`
            <paper-input
              placeholder="Search in Inquiry Text"
              class="search-box"
              type="search"
              @change="${this.updateSearch}"
              no-label-float
            >
              <div slot="prefix">
                <iron-icon class="search-icon" icon="vaadin:search"></iron-icon>
              </div>
            </paper-input>
          `
        : null}
      ${shouldShowSortBox
        ? html`
            <vaadin-select
              @value-changed="${this.updateSortMethod}"
              Label="Sorting method:"
              class="input-field"
              item-label-path="filename"
            >
              <template>
                <vaadin-list-box @value-changed="${this.updateSortMethod}">
                  <vaadin-item value="position"
                    >By position in Inquiry Text</vaadin-item
                  >
                  <vaadin-item value="quoted-text"
                    >By position in Hit Text(s)</vaadin-item
                  >
                  <vaadin-item value="length"
                    >Length of match in Inquiry Text (beginning with
                    longest)</vaadin-item
                  >
                  <vaadin-item value="length2"
                    >Length of match in Hit Text (beginning with
                    longest)</vaadin-item
                  >
                </vaadin-list-box>
              </template>
            </vaadin-select>
          `
        : null}
    `;
  }
}
