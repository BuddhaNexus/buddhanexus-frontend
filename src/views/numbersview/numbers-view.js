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

  @property({ type: Array }) segmentsData;
  @property({ type: String }) lang;
  @property({ type: Array }) collectionsData;
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  async connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    this.lang = getLanguageFromFilename(this.fileName);
    _changedProperties.forEach((oldValue, propName) => {
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
        this.fetchData();
      }
    });
  }

  async fetchData() {
    if (!this.fileName) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;

    const { segments, collections, error } = await getSegmentsForFile({
      fileName: this.fileName,
      score: this.score,
      co_occ: this.cooccurance,
      par_length: this.quoteLength,
      limit_collection: this.limitCollection,
    });

    this.segmentsData = segments;
    this.collectionsData = collections;
    this.fetchError = error;

    this.fetchLoading = false;
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <p class="slow-loading">
          Due to the large amount of data, loading might be very slow.
        </p>
        <p class="slow-loading">Please wait ...</p>
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }
    //prettier-ignore
    return html`
      <data-view-subheader
        .fileName="${this.fileName}"
        .language="${this.lang}"
        .infoModalContent="${NumbersViewInfoModalContent()}">
      </data-view-subheader>
      <div class="table-wrapper">
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
