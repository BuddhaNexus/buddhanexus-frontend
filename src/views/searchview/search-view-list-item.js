import { html } from 'lit-element';

import { getLanguageFromFilename } from '../utility/views-common';
import '../utility/formatted-segment';

export default function SearchViewListItem({
  SegmentId,
  SegmentText,
  distance,
  rootUrl,
  multiResults,
}) {
  let multiLingAvailable = false;
  if (multiResults.length > 0) {
    multiLingAvailable = true;
  }
  //prettier-ignore
  return html`
    <div class="search-view-list__item">
      <div class="search-view-list__item-content search-view-list__item-content--segment material-card">
        <header class="search-view-list__item-header">
          <span class="search-view-list__segment-id">
            <formatted-segment
              .segmentnr="${[SegmentId,]}"
              .lang="${getLanguageFromFilename(SegmentId)}"
              .rootUrl="${rootUrl}">
            </formatted-segment>
          </span><span>Edit distance: ${distance} </span> 
          <span class="trans-message" style="display: ${
              multiLingAvailable ? 'block' : 'none'
            }"> multilingual data vailable</span>
          <div class="search-view-list__parallel-details">
            <span class="search-view-list__parallel-details-badge">
          </div>
        </header>
        <div class="horizontal-divider"></div>
        <div
          title="Click to open the text at this position"
          onclick="window.open('${rootUrl}','_blanc');"
          class="search-view-list__text"
          lang="${getLanguageFromFilename(SegmentId)}">
          ${SegmentText}
        </div>
      </div>
    </div>
  `;
}
