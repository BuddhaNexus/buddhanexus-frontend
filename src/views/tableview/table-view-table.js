import { customElement, html, LitElement, property } from 'lit-element';

import { highlightTextByOffset } from '../utility/preprocessing';
import { getLanguageFromFilename } from '../utility/views-common';
import sharedDataViewStyles from '../data/data-view-shared.styles';
import { TableViewTableRow } from './table-view-table-row';
import './table-view-table-header';

import styles from './table-view-table.styles';

@customElement('table-view-table')
export class TableViewTable extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Number }) probability;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Array }) limitCollection;
  @property({ type: Array }) parallels;

  @property({ type: Function }) setPageNumber;

  static get styles() {
    return [styles, sharedDataViewStyles];
  }

  // Label in table cell, e.g T06TD4085E:154_0–161_0.
  getParallelSegmentId = parallel => {
    let parSegLabel = parallel.par_segnr[0];

    if (parallel.par_segnr.length > 1) {
      const parallels = parallel.par_segnr[parallel.par_segnr.length - 1].split(
        ':'
      );
      return parSegLabel + `–${parallels[parallels.length - 1]}`;
    }

    return parSegLabel;
  };

  createUrl = segmentNr => {
    let lang = getLanguageFromFilename(segmentNr);
    let textName = segmentNr.split(':')[0];
    return `../../${lang}/text/${textName}/${segmentNr}`;
  };

  render() {
    return html`
      <div class="table-container">
        <table-view-table-header
          .fileName="${this.fileName}"
        ></table-view-table-header>

        ${this.parallels.map(parallel =>
          TableViewTableRow({
            rootSegmentId: parallel.root_segnr[parallel.root_segnr.length - 1],
            rootSegmentText: highlightTextByOffset(
              parallel.root_seg_text,
              parallel.root_offset_beg,
              parallel.root_offset_end,
              getLanguageFromFilename(parallel.root_segnr[0])
            ),
            parallelSegmentText: highlightTextByOffset(
              parallel.par_segment,
              parallel.par_offset_beg,
              parallel.par_offset_end,
              getLanguageFromFilename(parallel.file_name)
            ),
            parallelSegmentId: this.getParallelSegmentId(parallel),
            score: parallel.score,
            parLength: parallel.par_length,
            rootUrl: this.createUrl(parallel.root_segnr[0]),
            parUrl: this.createUrl(parallel.par_segnr[0]),
          })
        )}
      </div>
    `;
  }
}
