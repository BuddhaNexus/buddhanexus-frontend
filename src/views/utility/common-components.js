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
    displayName = window.menuData[lang][filename];
  }
  return html`
    <span title="${segment}">${displayName}:${number}</span>
  `;
}

export function FormattedFileName({ fileName }) {
  const lang = getLanguageFromFilename(fileName);
  let displayName = fileName.toUpperCase();
  if (
    window.displayData &&
    window.displayData[lang] &&
    window.displayData[lang][fileName]
  ) {
    displayName = window.displayData[lang][fileName];
  }
  return html`
    <span class="formatted-file-name" title="${fileName}">${displayName}</span>
  `;
}
