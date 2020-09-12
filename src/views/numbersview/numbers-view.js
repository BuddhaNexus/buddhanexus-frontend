import { customElement, html, LitElement, property } from 'lit-element';

import { getSegmentsForFile } from '../../api/actions';
import NumbersViewTable from './numbers-view-table';
import { getLanguageFromFilename } from '../utility/views-common';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './numbers-view.styles';

const NumbersViewInfoModalContent = () => html`
  <div>
    <p>
      Displays potential parallels by numbers sorted by segment as they appear
      in the text.
    </p>
  </div>
`;

@customElement('numbers-view')
export class NumbersView extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: String }) folio;
  @property({ type: Number }) pageNumber = 0;
  @property({ type: Array }) segmentsData = [];
  @property({ type: String }) lang;
  @property({ type: Array }) collectionsData = [];
  @property({ type: String }) fetchError;
  @property({ type: String }) addObserverFlag = true;
  @property({ type: String }) fetchLoading = true;
  @property({ type: String }) headerVisibility;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchData();
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    this.lang = getLanguageFromFilename(this.fileName);
    _changedProperties.forEach(async (oldValue, propName) => {
      if (propName === 'pageNumber' && !this.fetchLoading) {
        await this.fetchData();
      }
      if (propName === 'fileName' && !this.fetchLoading) {
        if (this.folio) {
          this.folio = '';
        }
        this.resetView();
        await this.fetchData();
      }
      if (
        [
          'score',
          'cooccurance',
          'sortMethod',
          'quoteLength',
          'limitCollection',
          'folio',
        ].includes(propName) &&
        !this.fetchLoading
      ) {
        this.resetView();
        await this.fetchData();
      }
      if (propName === 'collectionsData') {
        // data fetched, add listener
        this.addInfiniteScrollListener();
      }
    });
  }

  resetView() {
    this.segmentsData = [];
    this.collectionsData = [];
    this.pageNumber = 0;
  }

  updatePageNumber() {
    this.pageNumber = this.pageNumber + 1;
  }

  addInfiniteScrollListener = async () => {
    await this.updateComplete;
    const tableRows = this.shadowRoot
      .querySelector('.numbers-view-table')
      .querySelectorAll('.numbers-view-table-row');
    const observedRow = tableRows[tableRows.length - 1];
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        observer.unobserve(observedRow);
        this.updatePageNumber();
      }
    });
    if (this.addObserverFlag) {
      observer.observe(observedRow);
    }
  };

  async fetchData() {
    if (!this.fileName) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;
    let folio = '';
    if (this.folio) {
      folio = this.folio.num;
    }

    const { segments, collections, error } = await getSegmentsForFile({
      page: this.pageNumber,
      fileName: this.fileName,
      score: this.score,
      co_occ: this.cooccurance,
      par_length: this.quoteLength,
      limit_collection: this.limitCollection,
      folio: folio,
    });
    // We only add the observer to trigger the reloading when new data was added to the current segments; otherwise we reached the end of the data and don't need to observe anymore.
    this.addObserverFlag = false;
    segments.map(segment => {
      if (!this.segmentsData.includes(segment)) {
        this.addObserverFlag = true;
      }
    });
    this.segmentsData = [...this.segmentsData, ...segments];
    this.collectionsData = [...this.collectionsData, ...collections];
    this.fetchError = error;

    this.fetchLoading = false;
  }

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
        .infoModalContent="${NumbersViewInfoModalContent()}"
      ></data-view-subheader>
      <div class="table-wrapper ${this.headerVisibility}">
        ${NumbersViewTable({
          fileName: this.fileName,
          collections: this.collectionsData,
          segments: this.segmentsData,
          language: this.lang,
        })}
      </div>
    `;
  }
}
