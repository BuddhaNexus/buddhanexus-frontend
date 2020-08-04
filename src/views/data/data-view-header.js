import { css, customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';

import './data-view-header-fields';

@customElement('data-view-header')
class DataViewHeader extends LitElement {
  @property({ type: Boolean }) filterBarOpen = true;
  @property({ type: String }) fileName = '';
  @property({ type: String }) language;
  @property({ type: String }) viewMode;
  @property({ type: String }) folio;

  @property({ type: Function }) updateSearch;
  @property({ type: Function }) updateSortMethod;
  @property({ type: Function }) setFileName;
  @property({ type: Function }) setFolio;
  @property({ type: Function }) handleViewModeChanged;
  @property({ type: Function }) toggleFilterBarOpen;

  @property({ type: String }) searchString;

  static get styles() {
    return [
      css`
        :host {
          position: relative;
        }

        .data-view-header {
          width: 100%;
        }

        .filter-bar-toggle-icon {
          margin-right: 2em;
          min-height: 22px;
          min-width: 22px;
          position: absolute;
          top: 52px;
          padding: 12px;
          right: 0;
          cursor: pointer;
          pointer-events: auto;
          opacity: 1;
          transition: opacity var(--vaadin-app-layout-transition);
          color: var(--material-secondary-text-color);
        }

        .filter-bar-toggle-icon.filter-bar-toggle-icon--filter-bar-open {
          opacity: 0;
          pointer-events: none;
        }

        vaadin-text-field {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
          --iron-icon-width: 20px;
        }

        vaadin-text-field [part='value'] {
          padding-left: 16px;
        }
      `,
    ];
  }

  render() {
    //prettier-ignore
    return html`
      <div class="data-view-header">
        <div
          class="data-view__header-container ${this.filterBarOpen &&
            'data-view__header-container--filter-bar-open'}">
          <bn-card header="true">
            <data-view-view-selector
              .language="${this.language}"
              .viewMode="${this.viewMode}"
              .handleViewModeChanged="${viewMode =>
                this.handleViewModeChanged(viewMode)}">
            </data-view-view-selector>

            <data-view-header-fields
              .language="${this.language}"
              .fileName="${this.fileName}"
              .setFileName="${this.setFileName}"
              .setFolio="${this.setFolio}"
              .viewMode="${this.viewMode}"
              .updateSearch="${this.updateSearch}"
              .updateSortMethod="${this.updateSortMethod}">
            </data-view-header-fields>

            <iron-icon
              icon="vaadin:filter"
              @click="${this.toggleFilterBarOpen}"
              class="filter-bar-toggle-icon ${this.filterBarOpen &&
                'filter-bar-toggle-icon--filter-bar-open'}">
            </iron-icon>
          </bn-card>
        </div>
      </div>
    `;
  }
}

export default DataViewHeader;
