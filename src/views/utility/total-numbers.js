import { customElement, html, LitElement, property } from 'lit-element';
import { getParallelCount } from '../../api/actions';
import { replaceFileNameForDisplay } from '../utility/preprocessing';

@customElement('data-view-total-numbers')
export class TotalNumbers extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;

  @property({ type: Number }) parallelCount;
  @property({ type: Function }) fetchLoading = false;
  @property({ type: String }) fetchError;

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (
        [
          'fileName',
          'score',
          'cooccurance',
          'quoteLength',
          'limitCollection',
        ].includes(propName)
      ) {
        this.updateParallelCount();
        this.fetchLoading = true;
      }
    });
  }

  async updateParallelCount() {
    if (!this.fetchLoading) {
      const { parallel_count, error } = await getParallelCount({
        fileName: this.fileName,
        score: this.score,
        co_occ: this.cooccurance,
        par_length: this.quoteLength,
        limit_collection: this.limitCollection,
      });
      this.parallelCount = parallel_count;
      this.fetchLoading = false;
      this.fetchError = error;
      this.addTotalNumbersText();
    }
  }

  addTotalNumbersText() {
    const fileNameForDisplay = replaceFileNameForDisplay(this.fileName);
    const numbersCount =
      this.parallelCount > 10000 ? `More than 10.000` : this.parallelCount;
    this.totalNumbersText = html`
      ${numbersCount} approximate matches have been found for
      ${fileNameForDisplay} with the current filters.
    `;
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <div><strong>Loading ...</strong></div>
      `;
    }
    return html`
      <div id="total-numbers">
        <strong>${this.totalNumbersText}</strong>
      </div>
    `;
  }
}
