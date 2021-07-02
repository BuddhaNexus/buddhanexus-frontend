// this file contains preprocessing routines used both by text-view and table-view for the
// text strings coming from the database.
import { html } from 'lit-element';

import { TextSegment } from '../textview/TextSegment';

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

// this function is especially important for the Sanskrit: It removes accidentally highlighted numbers etc. that are not part of a match.
export function removeHighlightedNumbers(segmentText, colourValues) {
  let re = /(([a-zA-Z,._\-*()À-ž[\]]+)?[0-9_*<>]+([[\]a-zA-Z,._\-*()À-ž<>]+)?)|([0-9]+[,._]+[0-9]+)/gim;
  let matches = [...segmentText.matchAll(re)];
  matches.forEach(match => {
    const beg = match.index;
    const end = match.index + match[0].length;
    for (let i = beg; i <= end; ++i) {
      colourValues[i] = 0;
    }
  });
  return colourValues;
}

export function highlightTextByOffset({
  textArray,
  startoffset,
  endoffset,
  lang,
  transMethod,
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

      if (lang.match(/skt/)) {
          colourValues = removeHighlightedNumbers(textArray[i],colourValues);
      }

      returnArray.push(
        TextSegment({
          inputData: textArray[i],
          lang: lang,
          colorValues: colourValues,
          transMethod
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
