import 'normalize.css';
import 'default-passive-events';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-drawer-toggle';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-menu-bar/theme/material/vaadin-menu-bar.js';
import '@polymer/paper-input/paper-input.js';
import { LitElement, html, customElement } from 'lit-element';
import { Router } from '@vaadin/router';

import './views/components/card';
import { disableDrawer } from './views/utility/utils';

import styles from './index.styles';
import BNRouter from './router';
import { navMenuDataMain, navMenuDataSub } from './menu-data';
import { TaishoT, TaishoX } from './taisho-numbers';

@customElement('app-layout')
export class AppLayout extends LitElement {
  static get styles() {
    return [styles];
  }

  handleMenuClick({
    detail: {
      value: { url },
    },
  }) {
    Router.go(`/${url}`);
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    const currentUrl = window.location.href;
    if (currentUrl.match('/chn/text/[TX][0-9]+$')) {
      let textNr = currentUrl.match(/[TX][0-9]+$/g)[0];
      let taishoNr = parseInt(textNr.substring(1));
      let newTextNr = '';
      let taishoKeys = Object.keys(TaishoT);
      let taishoValues = Object.values(TaishoT);
      if (textNr.startsWith('X')) {
        taishoKeys = Object.keys(TaishoX);
        taishoValues = Object.values(TaishoX);
      }
      for (let number = 0; number < taishoKeys.length; number++) {
        if (parseInt(taishoKeys[number]) > taishoNr) {
          newTextNr = taishoValues[number - 1];
          break;
        }
      }
      let newUrl = currentUrl.replace(
        /[TX][0-9]+/g,
        newTextNr + 'n' + textNr.substring(1)
      );
      window.location.href = newUrl;
    }
    disableDrawer();
    // insert router into `<main>` element
    new BNRouter().init();
  }

  navigateToSearch = e => {
    const searchQuery = e.target.value;
    if (searchQuery) {
      Router.go(`/search/${e.target.value}`);
    }
  };

  openSearch() {
    this.shadowRoot.querySelector('bn-card').classList.add('navbar-open');
    this.shadowRoot.querySelector('#search-input').removeAttribute('hidden');
    this.shadowRoot
      .querySelector('#search-icon-placeholder')
      .setAttribute('hidden');
    this.shadowRoot
      .querySelector('#cross-icon-placeholder')
      .removeAttribute('hidden');
  }

  closeSearch() {
    this.shadowRoot.querySelector('bn-card').classList.remove('navbar-open');
    this.shadowRoot.querySelector('#search-input').setAttribute('hidden');
    this.shadowRoot
      .querySelector('#search-icon-placeholder')
      .removeAttribute('hidden');
    this.shadowRoot
      .querySelector('#cross-icon-placeholder')
      .setAttribute('hidden');
  }

  render() {
    // prettier-ignore
    return html`
      <vaadin-app-layout>
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>

        <h1 slot="navbar" class="header-title">
          <img
            src="/src/assets/img/buddhanexus.jpg"
            class="logo-buddhanexus"
            alt="Buddha Nexus"/>
        </h1>

        <vaadin-menu-bar
          open-on-hover
          .items="${navMenuDataMain}"
          slot="navbar"
          class="menu-tab main"
          @item-selected="${e => this.handleMenuClick(e)}">
        </vaadin-menu-bar>

        <vaadin-menu-bar
          open-on-hover
          .items="${navMenuDataSub}"
          slot="navbar"
          class="menu-tab sub"
          @item-selected="${e => this.handleMenuClick(e)}">
        </vaadin-menu-bar>


        <bn-card slot="navbar" id="navbar-card" small>
          <paper-input
            hidden
            id="search-input"
            placeholder="Global Text Search..."
            @change="${this.navigateToSearch}"
            no-label-float
            autosave="test">
            <div slot="prefix">
              <iron-icon class="search-icon" icon="vaadin:search"></iron-icon>
            </div>
            <div slot="suffix">
              <iron-icon
                hidden
                id="cross-icon-placeholder"
                class="search-icon"
                icon="vaadin:close-small"
                title="Close Search"
                @click="${this.closeSearch}">
              </iron-icon>
            </div>
          </paper-input>
          <iron-icon
            id="search-icon-placeholder"
            class="search-icon"
            icon="vaadin:search"
            title="Search BuddhaNexus"
            @click="${this.openSearch}">
          </iron-icon>
        </bn-card>

        <main></main>

        <footer>
          <div class="footer-bar">
            <div class="footer-bar-content">
              <a href="/contact" class="link">CONTACT</a>
            </div>
          </div>
          <div class="footer-color">
            <div class="footer-corner">&nbsp;</div>
            <div class="footer-right">
              <img
                src="/src/assets/img/tree.png"
                alt="buddhanexus"
                class="footer-logo"/>
            </div>
          </div>
        </footer>

        <div id="menu-drawer" slot="drawer">
          <navigation-menu></navigation-menu>
        </div>
      </vaadin-app-layout>
    `;
  }
}
