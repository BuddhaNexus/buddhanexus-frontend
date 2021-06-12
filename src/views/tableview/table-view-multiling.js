import { css, customElement, html, LitElement, property } from 'lit-element';

import { getTableViewMultiData } from '../../api/actions';
import '../data/data-view-subheader';
import './table-view-table.js';
import { getLanguageFromFilename } from '../utility/views-common';

import sharedDataViewStyles from '../data/data-view-shared.styles';

function TableViewInfoModalContent() {
  return html`
    <div>
      <p>
        Displays automatically generated sentence alignment between a given
        Sanskrit text and its Tibetan translation in a table form.
      </p>
    </div>
  `;
}

@customElement('table-view-multiling')
export class TableViewMultiLang extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) folio;
  @property({ type: String }) score;
  @property({ type: Boolean }) lengthMessage = false;
  @property({ type: String }) lang;
  @property({ type: String }) multiSearchString;
  @property({ type: Array }) parallelsData = [];
  @property({ type: String }) fetchLoading = true;
  @property({ type: Number }) pageNumber = 0;
  @property({ type: Number }) endReached = false;
  @property({ type: String }) transMethod;

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
  multiLangMessage() {
    if (this.score > 0) {
      return html`
        <span
          ><br /><b
            >Currently Only well-aligned matching translation passages are
            shown. In order to show all aligned passages, please set the
            "similarity Score" filter in the filter menu on the right side to
            zero.</b
          ><br
        /></span>
      `;
    }
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    this.lang = getLanguageFromFilename(this.fileName);
    _changedProperties.forEach(async (oldValue, propName) => {
      if (propName === 'fileName' && !this.fetchLoading) {
        if (this.folio) {
          this.folio = '';
        }
        this.resetView();
        await this.fetchData();
      }
      if (
        ['multiSearchString', 'folio', 'score'].includes(propName) &&
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
    this.pageNumber = 0;
  };

  async fetchData(pageNumber) {
    if (!this.fileName) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;
    let folio = '';
    if (this.folio) {
      folio = this.folio.num;
    }
    const parallels = await getTableViewMultiData({
      fileName: this.fileName,
      multi_lingual: this.multiLingualMode,
      score: this.score,
      folio: folio,
      page: pageNumber,
      search_string: this.multiSearchString,
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
        .fileName="${this.fileName}"
        .language="${this.lang}"
        .infoModalContent="${TableViewInfoModalContent()}"
        .lengthMessage="${this.lengthMessage}"
        .extraMessage="${this.multiLangMessage()}"
      ></data-view-subheader>

      <table-view-table
        .fileName="${this.fileName}"
        .transMethod="${this.transMethod}"
        .parallels="${this.parallelsData}"
        .searchString="${this.multiSearchString}"
        .setPageNumber="${this.setPageNumber}"
      ></table-view-table>
    `;
  }
}
