import { customElement, html, LitElement, property } from 'lit-element';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-details/theme/material/vaadin-details.js';

import { getDataForSidebarMenu } from '../../api/actions';

import styles from './navigation-menu.styles';
import { getMainLayout, preprocessMenuData } from '../utility/utils';
import { LANGUAGE_CODES, LANGUAGE_NAMES } from '../utility/constants';

@customElement('navigation-menu')
export class NavigationMenu extends LitElement {
  @property({ type: String }) language;
  @property({ type: String }) fileName;

  @property({ type: Object }) navigationMenuData;
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;

  static get styles() {
    return [styles];
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    await this.fetchData();
  }

  updated(_changedProperties) {
    _changedProperties.forEach(async (oldValue, propName) => {
      if (['language'].includes(propName) && !this.fetchLoading) {
        await this.fetchData();
      }
      if (propName === 'fileName') {
        getMainLayout()
          .querySelector('data-view')
          .setAttribute('fileName', this.fileName);
      }
    });
  }

  async fetchData() {
    if (!this.language) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;

    const { navigationmenudata, error } = await getDataForSidebarMenu({
      language: this.language,
    });
    this.navigationMenuData = navigationmenudata;
    this.fetchError = error;

    this.fetchLoading = false;
  }

  openThisFile(e) {
    this.fileName = e.target.id;
  }

  addCatagoryFiles(files) {
    let pictureFiles = preprocessMenuData(files);
    let totalFilesList = [];
    if (pictureFiles.length !== 0) {
      totalFilesList = pictureFiles.map(
        file => html`
          <li
            class="filename"
            id="${file.filename}"
            @click="${this.openThisFile}"
          >
            <div>
              <strong id="${file.filename}">${file.textname}</strong>
              <img src="${file.imgStringPLI}" item-icon />
              <img src="${file.imgStringSKT}" item-icon />
              <img src="${file.imgStringTIB}" item-icon />
              <img src="${file.imgStringCHN}" item-icon />
            </div>
            ${this.language === 'multi' ? file.displayName : file.displayname}
          </li>
        `
      );
    }
    return totalFilesList.length > 0
      ? html`
          ${totalFilesList}
        `
      : html`
          <li>No files loaded</li>
        `;
  }

  addCategoryItems(collection) {
    //prettier-ignore
    return collection.categories.map(
      category => html`
        <vaadin-details theme="reverse" class="file-list">
          <div slot="summary" class="category-display">
            ${category.categorydisplayname}<br />
            <span class="category-name">(${category.categoryname})</span>
          </div>
          <ul>
            ${this.addCatagoryFiles(category.files)}
          </ul>
        </vaadin-details>
      `
    );
  }

  collectionMenu() {
    if (!this.navigationMenuData) {
      return;
    }
    let collectionMenuData = html``;
    if (this.language !== 'multi') {
      if (!this.navigationMenuData[0].collection) {
        return;
      }
      this.navigationMenuData.forEach(collection => {
        collectionMenuData = html`
          ${collectionMenuData}
          <vaadin-details theme="reverse">
            <div slot="summary" class="collection-list">
              ${collection.collection}
            </div>
            ${this.addCategoryItems(collection)}
          </vaadin-details>
        `;
      });
    } else {
      if (!this.navigationMenuData[0].available_lang) {
        return;
      }

      let navData = [];
      let languageList = [];
      let collectionName = '';
      this.navigationMenuData.forEach(file => {
        if (languageList.includes(file.filelanguage)) {
          navData.forEach(collection => {
            if (collection.collectioncode === file.filelanguage) {
              collection.files.push(file);
            }
          });
        } else {
          switch (file.filelanguage) {
            case LANGUAGE_CODES.TIBETAN:
              collectionName = LANGUAGE_NAMES.TIBETAN;
              break;
            case LANGUAGE_CODES.PALI:
              collectionName = LANGUAGE_NAMES.PALI;
              break;
            case LANGUAGE_CODES.SANSKRIT:
              collectionName = LANGUAGE_NAMES.SANSKRIT;
              break;
            case LANGUAGE_CODES.CHINESE:
              collectionName = LANGUAGE_NAMES.CHINESE;
              break;
            default:
              collectionName = '';
          }
          languageList.push(file.filelanguage);
          let collectionData = {};
          collectionData.collectioncode = file.filelanguage;
          collectionData.collection = collectionName;
          collectionData.files = [file];
          navData.push(collectionData);
        }
      });

      navData.forEach(collection => {
        collectionMenuData = html`
          ${collectionMenuData}
          <vaadin-details theme="reverse" class="file-list">
            <div slot="summary" class="collection-list">
              ${collection.collection}
            </div>
            <ul class="multifiles">
              ${this.addCatagoryFiles(collection.files)}
            </ul>
          </vaadin-details>
        `;
      });
    }
    return collectionMenuData;
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }

    return html`
      <div id="menu-container">
        ${this.collectionMenu()}
      </div>
    `;
  }
}
