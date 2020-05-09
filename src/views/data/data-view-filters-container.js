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
import './data-view-filter-sliders';

import styles from './data-view-filters-container.styles';

export const DATA_VIEW_MODES = {
  TEXT: 'text',
  TABLE: 'table',
  NUMBERS: 'numbers',
  GRAPH: 'graph',
  NEUTRAL: 'neutral',
};

@customElement('data-view-filters-container')
export class DataViewFiltersContainer extends LitElement {
  // Filter sliders:
  @property({ type: String }) viewMode;
  @property({ type: Number }) score;
  @property({ type: Function }) updateScore;
  @property({ type: Number }) quoteLength;
  @property({ type: Function }) updateQuoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Function }) updateCooccurance;

  @property({ type: Function }) updateSearch;
  @property({ type: Function }) updateSortMethod;
  @property({ type: Function }) updateLimitCollection;
  @property({ type: Function }) updateTargetCollection;
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
        class="input-field"
        item-value-path="category"
      >
      </multiselect-combo-box>
    `;
  }

  createFilesCollectionFilters() {
    if (
      this.filterCategoriesDataLoading ||
      this.filterFilesDataLoading ||
      this.filterCategoriesDataLoading ||
      this.filterCategoriesDataLoading
    ) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    } else {
      return html`
        <div class="filter-group">
          ${html`
            ${this.MultiSelectBox(
              'Exclude collections:',
              'exclude-collection',
              this.handleCategoriesExcludeComboBoxChanged,
              this.filterCategoriesData
            )}
          `}
          ${html`
              ${this.MultiSelectBox(
                'Exclude files:',
                'exclude-filename',
                this.handleFilesExcludeComboBoxChanged,
                this.filterFilesData
              )}
            </div>`}
        </div>

        <div class="filter-group">
          ${html`
            ${this.MultiSelectBox(
              'Limit to collections:',
              'filter-collection',
              this.handleCategoriesComboBoxChanged,
              this.filterCategoriesData
            )}
          `}
          ${html`
            ${this.MultiSelectBox(
              'Limit to files:',
              'filter-filename',
              this.handleFilesComboBoxChanged,
              this.filterFilesData
            )}
          `}
        </div>
      `;
    }
  }

  createTargetFilterForGraph() {
    return html`
      <multiselect-combo-box
        Label="Filter by target collection:"
        item-label-path="collectionname"
        style="display: ${this.shouldShowTargetDropdown()
          ? 'inline-flex'
          : 'none'}"
        class="input-field"
        @selected-items-changed="${this.handleTargetComboBoxChanged}"
        .items="${this.targetCollectionData}"
        item-value-path="collectionkey"
      >
      </multiselect-combo-box>
    `;
  }

  createSortMethodSelector() {
    if (!this.shouldShowSortingDropdown()) {
      return null;
    }
    return html`
      <vaadin-select
        @value-changed="${this.updateSortMethod}"
        Label="Sorting method:"
        class="input-field"
        item-label-path="filename"
      >
        <template>
          <vaadin-list-box @value-changed="${this.updateSortMethod}">
            <vaadin-item value="position"
              >By position in Inquiry Text</vaadin-item
            >
            <vaadin-item value="quoted-text"
              >By position in Hit Text(s)</vaadin-item
            >
            <vaadin-item value="length"
              >Length of match in Inquiry Text (beginning with
              longest)</vaadin-item
            >
            <vaadin-item value="length2"
              >Length of match in Hit Text (beginning with longest)</vaadin-item
            >
          </vaadin-list-box>
        </template>
      </vaadin-select>
    `;
  }

  createTextViewSearchBox() {
    if (this.viewMode !== DATA_VIEW_MODES.TEXT) {
      return null;
    }
    return html`
      <vaadin-text-field
        .disabled="${this.viewMode !== DATA_VIEW_MODES.TEXT}"
        @change="${this.updateSearch}"
        @submit="${this.updateSearch}"
        clear-button-visible
        class="input-field search-box"
        placeholder="Search in Inquiry Text"
      >
        <iron-icon
          id="search-icon"
          icon="vaadin:search"
          slot="prefix"
        ></iron-icon>
      </vaadin-text-field>
    `;
  }

  render() {
    return html`    
      <data-view-filter-sliders .score="${this.score}" 
      .updateScore="${this.updateScore}" 
      .quoteLength="${this.quoteLength}" 
      .updateQuoteLength="${this.updateQuoteLength}" 
      .cooccurance="${this.cooccurance}" 
      .updateCooccurance="${this.updateCooccurance}">
      </data-view-filter-sliders>
      
      ${this.createTargetFilterForGraph()}

      ${this.createSortMethodSelector()}
      
      ${this.createTextViewSearchBox()}

      ${this.createFilesCollectionFilters()}

      </div>
    `;
  }
}
