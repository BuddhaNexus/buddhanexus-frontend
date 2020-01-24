import { customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-group';
import '@vaadin/vaadin-details/theme/material/vaadin-details';
import '@vaadin/vaadin-select/theme/material/vaadin-select';
import '@polymer/paper-slider/paper-slider';
import 'multiselect-combo-box/theme/material/multiselect-combo-box';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box';

import '../utility/LoadingSpinner';
import {
  getCategoriesForFilterMenu,
  getFilesForFilterMenu,
  getCollectionsForVisual,
} from '../menus/actions';

import styles from './data-view-filters-container.styles';

export const DATA_VIEW_MODES = {
  TEXT: 'text',
  TABLE: 'table',
  NUMBERS: 'numbers',
  GRAPH: 'graph',
};

@customElement('data-view-filters-container')
export class DataViewFiltersContainer extends LitElement {
  @property({ type: String }) viewMode;
  @property({ type: Function }) viewModeChanged;
  @property({ type: Number }) score;
  @property({ type: Function }) updateScore;
  @property({ type: Function }) updateSearch;
  @property({ type: Function }) updateSortMethod;
  @property({ type: Number }) cooccurance;
  @property({ type: Function }) updateCooccurance;
  @property({ type: Function }) updateLimitCollection;
  @property({ type: Function }) updateTargetCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Function }) updateQuoteLength;
  @property({ type: String }) language;

  // local properties
  @property({ type: Array }) selectedFilenames = [];
  @property({ type: Array }) selectedCategories = [];
  @property({ type: Array }) selectedFilenamesExclude = [];
  @property({ type: Array }) selectedCategoriesExclude = [];
  @property({ type: Array }) selectedCollections = [];
  @property({ type: Array }) filterFilesData = [];
  @property({ type: Array }) filterCategoriesData = [];
  @property({ type: Array }) targetCollectionData = [];
  @property({ type: String }) filterTargetCollectionDataError = false;
  @property({ type: Boolean }) filterFilesDataLoading = true;
  @property({ type: String }) filterFilesDataError = false;
  @property({ type: Boolean }) filterCategoriesDataLoading = true;
  @property({ type: String }) filterCategoriesDataError = false;

  static get styles() {
    return [styles];
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.fetchTargetCollection();
    this.fetchFilterFiles();
    this.fetchFilterCategories();
  }

  async fetchFilterFiles() {
    this.filterFilesDataLoading = true;
    const { filteritems, error } = await getFilesForFilterMenu({
      language: this.language,
    });
    this.filterFilesData = filteritems;

    this.filterFilesDataError = error;
    this.filterFilesDataLoading = false;
  }

  async fetchFilterCategories() {
    this.filterCategoriesDataLoading = true;
    const { categoryitems, error } = await getCategoriesForFilterMenu({
      language: this.language,
    });
    this.filterCategoriesData = categoryitems[0];
    this.filterCategoriesDataError = error;
    this.filterCategoriesDataLoading = false;
  }

  async fetchTargetCollection() {
    const { result, error } = await getCollectionsForVisual();
    let targetCollectionData = [];
    result.forEach(collection => {
      if (collection.collectionlanguage === this.language) {
        targetCollectionData.push(collection);
      }
    });
    this.targetCollectionData = targetCollectionData;
    this.filterTargetCollectionDataError = error;
  }

  handleFilesComboBoxChanged = e => {
    this.selectedFilenames = e.detail.value.map(item => item.filename);
    this.updateFilters();
  };

  handleCategoriesComboBoxChanged(e) {
    this.selectedCategories = e.detail.value.map(item => item.category);
    this.updateFilters();
  }

  handleFilesExcludeComboBoxChanged = e => {
    let filenamesExclude = e.detail.value.map(item => item.filename);
    this.selectedFilenamesExclude = filenamesExclude.map(item => `!${item}`);
    this.updateFilters();
  };

  handleCategoriesExcludeComboBoxChanged(e) {
    let CategoriesExclude = e.detail.value.map(item => item.category);
    this.selectedCategoriesExclude = CategoriesExclude.map(item => `!${item}`);
    this.updateFilters();
  }

  handleTargetComboBoxChanged(e) {
    this.selectedCollections = e.detail.value.map(item => item.collectionkey);
    this.updateTargetFilters();
  }

  updateFilters = () => {
    this.updateLimitCollection([
      ...this.selectedFilenames,
      ...this.selectedCategories,
      ...this.selectedFilenamesExclude,
      ...this.selectedCategoriesExclude,
    ]);
  };

  updateTargetFilters = () => {
    this.updateTargetCollection([...this.selectedCollections]);
  };

  shouldShowSortingDropdown() {
    return this.viewMode === DATA_VIEW_MODES.TABLE;
  }

  shouldShowFilterDropdown() {
    return this.viewMode !== DATA_VIEW_MODES.GRAPH;
  }

  shouldShowTargetDropdown() {
    return this.viewMode === DATA_VIEW_MODES.GRAPH;
  }

  MultiSelectBox(label, id, changefunction, itempath) {
    return html`
      <multiselect-combo-box
        Label="${label}"
        id="${id}"
        item-label-path="categoryname"
        style="display: ${this.shouldShowFilterDropdown()
          ? 'inline-flex'
          : 'none'}"
        @selected-items-changed="${changefunction}"
        .items="${itempath}"
        item-value-path="category"
      >
      </multiselect-combo-box>
    `;
  }

  createFilesCollectionFilters() {
    return html`
      <div class="file-categories-filters">
        ${this.filterCategoriesDataLoading
          ? html`
              <span>Loading...</span>
            `
          : html`
              ${this.MultiSelectBox(
                'Limit to collections:',
                'filter-collection',
                this.handleCategoriesComboBoxChanged,
                this.filterCategoriesData
              )}
            `}
        ${this.filterFilesDataLoading
          ? html`
              <span>Loading...</span>
            `
          : html`
              ${this.MultiSelectBox(
                'Limit to files:',
                'filter-filename',
                this.handleFilesComboBoxChanged,
                this.filterFilesData
              )}
            `}
        <br />
        ${this.filterCategoriesDataLoading
          ? html`
              <span>Loading...</span>
            `
          : html`
              ${this.MultiSelectBox(
                'Exclude collections:',
                'exclude-collection',
                this.handleCategoriesExcludeComboBoxChanged,
                this.filterCategoriesData
              )}
            `}
        ${this.filterFilesDataLoading
          ? html`
              <span>Loading...</span>
            `
          : html`
              ${this.MultiSelectBox(
                'Exclude files:',
                'exclude-filename',
                this.handleFilesExcludeComboBoxChanged,
                this.filterFilesData
              )}
            </div>`}
      </div>
    `;
  }

  // TODO: Refactor these HTML objects into separate file.
  createFilterParameters() {
    return html`
      <div id="filter-parameters">
        <vaadin-vertical-layout>
          <div class="vertical-layout">
            <div
              id="slider-container"
              name="set 100% for highest similarity, 0% to see all"
            >
              <div id="slider-label">Similarity Score:</div>
              <paper-slider
                id="score-cutoff"
                value="${this.score}"
                @change="${this.updateScore}"
                max="100"
                pin
              >
              </paper-slider>
            </div>
          </div>
          <div class="vertical-layout">
            <div
              id="slider-container"
              name="set min. length of quoted segment in characters"
            >
              <div id="slider-label">Min. Match Length:</div>
              <paper-slider
                id="quote-length"
                value="${this.quoteLength}"
                @change="${this.updateQuoteLength}"
                max="300"
                min="5"
                pin
              >
              </paper-slider>
            </div>
          </div>
          <div class="vertical-layout">
            <div
              id="slider-container"
              name="set the number of times a parallel is contained within other parallels"
            >
              <div id="slider-label">Nr. co-occurences:</div>
              <paper-slider
                id="co-occurences"
                value="${this.cooccurance}"
                @change="${this.updateCooccurance}"
                max="30"
                min="1"
                dir="rtl"
                pin
              >
              </paper-slider>
            </div>
          </div>
        </vaadin-vertical-layout>
      </div>
    `;
  }

  createTargetFilterForGraph() {
    return html`
      <multiselect-combo-box
        Label="Filter by target collection:"
        id="filter-target-collection"
        item-label-path="collectionname"
        style="display: ${this.shouldShowTargetDropdown()
          ? 'inline-flex'
          : 'none'}"
        @selected-items-changed="${this.handleTargetComboBoxChanged}"
        .items="${this.targetCollectionData}"
        item-value-path="collectionkey"
      >
      </multiselect-combo-box>
    `;
  }

  createFilterBox() {
    return html`
      <div class="filter-group">
        <div class="filter-options-accordion">
          <!-- TODO: Change from  "details" component to dropdown -->
          <vaadin-details id="filter-options-dropdown">
            <div slot="summary" id="details-box">Filter options:</div>
            <div id="filters-box">
              ${this.createFilterParameters()}
              ${this.createFilesCollectionFilters()}
              ${this.createTargetFilterForGraph()}
            </div>
          </vaadin-details>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <vaadin-radio-group
        label="Choose view:"
        class="visibility-filters"
        value="${this.viewMode}"
        @value-changed="${e => this.handleViewModeChanged(e.target.value)}"
      >
        ${Object.values(DATA_VIEW_MODES).map(filter => {
          if (filter != 'numbers' || this.language != 'tib') {
            return html`
              <vaadin-radio-button value="${filter}">
                ${filter}
              </vaadin-radio-button>
            `;
          }
        })}
      </vaadin-radio-group>
      ${this.createFilterBox()}
      ${
        this.viewMode === DATA_VIEW_MODES.TEXT
          ? html`
              <div class="search-group">
                <vaadin-text-field
                  id="search-box"
                  .disabled="${this.viewMode !== DATA_VIEW_MODES.TEXT}"
                  @change="${this.updateSearch}"
                  @submit="${this.updateSearch}"
                  clear-button-visible
                  placeholder="Search in Inquiry Text"
                >
                  <iron-icon
                    id="search-icon"
                    icon="vaadin:search"
                    slot="prefix"
                  ></iron-icon>
                </vaadin-text-field>
              </div>
            `
          : null
      }
        <vaadin-select
          @value-changed="${this.updateSortMethod}"
          Label="Sorting method:"
          id="sort-collection"
          item-label-path="filename"
          style="display: ${
            this.shouldShowSortingDropdown() ? 'inline-flex' : 'none'
          }"
        >
          <template>
            <vaadin-list-box @value-changed="${this.updateSortMethod}">
              <vaadin-item value="position">By position in Inquiry Text</vaadin-item>
              <vaadin-item value="quoted-text"
                >By position in Hit Text(s)</vaadin-item
              >
              <vaadin-item value="length"
                >Length of match in Inquiry Text (beginning with
                longest)</vaadin-item
              >
              <vaadin-item value="length2"
                >Length of match in Hit Text (beginning with
                longest)</vaadin-item
              >
            </vaadin-list-box>
          </template>
        </vaadin-select>
      </div>
    `;
  }
}
