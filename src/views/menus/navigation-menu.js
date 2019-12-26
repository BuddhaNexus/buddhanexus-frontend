import { customElement, html, LitElement, property } from 'lit-element';
import '@vaadin/vaadin-icons/vaadin-icons.js';
// import '@vaadin/vaadin-accordion/theme/material/vaadin-accordion.js';
import '@vaadin/vaadin-details/theme/material/vaadin-details.js';

import { getDataForSidebarMenu } from '../../api/actions';

import styles from './navigation-menu.styles';

@customElement('navigation-menu')
export class NavigationMenu extends LitElement {
  @property({ type: String }) language;

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
    if (window.location.href.split('/').length > 5) {
      window.open(`./${e.target.id}`, '_self');
    } else {
      window.open(`./text/${e.target.id}`, '_self');
    }
  }

  addCatagoryFiles(files) {
    let filesList = html``;
    if (files.length == 0) {
      filesList = html`
        <li>No files loaded</li>
      `;
    } else {
      files.forEach(file => {
        filesList = html`
          ${filesList}
          <li
            class="filename"
            id="${file.filename}"
            @click="${this.openThisFile}"
          >
            ${file.displayname}
          </li>
        `;
      });
    }
    return filesList;
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
