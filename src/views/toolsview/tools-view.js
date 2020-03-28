import { css, customElement, html, LitElement, property } from 'lit-element';

import '../data/data-view-subheader';
import sharedDataViewStyles from '../data/data-view-shared.styles';
import { getTaggedSanskrit } from '../../api/actions';

@customElement('tools-view')
export class SearchView extends LitElement {
  @property({ type: String }) taggerQuery;

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
    this.taggerQuery = this.location.params.query;
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
    this.taggerResult = [];
    this.endReached = false;
  };

  async fetchData() {
    if (!this.searchQuery) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;
    const { taggerResult, error } = await getTaggedSanskrit({
      query: this.taggerQuery,
    });
    this.fetchLoading = false;
    if (!taggerResult || taggerResult.length === 0) {
      this.endReached = true;
      return;
    }

    this.taggerResult = [...this.taggerResult, ...taggerResult];
    // todo: display notification with error
    this.fetchError = error;
  }

  // TODO:
  // - check if data view header works
  // - pass search results from backend
  render() {
    return html`
      <div class="search-view-container">
        <h1>Tagger Result:</h1>
        <p>${this.taggerResult}</p>
      </div>
    `;
  }
}
