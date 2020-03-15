import { LitElement, html, customElement } from 'lit-element';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tabs';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tab';
import '@vaadin/vaadin-icons/vaadin-icons.js';

@customElement('main-navbar')
export class MainNavbar extends LitElement {
  render() {
    return html`
      <vaadin-drawer-toggle></vaadin-drawer-toggle>

      <h1 class="header-title">
        <img
          src="/src/assets/img/buddhanexus.jpg"
          class="logo-buddhanexus"
          alt="Buddha Nexus"
        />
      </h1>

      <vaadin-tabs overflow="both">
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

      <bn-card small>
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
    `;
  }
}
