import { customElement, html, LitElement, property } from 'lit-element';

import { highlightTextByOffset } from '../utility/preprocessing';
import { getLanguageFromFilename } from '../utility/views-common';
import sharedDataViewStyles from '../data/data-view-shared.styles';
import { createTextViewSegmentUrl } from '../data/dataViewUtils';
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
  @property({ type: String }) transMethod;

  @property({ type: Function }) setPageNumber;

  static get styles() {
    return [styles, sharedDataViewStyles];
  }

  render() {
    //prettier-ignore
    return html`
      <div class="table-container">
        <table-view-table-header
          .fileName="${this.fileName}">
        </table-view-table-header>

        ${this.parallels.map(parallel =>
          TableViewTableRow({
            rootSegmentId: parallel.root_segnr,
            rootSegmentText: highlightTextByOffset({
              textArray: parallel.root_seg_text,
              startoffset: parallel.root_offset_beg,
              endoffset: parallel.root_offset_end + 1,
              lang: getLanguageFromFilename(parallel.root_segnr[0]),
              transMethod: this.transMethod,
            }),
            parallelSegmentText: highlightTextByOffset({
              textArray: parallel.par_segment,
              startoffset: parallel.par_offset_beg,
              endoffset: parallel.par_offset_end,
              lang: getLanguageFromFilename(parallel.file_name),
              transMethod: this.transMethod,
            }),
            parallelSegmentId: parallel.par_segnr,
            score: parallel.score,
            parLength: parallel.par_length,
            rootLength: parallel.root_length,
            rootUrl: createTextViewSegmentUrl(parallel.root_segnr[0]),
            parUrl: createTextViewSegmentUrl(parallel.par_segnr[0]),
          })
        )}
      </div>
    `;
  }
}
