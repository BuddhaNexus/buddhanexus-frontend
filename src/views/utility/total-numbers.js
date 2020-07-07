import { customElement, html, LitElement, property } from 'lit-element';

import { getParallelCount } from '../../api/actions';

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
        setTimeout(this.startLoading.bind(this), 2000);
      }
    });
  }

  startLoading() {
    if (this.fetchLoading || !this.fileName) {
      return;
    }
    this.updateParallelCount();
    this.fetchLoading = true;
  }

  async updateParallelCount() {
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
  }

  render() {
    const matchCount =
      this.parallelCount > 10000 ? `> 10.000` : this.parallelCount;

    if (this.fetchLoading) {
      return html`
        <strong>Loading ...</strong>
      `;
    }

    return html`
      <span> <strong>${matchCount}</strong> matches </span>
    `;
  }
}
