import { css, customElement, html, LitElement, property } from 'lit-element';

import '../data/data-view-header';
import sharedDataViewStyles from '../data/data-view-shared.styles';
import { getSearchDataFromBackend } from '../../api/actions';
import './search-view-list.js';

@customElement('search-view')
export class SearchView extends LitElement {
  @property({ type: String }) searchQuery;
  // @property({ type: String }) score;
  // @property({ type: Number }) probability;
  // @property({ type: Number }) quoteLength;
  // @property({ type: Number }) cooccurance;
  // @property({ type: String }) sortMethod;
  @property({ type: Array }) limitCollection;

  @property({ type: Array }) searchResults = [];
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;
  @property({ type: Number }) pageNumber = 0;
  @property({ type: Number }) endReached = false;

  static get styles() {
    return [
      sharedDataViewStyles,
      css`
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
      if (
        [
          // TODO: uncomment this after filters are added
          // 'score',
          // 'cooccurance',
          // 'sortMethod',
          // 'quoteLength',
          // 'limitCollection',
          'queryString',
        ].includes(propName) &&
        !this.fetchLoading
      ) {
        this.resetView();
        await this.fetchData();
      }
      if (propName === 'searchResults') {
        // data fetched, add listener
        this.addInfiniteScrollListener();
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
    console.log('SEARCH RESULTS', this.searchResults);
    // todo: display notification with error
    this.fetchError = error;
  }

  addInfiniteScrollListener = async () => {
    await this.updateComplete;

    const listItems = this.shadowRoot
      .querySelector('search-view-list')
      .shadowRoot.querySelectorAll('.search-view-list__item');
    const observedListItem = listItems[listItems.length - 1];

    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        observer.unobserve(observedListItem);
        await this.fetchNextPage();
      }
    });
    if (listItems.length > 0) {
      observer.observe(observedListItem);
    }
  };

  async fetchNextPage() {
    if (!this.fetchLoading && !this.endReached) {
      this.fetchLoading = true;
      this.pageNumber = this.pageNumber + 1;
      await this.fetchData();
    }
  }

  setPageNumber = pageNumber => (this.pageNumber = pageNumber);

  // TODO:
  // - check if data view header works
  // - pass search results from backend
  render() {
    return html`
      <h1>Search Results:</h1>

      ${this.fetchLoading
        ? html`
            <bn-loading-spinner></bn-loading-spinner>
          `
        : null}

      <search-view-list
        .searchQuery="${this.searchQuery}"
        .probability="${this.probability}"
        .quoteLength="${this.quoteLength}"
        .cooccurance="${this.cooccurance}"
        .limitCollection="${this.limitCollection}"
        .searchResults="${this.searchResults}"
        .setPageNumber="${this.setPageNumber}"
      ></search-view-list>
    `;
  }
}
