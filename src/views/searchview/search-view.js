// TODO: add filters after function is added in the backend.
// @property({ type: Number }) score;
// @property({ type: Number }) quoteLength;
// @property({ type: Number }) cooccurance;
// @property({ type: Array }) limitCollection;
// Add all these to the changedProperties to reload when these have changed
// Add all these to the <search-view-list> element

import { css, customElement, html, LitElement, property } from 'lit-element';

import '../data/data-view-subheader';
import sharedDataViewStyles from '../data/data-view-shared.styles';
import { getSearchDataFromBackend } from '../../api/actions';
import './search-view-list.js';

@customElement('search-view')
export class SearchView extends LitElement {
  @property({ type: String }) searchQuery;
  @property({ type: Array }) limitCollection;

  @property({ type: Array }) searchResults = [];
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;
  @property({ type: Number }) endReached = false;

  static get styles() {
    return [
      sharedDataViewStyles,
      css`
        .search-view-container {
          padding: 48px;
        }

        .search-view-list {
          overflow: scroll;
          width: 100%;
          height: 100%;
        }
      `,
    ];
  }

  async connectedCallback() {
    super.connectedCallback();
    this.searchQuery = this.location.params.query;

    await this.fetchData();
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);

    _changedProperties.forEach(async (oldValue, propName) => {
      if (['queryString'].includes(propName) && !this.fetchLoading) {
        this.resetView();
        await this.fetchData();
      }
    });
  }

  resetView = () => {
    this.searchResults = [];
    this.endReached = false;
  };

  async fetchData() {
    if (!this.searchQuery) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;
    const { searchResults, error } = await getSearchDataFromBackend({
      query: this.searchQuery,
    });
    this.fetchLoading = false;
    if (!searchResults || searchResults.length === 0) {
      this.endReached = true;
      return;
    }

    this.searchResults = [...this.searchResults, ...searchResults];
    this.fetchError = error;
  }

  render() {
    return html`
      <div class="search-view-container">
        <h1>Search Results:</h1>

        ${this.fetchLoading
          ? html`
              <bn-loading-spinner></bn-loading-spinner>
            `
          : null}

        <search-view-list
          .searchQuery="${this.searchQuery}"
          .searchResults="${this.searchResults}"
        ></search-view-list>
      </div>
    `;
  }
}
