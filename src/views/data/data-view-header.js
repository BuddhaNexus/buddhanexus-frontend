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
  @property({ type: Function }) toggleNavBar;
  @property({ type: Function }) updateSearch;
  @property({ type: Function }) updateMultiLingSearch;
  @property({ type: Array }) multiLingualMode;
  @property({ type: Function }) updateSortMethod;
  @property({ type: Function }) setFileName;
  @property({ type: Function }) setFolio;
  @property({ type: Function }) handleViewModeChanged;
  @property({ type: Function }) toggleFilterBarOpen;
  @property({ type: Function }) toggleTransMode;
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

        vaadin-radio-button {
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
      `,
    ];
  }

  render() {
    const shouldShowTransliterationSlider =
      ((this.language === 'tib' || this.language === 'multi') &&
        this.viewMode != 'graph') ||
      this.viewMode === 'english';
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
              .multiLingualMode="${this.multiLingualMode}"
              .handleViewModeChanged="${viewMode =>
                this.handleViewModeChanged(viewMode)}">
            </data-view-view-selector>

            <data-view-header-fields
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
                    <span class="button-font">${(this.language === 'tib') ? 'Wylie' : 'Roman'}</span>
                  </vaadin-radio-button>
                  <vaadin-radio-button value="uni">
                    <span class="button-font">${(this.language === 'tib') ? 'Unicode' : 'Devanagari'}</span>
                  </vaadin-radio-button>
                </vaadin-radio-group>`
              : null}

            <iron-icon
              icon="vaadin:desktop"
              title="Toggle Full Screen Mode"
              @click="${this.toggleNavBar}"
              class="nav-bar-toggle-icon">
            </iron-icon>

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
