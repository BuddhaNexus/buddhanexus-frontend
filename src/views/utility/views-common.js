import { LANGUAGE_CODES } from './constants';
import { html } from 'lit-element';

export const sortByKey = (array, key) =>
  array.sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0));

export function getLanguageFromFilename(filename) {
  if (filename.match('(TD|acip|kl[0-9])')) {
    return LANGUAGE_CODES.TIBETAN;
  } else if (filename.match('(_[TX])')) {
    return LANGUAGE_CODES.CHINESE;
  } else {
    return LANGUAGE_CODES.PALI;
  }
}

export function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

export function getLinkForSegmentNumbers(language, segmentnr) {
  let segmentlink = html`
    ${segmentnr}
  `;
  if (language === 'pli') {
    const cleanedSegment = segmentnr
      .split(':')[1]
      .replace(/_[0-9]+/g, '')
      .replace('–', '--');
    const linkText = segmentnr.match(/^tika|^anya|^atk/)
      ? `https://www.tipitaka.org/romn/`
      : `https://suttacentral.net/${
          segmentnr.split(':')[0]
        }/pli/ms#${cleanedSegment}`;
    segmentlink = html`
      <a target="_blanc" class="segment-link" href="${linkText}"
        >${segmentnr}</a
      >
    `;
  }
  if (language === 'chn') {
    const cleanedSegment = segmentnr.split(':')[0].replace(/_T/, 'n');
    const linkText = `http://tripitaka.cbeta.org/${cleanedSegment}`;
    segmentlink = html`
      <a target="_blanc" class="segment-link" href="${linkText}"
        >${segmentnr}</a
      >
    `;
  }
  return segmentlink;
}
