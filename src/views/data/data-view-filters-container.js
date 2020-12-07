import { customElement, html, css, LitElement, property } from 'lit-element';

import 'multiselect-combo-box/theme/material/multiselect-combo-box';

import '../utility/LoadingSpinner';
import {
  getCategoriesForFilterMenu,
  getFilesForFilterMenu,
  getCollectionsForVisual,
} from '../menus/actions';
import './data-view-filter-sliders';
import './data-view-filters-multilingual';

import styles from './data-view-filters-container.styles';

export const DATA_VIEW_MODES = {
  TEXT: 'text',
  TEXT_SEARCH: 'text-search',
  TABLE: 'table',
  NUMBERS: 'numbers',
  MULTILANG: 'multilang',
  GRAPH: 'graph',
  NEUTRAL: 'neutral',
};

@customElement('data-view-filters-container')
export class DataViewFiltersContainer extends LitElement {
  // Filter sliders:
  @property({ type: String }) viewMode;
  @property({ type: String }) fileName;
  @property({ type: Number }) score;
  @property({ type: Function }) updateScore;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) minLength;
  @property({ type: Function }) updateQuoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Function }) updateCooccurance;
  @property({ type: Function }) updateMultiLingualMode;
  @property({ type: Function }) updateLimitCollection;
  @property({ type: Array }) multiLingualMode;
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
    return (
      this.viewMode !== DATA_VIEW_MODES.GRAPH &&
      this.viewMode !== DATA_VIEW_MODES.MULTILANG
    );
  }

  shouldShowTargetDropdown() {
    return this.viewMode == DATA_VIEW_MODES.GRAPH;
  }

  shouldShowMultiLingual() {
    return (
      this.viewMode === DATA_VIEW_MODES.TEXT ||
      this.viewMode === DATA_VIEW_MODES.MULTILANG
    );
  }
  shouldShowSliders() {
    return this.viewMode !== DATA_VIEW_MODES.MULTILANG;
  }

  renderMultiSelectBox(label, id, changefunction, itempath) {
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
    const loading =
      this.filterCategoriesDataLoading ||
      this.filterFilesDataLoading ||
      this.filterCategoriesDataLoading ||
      this.filterCategoriesDataLoading;

    if (loading) {
      return html`
        <div class="loading-spinner-container">
          <bn-loading-spinner></bn-loading-spinner>
        </div>
      `;
    } else {
      //prettier-ignore
      return html`
        <div
          class="filter-group"
          style="display: ${this.shouldShowTargetDropdown() ? 'none' : 'block'}">
          ${this.renderMultiSelectBox(
            'Exclude collections:',
            'exclude-collection',
            this.handleCategoriesExcludeComboBoxChanged,
            this.filterCategoriesData
          )}
          ${this.renderMultiSelectBox(
            'Exclude files:',
            'exclude-filename',
            this.handleFilesExcludeComboBoxChanged,
            this.filterFilesData
          )}
        </div>
        <div
          class="filter-group"
          style="display: ${this.shouldShowTargetDropdown() ? 'none' : 'block'}">
          ${this.renderMultiSelectBox(
            'Limit to collections:',
            'filter-collection',
            this.handleCategoriesComboBoxChanged,
            this.filterCategoriesData
          )}
          ${this.renderMultiSelectBox(
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
    //prettier-ignore
    return html`
      <data-view-filters-multilingual
        style="display: ${
          this.shouldShowMultiLingual() ? 'block' : 'none'
        }"
        .fileName="${this.fileName}"
        .mainLang="${this.language}"
        .multiLingualMode="${this.multiLingualMode}"
        .updateMultiLingualMode="${this.updateMultiLingualMode}">
      </data-view-filters-multilingual>

      <data-view-filter-sliders
        style="display: ${
          this.shouldShowSliders() ? 'block' : 'none'
        }"
        .score="${this.score}"
        .updateScore="${this.updateScore}"
        .quoteLength="${this.quoteLength}"
        .minLength="${this.minLength}"
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
        item-value-path="collectionkey">
      </multiselect-combo-box>

      ${this.renderFilesCollectionFilters()}

      </div>
    `;
  }
}
