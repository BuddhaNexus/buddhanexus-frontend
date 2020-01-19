import { css, customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';

import { LANGUAGE_CODES } from '../utility/constants';
import { getFilesForMainMenu } from '../menus/actions';

@customElement('text-select-combo-box')
export class TextSelectComboBox extends LitElement {
  @property({ type: String }) language;
  @property({ type: String }) fileName;
  @property({ type: Function }) setFileName;
  @property({ type: Array }) menuData;

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
      `,
    ];
  }

  updateFileName(e) {
    if (e.target.selectedItem) {
      this.setFileName(e.target.selectedItem.filename);
    }
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.fetchData();
  }

  constructNameDic(results) {
    let nameDic = {};
    results.forEach(result => {
      nameDic[result.filename] = result.textname;
    });
    return nameDic;
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
    // I am not sure if it is hacky to use global scope window here or not,
    // but it works and we avoid having to fetch the data multiple times!
    if (!window.menuData[this.language]) {
      window.menuData[this.language] = this.constructNameDic(result);
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
    }
  };

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
    `;
  }
}
