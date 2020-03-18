import 'normalize.css';
import 'default-passive-events';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tabs';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tab';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-drawer-toggle';
import '@vaadin/vaadin-icons/vaadin-icons.js';
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

        <vaadin-tabs slot="navbar">
          <a class="menu-tab" href="/">
            <vaadin-tab>Home</vaadin-tab>
          </a>
          <a class="menu-tab" href="/pli/text">
            <vaadin-tab>Pali</vaadin-tab>
          </a>
          <a class="menu-tab" href="/skt/text">
            <vaadin-tab>Sanskrit</vaadin-tab>
          </a>
          <a class="menu-tab" href="/tib/text"
            ><vaadin-tab>Tibetan</vaadin-tab></a
          >
          <a class="menu-tab" href="/chn/text">
            <vaadin-tab>Chinese</vaadin-tab>
          </a>
          <a class="menu-tab" href="/visual">
            <vaadin-tab>Visual Charts</vaadin-tab>
          </a>
        </vaadin-tabs>

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
              <a href="/">HOME</a>
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
