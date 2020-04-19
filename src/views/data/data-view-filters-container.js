import { customElement, html, css, LitElement, property } from 'lit-element';

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
    return [
      styles,
      css`
        .loading-spinner-container {
          width: 100%;
          height: 100%;
          margin-top: 5em;
          position: relative;
        }
      `,
    ];
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

  renderFilesCollectionFilters() {
    if (
      this.filterCategoriesDataLoading ||
      this.filterFilesDataLoading ||
      this.filterCategoriesDataLoading ||
      this.filterCategoriesDataLoading
    ) {
      return html`
        <div class="loading-spinner-container">
          <bn-loading-spinner></bn-loading-spinner>
        </div>
      `;
    } else {
      return html`
        <div class="filter-group">
          ${this.MultiSelectBox(
            'Exclude collections:',
            'exclude-collection',
            this.handleCategoriesExcludeComboBoxChanged,
            this.filterCategoriesData
          )}
          ${this.MultiSelectBox(
            'Exclude files:',
            'exclude-filename',
            this.handleFilesExcludeComboBoxChanged,
            this.filterFilesData
          )}
        </div>

        <div class="filter-group">
          ${this.MultiSelectBox(
            'Limit to collections:',
            'filter-collection',
            this.handleCategoriesComboBoxChanged,
            this.filterCategoriesData
          )}
          ${this.MultiSelectBox(
            'Limit to files:',
            'filter-filename',
            this.handleFilesComboBoxChanged,
            this.filterFilesData
          )}
        </div>
      `;
    }
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
      
      <multiselect-combo-box
        Label="Filter by target collection:"
        item-label-path="collectionname"
        style="display: ${
          this.shouldShowTargetDropdown() ? 'inline-flex' : 'none'
        }"
        class="input-field"
        @selected-items-changed="${this.handleTargetComboBoxChanged}"
        .items="${this.targetCollectionData}"
        item-value-path="collectionkey"
      >
      </multiselect-combo-box>

      ${this.renderFilesCollectionFilters()}

      </div>
    `;
  }
}
