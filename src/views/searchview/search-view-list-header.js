import { customElement, LitElement, property, html, css } from 'lit-element';

@customElement('search-view-list-header')
class SearchViewListHeader extends LitElement {
  @property({ type: String }) searchQuery;
  @property({ type: String }) resultNumber;

  static get styles() {
    return [
      css`
        .list-header-container {
          display: flex;
          flex: 1;
        }

        #search-result-header {
          padding-bottom: 16px;
          padding-top: 16px;
          font-weight: bold;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          text-transform: none;
        }
      `,
    ];
  }
  maxMessage() {
    if (this.resultNumber == 200) {
      return html`
        (max. possible number of 200 results reached)
      `;
    }
  }
  render() {
    if (this.resultNumber == 0) {
      //prettier-ignore
      return html`
        <div id="search-result-header">
          No results found
        </div>`;
    }
    return html`
      <div class="list-header-container">
        <div id="search-result-header">
          Showing ${this.resultNumber} results for query "${this.searchQuery}"
          ${this.maxMessage()}:
        </div>
      </div>
    `;
  }
}

export default SearchViewListHeader;
