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

@customElement('app-layout')
export class AppLayout extends LitElement {
  static get styles() {
    return [styles];
  }

  navMenuDataMain = [
    {
      text: 'About',
      children: [{ text: 'Example1' }],
    },
    {
      text: 'History',
      url: 'history',
    },
    {
      text: 'Guidelines',
      url: 'guidelines',
    },
    {
      text: 'Institutions',
      url: 'institutions',
    },
    // {
    //     text: 'Events',
    //     url: 'events'

    // },
    // {
    //     text: 'Publications',
    //     url: 'publications'
    // },
    {
      text: 'Visual Charts',
      url: 'visual',
    },
  ];
  navMenuDataLang = [
    {
      text: 'Language',
      children: [
        {
          text: 'Pali',
          url: 'pli/neutral',
        },
        {
          text: 'Sanskrit',
          url: 'skt/neutral',
        },
        {
          text: 'Tibetan',
          url: 'tib/neutral',
        },
        {
          text: 'Chinese',
          url: 'chn/neutral',
        },
      ],
    },
  ];
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
          .items="${this.navMenuDataMain}"
          slot="navbar"
          class="menu-tab main"
          @item-selected="${e => this.handleMenuClick(e)}"
        ></vaadin-menu-bar>

        <vaadin-menu-bar
          open-on-hover
          slot="navbar"
          class="menu-tab lang"
          .items="${this.navMenuDataLang}"
          @item-selected="${e => this.handleMenuClick(e)}"
        ></vaadin-menu-bar>

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
              <a href="/history" class="link">HISTORY</a>
              <a href="/people" class="link">PEOPLE</a>
              <a href="/institutions" class="link">INSTITUTIONS</a>
              <a href="/activities" class="link">ACTIVITIES</a>
              <a href="/publications" class="link">PUBLICATIONS</a>
              <a href="/contact" class="link">CONTACT / IMPRINT</a>
            </div>
          </div>
          <div class="footer-color">
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
