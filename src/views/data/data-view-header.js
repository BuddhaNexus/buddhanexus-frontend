import { css, customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';

import './data-view-header-fields';

@customElement('data-view-header')
class DataViewHeader extends LitElement {
  @property({ type: Boolean }) filterBarOpen = true;
  @property({ type: String }) fileName = '';
  @property({ type: String }) language;
  @property({ type: Number }) score;
  @property({ type: String }) viewMode;
  @property({ type: String }) sortMethod;
  @property({ type: String }) headerVisibility;
  @property({ type: Function }) toggleNavBar;
  @property({ type: Function }) updateSearch;
  @property({ type: Function }) updateMultiLingSearch;
  @property({ type: Array }) multiLingualMode;
  @property({ type: Function }) updateSortMethod;
  @property({ type: Function }) setFileName;
  @property({ type: Function }) setFolio;
  @property({ type: Function }) toggleTransMode;
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

        .data-view-header.no-header {
          height: 28px;
        }

        .filter-bar-toggle-icon,
        .nav-bar-toggle-icon {
          margin-right: 2em;
          min-height: 22px;
          min-width: 22px;
          position: absolute;
          top: 52px;
          padding: 12px;
          pointer-events: auto;
          opacity: 1;
          transition: opacity var(--vaadin-app-layout-transition);
          color: var(--material-secondary-text-color);
        }

        .filter-bar-toggle-icon {
          right: 0;
          cursor: pointer;
        }

        vaadin-radio-button,
        vaadin-radio-group {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
        }
        .button-font {
          color: var(--color-text-secondary);
          font-size: 14px;
          font-family: var(--system-font-stack);
          font-weight: 400;
        }

        .toggle-transliteration-scheme {
          padding-left: 12px;
          position: absolute;
          right: 120px;
        }

        .nav-bar-toggle-icon {
          right: 40px;
          cursor: row-resize;
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

        data-view-view-selector.no-header,
        data-view-header-fields.no-header {
          display: none;
        }

        bn-card.no-header {
          visibility: hidden;
        }

        .filter-bar-toggle-icon.no-header,
        .nav-bar-toggle-icon.no-header {
          padding: 0px;
          top: 32px;
        }

        .nav-bar-toggle-icon.no-header {
          right: 1.2em;
        }

        .filter-bar-toggle-icon.no-header {
          right: 0;
          margin-right: 1em;
        }
      `,
    ];
  }

  render() {
    const shouldShowTransliterationSlider =
      (this.language === 'tib' || this.language === 'multi') &&
      this.viewMode != 'graph';
    //prettier-ignore
    return html`
      <div class="data-view-header ${this.headerVisibility}">
        <div
          class="data-view__header-container ${this.filterBarOpen &&
            'data-view__header-container--filter-bar-open'}">
          <bn-card header="true" class="${this.headerVisibility}">
            <data-view-view-selector
              class="${this.headerVisibility}"
              .language="${this.language}"
              .viewMode="${this.viewMode}"
              .multiLingualMode="${this.multiLingualMode}"
              .handleViewModeChanged="${viewMode =>
                this.handleViewModeChanged(viewMode)}">
            </data-view-view-selector>

            <data-view-header-fields
              class="${this.headerVisibility}"
              .language="${this.language}"
              .fileName="${this.fileName}"
              .score="${this.score}"
              .setFileName="${this.setFileName}"
              .setFolio="${this.setFolio}"
              .viewMode="${this.viewMode}"
              .sortMethod="${this.sortMethod}"
              .updateSearch="${this.updateSearch}"
              .multiLingualMode="${this.multiLingualMode}"
              .updateMultiLingSearch="${this.updateMultiLingSearch}"
              .updateSortMethod="${this.updateSortMethod}">
            </data-view-header-fields>

            ${shouldShowTransliterationSlider
              ? html`
                <vaadin-radio-group
                  class="toggle-transliteration-scheme"
                  label="Display text as:"
                  @value-changed="${this.toggleTransMode}">
                  <vaadin-radio-button value="wylie" checked>
                    <span class="button-font">Wylie</span>
                  </vaadin-radio-button>
                  <vaadin-radio-button value="uni">
                    <span class="button-font">Unicode</span>
                  </vaadin-radio-button>
                </vaadin-radio-group>`
              : null}
            </bn-card>
            <iron-icon
              icon="vaadin:desktop"
              title="Toggle Full Screen Mode"
              @click="${this.toggleNavBar}"
              class="nav-bar-toggle-icon ${this.headerVisibility}">
            </iron-icon>

            <iron-icon
              icon="vaadin:cog"
              title="Filters &amp; Settings"
              @click="${this.toggleFilterBarOpen}"
              class="filter-bar-toggle-icon ${this.filterBarOpen &&
                'filter-bar-toggle-icon--filter-bar-open'} ${this.headerVisibility}">
            </iron-icon>
          
        </div>
      </div>
    `;
  }
}

export default DataViewHeader;
