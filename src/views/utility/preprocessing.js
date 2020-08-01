// this file contains preprocessing routines used both by text-view and table-view for the
// text strings coming from the database.
import { html } from 'lit-element';

import { TextSegment } from '../textview/TextSegment';
import { getSegmentIdFromKey } from '../data/dataViewUtils';
import './formatted-segment';

export const SEGMENT_COLORS = {
  1: '#0CC0E8',
  2: '#0039FF',
  3: '#610CE8',
  4: '#AA00FF',
  5: '#DC0CE8',
  6: '#FF0093',
  7: '#E80C0C',
  8: '#FF2A00',
  9: '#E85650',
  10: '#FF860D',
};

export function highlightTextByOffset({
  textArray,
  startoffset,
  endoffset,
  lang,
}) {
  let returnArray = [];
  if (lang.match(/tib/)) {
    // the next two lines are a hack because there is a slight mismatch in the behaviour
    // of the Chinese and Tibetan offset values here; this should be ideally fixed already
    // in the JSON files. TODO for the future.
    startoffset += 1;
    endoffset += 1;
  }
  for (let i = 0; i < textArray.length; i++) {
    let wordList = [];
    let colourValues = [];
    let position = 0;
    let Words = textArray[i];

    //prettier-ignore
    if (Words === '… this text has been truncated …') {
      returnArray.push(
        html`
          <span style="color: #E80C0C; font-style: oblique;">${Words}</span>
        `
      );
    } else {
      if (lang.match(/tib/)) {
        Words = textArray[i].split(' ');
      }
      for (let j = 0; j < Words.length; ++j) {
        wordList.push(position);
        let colourValue = 1;
        position += Words[j].length;
        if (lang.match(/tib/)) {
          position += 1;
        }
        if (i === 0 && position <= startoffset) {
          colourValue = 0;
        }
        if (i === textArray.length - 1 && position > endoffset) {
          colourValue = 0;
        }
        colourValues.push(colourValue);
      }
      returnArray.push(
        TextSegment({
          inputData: textArray[i],
          lang: lang,
          colorValues: colourValues,
        })
      );
    }
  }
  return returnArray;
}

export function segmentArrayToString(segmentArray, lang) {
  let SegmentRef = segmentArray[0].replace(/-[0-9]+$/, '');
  if (lang != 'tib') {
    if (segmentArray.length > 1) {
      let parallelArray = segmentArray.slice(-1)[0].split(':');
      SegmentRef =
        SegmentRef + `–${parallelArray.slice(-1)[0].replace(/-[0-9]+$/, '')}`;
    }
  }
  return SegmentRef;
}

export function getLinkForSegmentNumbers(language, segmentnr) {
  let formattedSegmentNr = html`
    <formatted-segment
      .segmentnr="${segmentArrayToString(segmentnr, language)}"
    ></formatted-segment>
  `;
  let linkText = '';
  if (language === 'pli') {
    segmentnr = getSegmentIdFromKey(segmentnr);
    let cleanedSegment = segmentnr
      .split(':')[1]
      .replace(/_[0-9]+/g, '')
      .replace('–', '--');
    let rootSegment = segmentnr.split(':')[0];
    if (segmentnr.match(/^dhp/)) {
      cleanedSegment = `${cleanedSegment.split('.', 1)}`;
      rootSegment = 'dhp';
    } else if (segmentnr.match(/^an[1-9]|^sn[1-9]/)) {
      rootSegment = `${rootSegment}.${cleanedSegment.split('.', 1)}`;
      const dotPosition = cleanedSegment.indexOf('.');
      cleanedSegment = cleanedSegment.substring(dotPosition + 1);
      if (cleanedSegment.match(/--/)) {
        let [firstpart, secondpart] = cleanedSegment.split('--');
        const secondDot = secondpart.indexOf('.');
        secondpart = secondpart.substring(secondDot + 1);
        cleanedSegment = `${firstpart}--${secondpart}`;
      }
    }
    linkText = segmentnr.match(/^tika|^anya|^atk/)
      ? `https://www.tipitaka.org/romn/`
      : `https://suttacentral.net/${rootSegment}/pli/ms#${cleanedSegment}`;
  } else if (language === 'chn') {
    const cleanedSegment = segmentnr[0].split(':')[0].replace(/_[TX]/, 'n');
    linkText = `http://tripitaka.cbeta.org/${cleanedSegment}`;
  }
  return linkText
    ? html`
        <a target="_blanc" class="segment-link" href="${linkText}"
          >${formattedSegmentNr}</a
        >
      `
    : html`
        ${formattedSegmentNr}
      `;
}
