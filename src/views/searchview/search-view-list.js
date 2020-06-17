// TO DO: Add page numbers to this element.

import { customElement, html, LitElement, property } from 'lit-element';

import { highlightTextByOffset } from '../utility/preprocessing';
import { getLanguageFromFilename } from '../utility/views-common';
import sharedDataViewStyles from '../data/data-view-shared.styles';
import { createTextViewSegmentUrl } from '../data/dataViewUtils';
import SearchViewListItem from './search-view-list-item';
import './search-view-list-header';

import styles from './search-view-list.styles';

@customElement('search-view-list')
export class SearchViewList extends LitElement {
  @property({ type: String }) searchQuery;
  @property({ type: Array }) searchResults;

  static get styles() {
    return [styles, sharedDataViewStyles];
  }

  render() {
    return html`
      <div class="list-container">
        <search-view-list-header
          .searchQuery="${this.searchQuery}"
          .resultNumber="${this.searchResults.length}"
        ></search-view-list-header>

        ${this.searchResults.map(result =>
          SearchViewListItem({
            SegmentId: result.segment_nr[1],
            SegmentText: highlightTextByOffset({
              textArray: [result.search_string_precise],
              startoffset: result.offset_beg,
              endoffset: result.offset_end,
              lang: getLanguageFromFilename(result.segment_nr[0]),
            }),
            distance: result.distance,
            rootUrl: createTextViewSegmentUrl(result.segment_nr[1]),
          })
        )}
      </div>
    `;
  }
}
