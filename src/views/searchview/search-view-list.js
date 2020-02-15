import { customElement, html, LitElement, property } from 'lit-element';

import { highlightTextByOffset } from '../utility/preprocessing';
import { getLanguageFromFilename } from '../utility/views-common';
import sharedDataViewStyles from '../data/data-view-shared.styles';
import { SearchViewListItem } from './search-view-list-item';
import './search-view-list-header';

import styles from './search-view-list.styles';

@customElement('search-view-list')
export class SearchViewList extends LitElement {
  @property({ type: String }) searchQuery;
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
  getSegmentId = segnr => {
    let segLabel = segnr[0];
    if (segnr.length > 1) {
      const parallels = segnr[segnr.length - 1].split(':');
      return segLabel + `–${parallels[parallels.length - 1]}`;
    }

    return segLabel;
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

        ${this.searchResults.map(result =>
          SearchViewListItem({
            rootSegmentId: this.getSegmentId(result.root_segnr),
            rootSegmentText: highlightTextByOffset(
              result.root_seg_text,
              result.root_offset_beg,
              result.root_offset_end + 1, // the +1 is necessary for the chinese display, but hard to tell why.
              getLanguageFromFilename(result.root_segnr[0])
            ),
            parallelSegmentText: highlightTextByOffset(
              result.par_segment,
              result.par_offset_beg,
              result.par_offset_end,
              getLanguageFromFilename(result.file_name)
            ),
            parallelSegmentId: this.getSegmentId(result.par_segnr),
            score: result.score,
            parLength: result.par_length,
            rootLength: result.root_length,
            rootUrl: this.createUrl(result.root_segnr[0]),
            parUrl: this.createUrl(result.par_segnr[0]),
          })
        )}
      </div>
    `;
  }
}
