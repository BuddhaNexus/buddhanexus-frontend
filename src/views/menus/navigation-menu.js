import { customElement, html, LitElement, property } from 'lit-element';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-details/theme/material/vaadin-details.js';

import { getDataForSidebarMenu } from '../../api/actions';

import styles from './navigation-menu.styles';

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
      if (propName == 'fileName') {
        document
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
    let totalFilesList = [];
    if (files.length !== 0) {
      totalFilesList = files.map(
        file => html`
          <li
            class="filename"
            id="${file.filename}"
            @click="${this.openThisFile}"
          >
            ${file.displayname}
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
    let categoryList = html``;
    collection.categories.forEach(category => {
      categoryList = html`
        ${categoryList}
        <vaadin-details theme="reverse" class="file-list">
          <div slot="summary" class="category-display">
            ${category.categorydisplayname}<br />
            <span class="category-name">(${category.categoryname})</span>
          </div>
          <ul>
            ${this.addCatagoryFiles(category.files)}
          </ul>
        </vaadin-details>
      `;
    });
    return categoryList;
  }

  collectionMenu() {
    if (!this.navigationMenuData) {
      return;
    }
    let collectionMenuData = html``;
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
    return collectionMenuData;
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }

    console.log('rendering navigation-menu');

    return html`
      <div id="menu-container">
        ${this.collectionMenu()}
      </div>
    `;
  }
}
