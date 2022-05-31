import { css, customElement, html, LitElement, property } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import { getSearchDataFromBackend } from '../../api/actions';
import './search-view-list.js';
import './search-view-filters.js';
import '../components/side-sheet';

@customElement('search-view')
export class SearchView extends LitElement {
  @property({ type: String }) searchQuery;
  @property({ type: Array }) searchResults = [];
  @property({ type: Array }) limitCollection = [];
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;
  @property({ type: Boolean }) filterBarOpen;

  static get styles() {
    return [
      sharedDataViewStyles,
      css`
        .search-view-container {
          padding: 48px;
        }

        h1 {
          font-size: 1.6em;
          font-weight: bold;
          font-family: var(--system-font-stack);
        }

        .search-view-list {
          overflow: scroll;
          width: 100%;
          height: 100%;
        }

        .filter-bar-toggle-icon {
          min-height: 22px;
          min-width: 22px;
          pointer-events: auto;
          opacity: 1;
          color: var(--material-secondary-text-color);
        }

        .filter-bar-toggle-icon.filter-bar-toggle-icon--filter-bar-open {
          opacity: 0;
          pointer-events: none;
        }

        .search__header-container {
          display: flex;
          justify-content: space-between;
        }

        side-sheet {
          height: calc(100% - 142px);
          overflow-y: auto;
          overflow-x: hidden;
          transition: width var(--vaadin-app-layout-transition),
            min-width var(--vaadin-app-layout-transition);
          background-color: white;
          position: absolute;
          right: 0px;
          top: 142px;
          z-index: 1;
        }

        side-sheet.side-sheet--open {
          min-width: var(--side-sheet-width);
          width: var(--side-sheet-width);
        }

        side-sheet.side-sheet--closed {
          display: none;
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
        ['queryString', 'limitCollection'].includes(propName) &&
        !this.fetchLoading
      ) {
        await this.fetchData();
      }
    });
  }

  async fetchData() {
    if (!this.searchQuery) {
      this.fetchLoading = false;
      return;
    }
    if (this.limitCollection.length == 0) {
      this.limitCollection = ['pli_all', 'skt_all', 'tib_all', 'chn_all'];
    }
    this.fetchLoading = true;
    const { searchResults, error } = await getSearchDataFromBackend({
      query: this.searchQuery,
      limit_collection: this.limitCollection,
    });
    this.fetchLoading = false;
    if (!searchResults || searchResults.length === 0) {
      this.endReached = true;
      return;
    }

    this.searchResults = [...this.searchResults, ...searchResults];
    this.fetchError = error;
  }

  toggleFilterBarOpen = () => {
    this.filterBarOpen = !this.filterBarOpen;
  };

  setLimitCollection = limitCollection => {
    // if we don't do this check, limitCollection gets updated constantly and triggers refetching of the data which is very undesired.
    if (this.limitCollection.toString() !== limitCollection.toString()) {
      this.limitCollection = limitCollection;
    }
  };

  render() {
    //prettier-ignore
    return html`
      <div class="search-view-container">
        ${this.fetchLoading
          ? html`
              <bn-loading-spinner></bn-loading-spinner>
            `
          : null}
        <div class="search__header-container">
          <h1>Search Results:</h1>
          <iron-icon
            icon="vaadin:filter"
            title="Filter Search Results"
            @click="${this.toggleFilterBarOpen}"
            class="filter-bar-toggle-icon ${this.filterBarOpen &&
                  'filter-bar-toggle-icon--filter-bar-open'}">
          </iron-icon>
        </div>

        <side-sheet
          id="filter-menu"
          class="${this.filterBarOpen
            ? 'side-sheet--open'
            : 'side-sheet--closed'}"
          .handleClose="${() => {
            this.filterBarOpen = false;
          }}">
          <search-view-filters
            .setFilterSelection="${this.setLimitCollection}">
          </search-view-filters>
        </side-sheet>

        <search-view-list
          .searchQuery="${this.searchQuery}"
          .searchResults="${this.searchResults}">
        </search-view-list>
      </div>
    `;
  }
}
