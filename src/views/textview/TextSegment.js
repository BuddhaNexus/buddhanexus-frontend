import { C_SELECTED_SEGMENT } from './text-view';
import { html } from 'lit-element';
import { SEGMENT_COLORS } from '../utility/preprocessing';
import { LANGUAGE_CODES } from '../utility/constants';

const RIGHT_MODE_HIGHLIGHT_COLOR = '#2ECC40';

function getCooccuranceColor(cooc) {
  return SEGMENT_COLORS[cooc > 10 ? 10 : cooc];
}

export function TextSegmentChineseWord(currentString) {
  currentString = currentString.replace(/\//g, '|');
  if (currentString.includes('#')) {
    return html`
      <br />
    `;
  }
  return currentString;
}

function TextSegmentWord({
  selected,
  currentColor,
  highlightColor,
  position,
  onClick,
  cleanedWord,
}) {
  if (!currentColor || currentColor === 0) {
    return cleanedWord;
  }
  // prettier-ignore
  return html`
    <span
      class="word ${currentColor !== -1 ? 'highlight-parallel' : ""} ${selected ? C_SELECTED_SEGMENT : ""}"
      style="color:${highlightColor}"
      position="${position}"
      @click="${onClick}">${cleanedWord}</span>
  `;
}

export const TibetanSegment = currentString => {
  currentString = currentString.replace(/\//g, '|') + ' ';
  if (currentString.match(/\|\||[.?!:;]/g)) {
    if (!currentString.includes('*')) {
      currentString = html`
        ${currentString}<br />
      `;
    } else {
      currentString = html`
        ${currentString.replace('*_', '* ')}
      `;
    }
  }
  return currentString;
};

export function TextSegment({
  inputData,
  lang,
  colorValues,
  onClick = 0,
  highlightMode = 0,
  rightMode = false,
}) {
  let words = [];
  let selected = false;

  if (colorValues.length <= 0) {
    if (lang.match(/tib|pli/)) {
      words = TibetanSegment(inputData);
    } else {
      words = inputData
        .split('')
        .map(character => TextSegmentChineseWord(character));
    }
  } else {
    let splitWords = inputData;
    if (lang.match(/tib|pli/)) {
      // this is a small hack to avoid line breaks when a * || combination occurs in ACIP
      inputData = inputData.replace(/\* \//, '*_/');
      splitWords = inputData.split(' ');
    }
    let position = 0;

    for (let i = 0; i < splitWords.length; ++i) {
      const currentColor = colorValues.length >= 0 ? colorValues[i] : 0;
      if (currentColor !== 0 && highlightMode === 1) {
        selected = true;
      }
      let cleanedWord = '';
      if (lang.match(/tib|pli/)) {
        cleanedWord = TibetanSegment(splitWords[i]);
      } else {
        cleanedWord = TextSegmentChineseWord(splitWords[i]);
      }

      words.push(
        TextSegmentWord({
          selected,
          currentColor,
          position,
          cleanedWord,
          onClick,
          highlightColor: rightMode
            ? RIGHT_MODE_HIGHLIGHT_COLOR
            : getCooccuranceColor(currentColor),
        })
      );
      if (lang.match(/tib|pli/)) {
        position += splitWords[i].length + 1;
      } else {
        position += splitWords[i].length;
      }
    }
  }
  // in Sanskrit, add line breaks
  return lang === LANGUAGE_CODES.SANSKRIT
    ? html`
        ${words}<br />
      `
    : words;
}
