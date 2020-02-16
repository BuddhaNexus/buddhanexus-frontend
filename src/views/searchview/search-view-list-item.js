import { html } from 'lit-element';

import { getLanguageFromFilename } from '../utility/views-common';
import { getLinkForSegmentNumbers } from '../utility/preprocessing';

export default function SearchViewListItem({
  rootSegmentId,
  rootSegmentText,
  rootLength,
  rootUrl,
}) {
  return html`
    <div class="search-view-list__item">
      <div
        class="search-view-list__item-content search-view-list__item-content--segment material-card"
      >
        <header class="search-view-list__item-header">
          <span class="search-view-list__segment-id">
            ${getLinkForSegmentNumbers(
              getLanguageFromFilename(rootSegmentId),
              rootSegmentId
            )}
          </span>
          <div class="search-view-list__parallel-details">
            <span class="search-view-list__parallel-details-badge"
              >Length: <b>${rootLength}</b></span
            >
          </div>
          <iron-icon
            class="open-link-icon"
            icon="vaadin:external-browser"
            title="Display this text in a new tab"
            onclick="window.open('${rootUrl}','_blank');"
          ></iron-icon>
        </header>
        <div class="horizontal-divider"></div>
        <div
          class="search-view-list__text"
          lang="${getLanguageFromFilename(rootSegmentId)}"
        >
          ${rootSegmentText}
        </div>
      </div>
    </div>
  `;
}
