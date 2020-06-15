import 'normalize.css';
import 'default-passive-events';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-drawer-toggle';
import '@vaadin/vaadin-select/theme/material/vaadin-select';

import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-menu-bar/theme/material/vaadin-menu-bar.js';
import '@polymer/paper-input/paper-input.js';
import { LitElement, html, customElement } from 'lit-element';
import { Router } from '@vaadin/router';

import './views/components/card';
import { disableDrawer } from './views/utility/utils';

import styles from './index.styles';
import BNRouter from './router';
import {navMenuDataMain, navMenuDataSub} from "./menu-data";

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
    updateLanguage = e => {
	const url = e.target.value + "/neutral";
	Router.go(`/${url}`);
    }
    createLanguageSelector() {
	console.log("LANG VAR",window.globalLang);
    return html`
      <vaadin-select
        @value-changed="${this.updateLanguage}"
        class="lang"
        slot="navbar"
             label="Select language"
      >
        <template>
          <vaadin-list-box 

             @value-changed="${this.updateLanguage}">
            <vaadin-item value="pli"
              >Pāli</vaadin-item
            >
            <vaadin-item value="skt"
              >Sanskrit</vaadin-item
            >
            <vaadin-item value="tib"
              >Tibetan</vaadin-item
            >
            <vaadin-item value="chn"
              >Chinese</vaadin-item
            >
          </vaadin-list-box>
        </template>
      </vaadin-select>
    `;
  }


    
  render() {
    return html`
      <vaadin-app-layout>
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>

        <h1 slot="navbar" class="header-title">
          <img
            src="/src/assets/img/buddhanexus.jpg"
            class="logo-buddhanexus"
            alt="Buddha Nexus"
          />
        </h1>

        <vaadin-menu-bar
          open-on-hover
          .items="${navMenuDataMain}"
          slot="navbar"
          class="menu-tab main"
          @item-selected="${e => this.handleMenuClick(e)}"
        ></vaadin-menu-bar>

        <vaadin-menu-bar
          open-on-hover
          .items="${navMenuDataSub}"
          slot="navbar"
          class="menu-tab sub"
          @item-selected="${e => this.handleMenuClick(e)}"
        ></vaadin-menu-bar>

      ${this.createLanguageSelector()}

        <bn-card slot="navbar" small>
          <paper-input
            id="search-input"
            placeholder="Search..."
            type="search"
            @change="${this.navigateToSearch}"
            no-label-float
            autosave="test"
            results="5"
          >
            <div slot="prefix">
              <div class="search-icon-container">
                <iron-icon class="search-icon" icon="vaadin:search"></iron-icon>
              </div>
            </div>
          </paper-input>
        </bn-card>

        <main></main>

        <footer>
          <div class="footer-bar">
            <div class="footer-bar-content">
              <a href="/contact" class="link">CONTACT</a>
              <a href="/imprint" class="link">IMPRINT</a>
            </div>
          </div>
          <div class="footer-color">
            <div class="footer-corner">&nbsp;</div>
            <div class="footer-right">
              <img
                src="/src/assets/img/tree.png"
                alt="buddhanexus"
                class="footer-logo"
              />
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
