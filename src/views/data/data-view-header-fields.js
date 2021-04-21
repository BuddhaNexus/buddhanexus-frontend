import { css, customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';
import '@vaadin/vaadin-select/theme/material/vaadin-select';

import { LANGUAGE_CODES } from '../utility/constants';
import { getFilesForMainMenu, getFoliosForFile } from '../menus/actions';
import { DATA_VIEW_MODES } from './data-view-filters-container';
import { preprocessMenuData } from '../utility/utils';

@customElement('data-view-header-fields')
export class DataViewHeaderFields extends LitElement {
  @property({ type: String }) language;
  @property({ type: String }) viewMode;
  @property({ type: String }) fileName;
  @property({ type: Number }) score;
  @property({ type: Array }) menuData;
  @property({ type: Array }) folioData;
  @property({ type: String }) fetchError;
  @property({ type: String }) sortMethod;
  @property({ type: Function }) setFileName;
  @property({ type: Function }) setFolio;
  @property({ type: Function }) updateSearch;
  @property({ type: Function }) updateMultiLangSearch;
  @property({ type: Function }) updateSortMethod;
  @property({ type: Function }) toggleTransMode;

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
        }

        #text-select-combo-box {
          width: 15em;
          margin-right: 1em;
        }

        #folio-select-combo-box {
          width: 8.75em;
          margin-right: 2em;
        }

        vaadin-combo-box {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
        }

        .search-box {
          padding-top: 1em;
          transform: translateY(1.5px);
          --paper-input-container-focus-color: var(--bn-dark-red);
        }

        vaadin-select,
        [part='input-field'] {
          --material-primary-color: var(--bn-dark-red);
        }

        #sort-box {
          width: 250px;
        }

        .search-icon {
          width: 1em;
          height: 1em;
          margin-right: 0.8em;
          margin-bottom: 0.25em;
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
        }
      `,
    ];
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.fetchData();
  }

  async updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'fileName') {
        this.fetchFolioData();
        if (this.shadowRoot.querySelector('#folio-select-combo-box')) {
          this.shadowRoot.querySelector('#folio-select-combo-box')._clear();
        }
      }
      if (propName === 'sortMethod' && this.sortMethod !== 'position') {
        if (this.shadowRoot.querySelector('#folio-select-combo-box')) {
          this.shadowRoot.querySelector('#folio-select-combo-box')._clear();
        }
      }
    });
  }

  updateFileName(e) {
    if (e.target.selectedItem) {
      this.setFileName(e.target.selectedItem.filename);
    }
  }

  updateFolio(e) {
    if (e.target.selectedItem && e.target.selectedItem !== 'Not available') {
      this.setFolio(e.target.selectedItem);
      this.sortMethod = 'position';
    } else if (e.target) {
      this.setFolio({ num: '', segment_nr: '' });
    }
  }

  async fetchFolioData() {
    if (!this.fileName) {
      return;
    }
    const response = await getFoliosForFile({
      fileName: this.fileName,
    });
    if (response) {
      this.folioData = response.folios;
      this.fetchError = response.error;
    }
  }

  getTextAndDisplayNames(results) {
    const textNameDic = {};
    const displayNameDic = {};

    results.forEach(result => {
      // textname (the acronym of the text number) is used for headers parallels instead of the filename.
      textNameDic[result.filename] = result.textname;
      displayNameDic[result.filename] = result.displayName;
    });
    return [textNameDic, displayNameDic];
  }

  async fetchData() {
    if (!this.language) {
      return;
    }

    const { result, error } = await getFilesForMainMenu({
      language: this.language,
    });

    this.menuData = preprocessMenuData(result);

    this.fetchError = error;
  }

  getMenuLabel = language => {
    switch (language) {
      case LANGUAGE_CODES.TIBETAN:
        return 'Find Tibetan texts...';
      case LANGUAGE_CODES.PALI:
        return 'Find Pali texts...';
      case LANGUAGE_CODES.CHINESE:
        return 'Find Chinese texts...';
      case LANGUAGE_CODES.SANSKRIT:
        return 'Find Sanskrit texts...';
      case LANGUAGE_CODES.MULTILANG:
        return 'Find Multilingual texts...';
    }
  };

  getFolioLabel = language => {
    if (this.fileName.match('^(dhp|XXdhppat|S10udanav)')) {
      return 'Verse';
    }
    if (language === LANGUAGE_CODES.SANSKRIT) {
      if (this.fileName.match('^(OT)')) {
        return 'Section';
      } else {
        return 'Segment';
      }
    }
    if (language === LANGUAGE_CODES.TIBETAN) {
      return 'Folio';
    }
    if (language === LANGUAGE_CODES.CHINESE) {
      return 'Facsimile';
    }
    if (language === LANGUAGE_CODES.PALI) {
      if (this.fileName.match('([as]n[0-9])')) {
        return 'Sutta';
      } else if (this.fileName.match('^(anya|tika|atk)')) {
        return 'Segment';
      } else {
        return 'PTS Section';
      }
    }
    return 'Segment';
  };

  shouldShowFolioBox() {
    if (
      (this.viewMode === DATA_VIEW_MODES.TEXT ||
        this.viewMode === DATA_VIEW_MODES.TEXT_SEARCH ||
        this.viewMode === DATA_VIEW_MODES.TABLE ||
        this.viewMode === DATA_VIEW_MODES.NUMBERS) &&
      !this.fileName.match('NG') &&
      // disable the folio selector for the NK/NG-collections;
      //re-enable them once we get the page numbers back.
      !this.fileName.match('NK')
    ) {
      return true;
    }
    return false;
  }

  shouldShowMultiLangMessage() {
    if (this.viewMode === DATA_VIEW_MODES.MULTILANG && this.score > 0) {
      return true;
    }
    return false;
  }

  render() {
    const shouldShowTextSearchBox =
      (this.viewMode === DATA_VIEW_MODES.TEXT ||
        this.viewMode === DATA_VIEW_MODES.TEXT_SEARCH) &&
      this.fileName;
    const shouldShowSortBox = this.viewMode === DATA_VIEW_MODES.TABLE;
    const shouldShowMultiLangSearchBox =
      this.viewMode === DATA_VIEW_MODES.MULTILANG;
    const shouldShowTransliterationSlider =
      this.language === LANGUAGE_CODES.TIBETAN &&
      this.viewMode === DATA_VIEW_MODES.TEXT;

    //prettier-ignore
    return html`
      <vaadin-combo-box
        id="text-select-combo-box"
        clear-button-visible
        label="${this.getMenuLabel(this.language)}"
        item-value-path="textname"
        item-label-path="search_field"
        .items="${this.menuData}"
        @value-changed="${e => this.updateFileName(e)}">
        <template>
          <style>
            .display-name {
              color: var(--material-secondary-text-color);
              font-size: 12px;
              margin-left: -24px;
              display: block;
              display: -webkit-box;
              max-width: 200px;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;

            }
          </style>
          <div>
            <strong>[[item.textname]]</strong>
            <img src="[[item.imgStringPLI]]" item-icon>
            <img src="[[item.imgStringSKT]]" item-icon>
            <img src="[[item.imgStringTIB]]" item-icon>
            <img src="[[item.imgStringCHN]]" item-icon>
          </div>
          <div secondary><span class="display-name">[[item.displayName]]</span></div>
        </template>
      </vaadin-combo-box>

      ${this.shouldShowFolioBox()
        ? html`
            <vaadin-combo-box
              id="folio-select-combo-box"
              label="${this.getFolioLabel(this.language)}"
              item-value-path="segment_nr"
              item-label-path="num"
              .items="${this.folioData}"
              clear-button-visible
              @change="${e => this.updateFolio(e)}">
            </vaadin-combo-box>`
        : null}
      ${shouldShowTextSearchBox
        ? html`
            <paper-input
              placeholder="Search in Inquiry Text"
              class="search-box"
              type="search"
              no-label-float
              @change="${e => this.updateSearch(e.target.value)}"
              @keydown="${e => {
                if (e.code === 'Enter') {
                  this.updateSearch(e.target.value);
                }
              }}">
              <div slot="prefix">
                <iron-icon class="search-icon" icon="vaadin:search"></iron-icon>
              </div>
            </paper-input>`
        : null}
      ${shouldShowMultiLangSearchBox
        ? html`
            <paper-input
              placeholder="Search"
              class="search-box"
              type="search"
              no-label-float
              @change="${e => this.updateMultiLangSearch(e.target.value)}"
              @keydown="${e => {
                if (e.code === 'Enter') {
                  this.updateMultiLangSearch(e.target.value);
                }
              }}">
              <div slot="prefix">
                <iron-icon class="search-icon" icon="vaadin:search"></iron-icon>
              </div>
            </paper-input>`
        : null}
      ${shouldShowSortBox
        ? html`
            <vaadin-select
              @value-changed="${this.updateSortMethod}"
              label="Sorting method:"
              id="sort-box"
              class="input-field"
              value="${this.sortMethod}"
              item-label-path="filename">
              <template>
                <vaadin-list-box @value-changed="${this.updateSortMethod}">
                  <vaadin-item value="position">By position in Inquiry Text</vaadin-item>
                  <vaadin-item value="quoted-text">By position in Hit Text(s)</vaadin-item>
                  <vaadin-item value="length2">Length of match in Hit Text (beginning with longest)</vaadin-item>
                </vaadin-list-box>
              </template>
            </vaadin-select>`
        : null}
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
    `;
  }
}
