import { css, customElement, html, LitElement, property } from 'lit-element';

import { getTableViewData } from '../../api/actions';
import '../data/data-view-subheader';
import './table-view-table.js';
import { getLanguageFromFilename } from '../utility/views-common';

import sharedDataViewStyles from '../data/data-view-shared.styles';

function TableViewInfoModalContent() {
  return html`
    <div>
      <p>
        Displays only the parallel numbers. It is possible to sort the parallels
        according to their position in the main text, grouped by the text in
        which they appear and by their length.
      </p>
    </div>
  `;
}

@customElement('table-view')
export class TableView extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) score;
  @property({ type: Number }) probability;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: String }) sortMethod;
  @property({ type: Array }) limitCollection;

  @property({ type: String }) lang;
  @property({ type: Array }) parallelsData = [];
  @property({ type: String }) fetchLoading = true;
  @property({ type: Number }) pageNumber = 0;
  @property({ type: Number }) endReached = false;

  static get styles() {
    return [
      sharedDataViewStyles,
      css`
        .table-view-table {
          overflow: scroll;
          width: 100%;
          height: 100%;
        }
      `,
    ];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchData();
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    this.lang = getLanguageFromFilename(this.fileName);
    _changedProperties.forEach(async (oldValue, propName) => {
      if (
        [
          'score',
          'cooccurance',
          'sortMethod',
          'quoteLength',
          'limitCollection',
          'fileName',
        ].includes(propName) &&
        !this.fetchLoading
      ) {
        this.resetView();
        await this.fetchData();
      }
      if (propName === 'parallelsData') {
        // data fetched, add listener
        this.addInfiniteScrollListener();
      }
    });
  }

  resetView = () => {
    this.parallelsData = [];
    this.endReached = false;
  };

  async fetchData(pageNumber) {
    if (!this.fileName) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;

    const parallels = await getTableViewData({
      fileName: this.fileName,
      score: this.score,
      co_occ: this.cooccurance,
      sort_method: this.sortMethod,
      par_length: this.quoteLength,
      limit_collection: this.limitCollection,
      page: pageNumber,
    });

    this.fetchLoading = false;

    if (!parallels || parallels.length === 0) {
      this.endReached = true;
      return;
    }

    this.parallelsData = [...this.parallelsData, ...parallels];
  }

  addInfiniteScrollListener = async () => {
    await this.updateComplete;
    const tableRows = this.shadowRoot
      .querySelector('table-view-table')
      .shadowRoot.querySelectorAll('.table-view-table__row');
    const observedRow = tableRows[tableRows.length - 1];
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        observer.unobserve(observedRow);
        await this.fetchNextPage();
      }
    });
    if (tableRows.length > 0) {
      observer.observe(observedRow);
    }
  };

  async fetchNextPage() {
    if (!this.fetchLoading && !this.endReached) {
      this.fetchLoading = true;
      this.pageNumber = this.pageNumber + 1;
      await this.fetchData(this.pageNumber);
    }
  }

  setPageNumber = pageNumber => (this.pageNumber = pageNumber);

  render() {
    return html`
      ${this.fetchLoading
        ? html`
            <bn-loading-spinner></bn-loading-spinner>
          `
        : null}

      <data-view-subheader
        .score="${this.score}"
        .quoteLength="${this.quoteLength}"
        .cooccurance="${this.cooccurance}"
        .limitCollection="${this.limitCollection}"
        .fileName="${this.fileName}"
        .language="${this.lang}"
        .infoModalContent="${TableViewInfoModalContent()}"
      ></data-view-subheader>

      <table-view-table
        .fileName="${this.fileName}"
        .probability="${this.probability}"
        .quoteLength="${this.quoteLength}"
        .cooccurance="${this.cooccurance}"
        .limitCollection="${this.limitCollection}"
        .parallels="${this.parallelsData}"
        .setPageNumber="${this.setPageNumber}"
      ></table-view-table>
    `;
  }
}
