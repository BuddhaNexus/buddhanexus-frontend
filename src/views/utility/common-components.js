import { html } from 'lit-element';

import { getLanguageFromFilename } from './views-common';

export function FormattedSegment({ segment, lang }) {
  const filename = segment.split(':')[0];
  const number = segment.split(':')[1];
  let displayName = filename;
  if (
    window.menuData &&
    window.menuData[lang] &&
    window.menuData[lang][filename]
  ) {
    displayName = window.displayData[lang][filename];
  }
  return html`
    <span title="${displayName}">${segment}:${number}</span>
  `;
}

export function FormattedFileName({ fileName, displayType = 'short' }) {
  const lang = getLanguageFromFilename(fileName);
  let displayName = fileName.toUpperCase();
  if (
    window.displayData &&
    window.displayData[lang] &&
    window.displayData[lang][fileName]
  ) {
    displayName = window.displayData[lang][fileName];
  }

  if (displayType == 'full') {
    if (fileName != displayName) {
      return html`
        <span class="formatted-file-name">${fileName} - ${displayName}</span>
      `;
    } else {
      return html`
        <span class="formatted-file-name">${fileName}</span>
      `;
    }
  }
  if (displayType == 'short') {
    return html`
      <span class="formatted-file-name" title="${displayName}"
        >${fileName}</span
      >
    `;
  }
}
