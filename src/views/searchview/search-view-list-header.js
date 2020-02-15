import { customElement, LitElement, property, html, css } from 'lit-element';

import styles from '../data/data-view.styles';
import sharedStyles from '../data/data-view-shared.styles';

@customElement('list-view-list-header')
class SearchViewListHeader extends LitElement {
  @property({ type: String }) searchQuery;

  static get styles() {
    return [
      css`
        .list-header-container {
          display: flex;
          flex: 1;
        }

        .search-result-header {
          background-color: var(--color-light-grey);
          margin: 6px;
          padding: 12px;
          flex: 2;
        }
      `,
      styles,
      sharedStyles,
    ];
  }

  render() {
    return html`
      <div class="list-header-container">
        <div class="search-result-header material-card">
          ${this.searchQuery} - search results:
        </div>
      </div>
    `;
  }
}

export default SearchViewListHeader;
