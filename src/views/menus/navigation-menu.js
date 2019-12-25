import { customElement, html, LitElement, property } from 'lit-element';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-accordion/theme/material/vaadin-accordion.js';

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
        <vaadin-accordion-panel theme="reverse">
          <div slot="summary">${category.categorydisplayname}</div>
          <ul>
            ${this.addCatagoryFiles(category.files)}
          </ul>
        </vaadin-accordion-panel>
      `;
    });
    return categoryList;
  }

  openCategoryList(e) {
    const targetCollection = e.target.id.split('-')[0];
    if (!targetCollection) {
      return;
    }
    const targetElement = this.shadowRoot.querySelector('#' + targetCollection);
    if (!targetElement.querySelector('.categorylist')) {
      return;
    }
    const targetElementIcon = targetElement.querySelector(
      '#' + targetCollection + '-icon'
    );
    if (targetElement.getAttribute('opened') == 'true') {
      targetElement.querySelector('.categorylist').classList.add('hidden');
      targetElement.setAttribute('opened', false);
      targetElementIcon.setAttribute('icon', 'vaadin:angle-down');
    } else {
      targetElement.setAttribute('opened', true);
      targetElement.querySelector('.categorylist').classList.remove('hidden');
      targetElementIcon.setAttribute('icon', 'vaadin:angle-up');
    }
  }

  collectionMenu() {
    let collectionMenuData = html``;
    this.navigationMenuData.forEach(collection => {
      collectionMenuData = html`
        ${collectionMenuData}
        <li
          class="collection-menu"
          id="${collection.collection}"
          @click="${this.openCategoryList}"
          opened="false"
        >
          ${collection.collection}
          <iron-icon
            class="dropdown-icon"
            id="${collection.collection}-icon"
            icon="vaadin:angle-down"
          ></iron-icon>
          <vaadin-accordion class="categorylist hidden" opened="100">
            ${this.addCategoryItems(collection)}
          </vaadin-accordion>
        </li>
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
        <ul class="collectionlist">
          ${this.collectionMenu()}
        </ul>
      </div>
    `;
  }
}
