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

        <bn-card slot="navbar" small>
          <paper-input
            id="search-input"
            placeholder="Global Text Search..."
            type="search"
            @change="${this.navigateToSearch}"
            no-label-float
            autosave="test">
            <div slot="prefix">
              <iron-icon class="search-icon" icon="vaadin:search"></iron-icon>
            </div>
          </paper-input>
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
