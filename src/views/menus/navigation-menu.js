import { customElement, html, LitElement, property } from 'lit-element';

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
    //   _changedProperties.forEach(async (oldValue, propName) => {
    //     if (
    //       [
    //         'score',
    //         'cooccurance',
    //         'quoteLength',
    //         'fileName',
    //         'targetCollection',
    //       ].includes(propName) &&
    //       !this.fetchLoading
    //     ) {
    //       await this.fetchData();
    //     }
    //   });
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

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }

    console.log('rendering navigation-menu');

    return html`
      <div>
        Welcome World!
      </div>
    `;
  }
}
