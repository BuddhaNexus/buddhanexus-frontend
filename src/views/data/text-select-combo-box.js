import { css, customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';

import { LANGUAGE_CODES } from '../utility/constants';
import { getFilesForMainMenu, getFoliosForFile } from '../menus/actions';

@customElement('text-select-combo-box')
export class TextSelectComboBox extends LitElement {
  @property({ type: String }) language;
  @property({ type: String }) viewMode;
  @property({ type: String }) fileName;
  @property({ type: Function }) setFileName;
  @property({ type: Function }) setFolio;
  @property({ type: Array }) menuData;
  @property({ type: Array }) folioData;
  @property({ type: String }) fetchError;

  static get styles() {
    return [
      css`
        :host {
          display: flex;
        }

        #text-select-combo-box {
          width: 400px;
        }

        #folio-select-combo-box {
          margin-left: 12px;
          width: 140px;
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
        return 'Load Tibetan texts';
      case LANGUAGE_CODES.PALI:
        return 'Load Pali texts';
      case LANGUAGE_CODES.CHINESE:
        return 'Load Chinese texts';
      case LANGUAGE_CODES.SANSKRIT:
        return 'Load Sanskrit texts';
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

  showFolioBox() {
    if (this.language === LANGUAGE_CODES.SANSKRIT) {
      return false;
    }
    if (
      this.viewMode === 'text' &&
      (this.language !== LANGUAGE_CODES.PALI ||
        this.fileName.match('([as]n[0-9]|dhp)'))
    ) {
      return true;
    }
    return false;
  }

  render() {
    return html`
      <vaadin-combo-box
        clear-button-visible
        id="text-select-combo-box"
        label="${this.getMenuLabel(this.language)}"
        item-value-path="textname"
        item-label-path="displayName"
        .items="${this.menuData}"
        @value-changed="${e => this.updateFileName(e)}"
      >
      </vaadin-combo-box>
      ${this.showFolioBox()
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
    `;
  }
}
