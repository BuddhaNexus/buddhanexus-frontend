import { html } from 'lit-element';

import { getLanguageFromFilename } from '../utility/views-common';
import { getLinkForSegmentNumbers } from '../utility/preprocessing';

export default function SearchViewListItem({
  SegmentId,
  SegmentText,
  rootUrl,
}) {
  return html`
    <div class="search-view-list__item"
          title="Click to open the text at this position"
          onclick="window.open('${rootUrl}','_self');"
>
      <div
        class="search-view-list__item-content search-view-list__item-content--segment material-card"
      >
        <header class="search-view-list__item-header">
          <span class="search-view-list__segment-id">
            ${getLinkForSegmentNumbers(
              getLanguageFromFilename(SegmentId),
              SegmentId
            )}
          </span>
          <div class="search-view-list__parallel-details">
            <span class="search-view-list__parallel-details-badge"
              >
          </div>
        </header>
        <div class="horizontal-divider"></div>
        <div
          class="search-view-list__text"
          lang="${getLanguageFromFilename(SegmentId)}"
        >
          ${SegmentText}
        </div>
      </div>
    </div>
  `;
}
