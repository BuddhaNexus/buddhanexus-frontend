import 'normalize.css';
import 'default-passive-events';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tabs';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tab';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-drawer-toggle';
import '@polymer/paper-input/paper-input.js';
import { LitElement, html, customElement } from 'lit-element';

import styles from './index.styles';
import BNRouter from './router';

import { disableDrawer } from './views/utility/utils';

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

  render() {
    return html`
      <vaadin-app-layout>
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <h1 slot="navbar" class="header-title">Buddhanexus</h1>
        <vaadin-tabs slot="navbar" overflow="both">
          <a class="menu-tab" href="/">
            <vaadin-tab>Home</vaadin-tab>
          </a>
          <a class="menu-tab" href="/pli/text">
            <vaadin-tab>Pali</vaadin-tab>
          </a>
          <a class="menu-tab" href="/skt/text">
            <vaadin-tab>Sanskrit</vaadin-tab>
          </a>
          <a class="menu-tab" href="/tib/text">
            <vaadin-tab>Tibetan</vaadin-tab>
          </a>
          <a class="menu-tab" href="/chn/text">
            <vaadin-tab>Chinese</vaadin-tab>
          </a>
          <a class="menu-tab" href="/visual">
            <vaadin-tab>Visual Charts</vaadin-tab>
          </a>
        </vaadin-tabs>

        <main></main>

        <div id="menu-drawer" slot="drawer">
          <navigation-menu></navigation-menu>
        </div>
      </vaadin-app-layout>
    `;
  }
}
