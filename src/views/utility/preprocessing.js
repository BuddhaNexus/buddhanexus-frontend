// this file contains preprocessing routines used both by text-view and table-view for the
// text strings coming from the database.
import { html } from 'lit-element';

import { getLanguageFromFilename } from './views-common';

export const preprocessTibetan = currentString => {
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

export const preprocessChineseCharacter = currentString => {
  if (currentString.includes('#')) {
    currentString = html`
      <br />
    `;
  }
  return currentString;
};

// this function is not yet revised or tested to work with the new refactored code.
export const highlightTextByOffset = (
  textArray,
  startoffset,
  endoffset,
  lang
) => {
  let returnArray = [];
  if (lang.match(/tib|skt|pli/)) {
    // the next two lines are a hack because there is a slight mismatch in the behaviour
    // of the Chinese and Tibetan offset values here; this should be ideally fixed already
    // in the JSON files. TODO for the future.
    startoffset += 1;
    endoffset += 1;
  }
  for (let i = 0; i < textArray.length; i++) {
    let WordList = [];
    let colourValues = [];
    let position = 0;
    let Words = textArray[i];
    if (lang.match(/tib|skt|pli/)) {
      Words = textArray[i].split(' ');
    }
    for (let j = 0; j < Words.length; ++j) {
      WordList.push(position);
      let colourValue = 1;
      position += Words[j].length;
      if (lang.match(/tib|skt|pli/)) {
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
    let tokenizedResult = tokenizeWords(textArray[i], lang, colourValues);
    returnArray.push(tokenizedResult);
  }
  return returnArray;
};

export const colorTable = {
  1: '#0CC0E8',
  2: '#0039FF',
  3: '#610CE8',
  4: '#AA00FF',
  5: '#DC0CE8',
  6: '#FF0093',
  7: '#E80C0C',
  8: '#FF2A00',
  9: '#E8550C',
  10: '#FF860D',
};

const getCooccuranceColor = cooc => {
  return cooc < 10 ? colorTable[cooc] : colorTable[10];
};

export const segmentArrayToString = segmentArray => {
  let SegmentRef = segmentArray[0];
  if (segmentArray.length > 1) {
    let parallelArray = segmentArray.slice(-1)[0].split(':');
    SegmentRef = SegmentRef + `–${parallelArray.slice(-1)[0]}`;
  }
  return SegmentRef;
};

const wrapWordsInSpan = (
  selectedSegment,
  currentColor,
  rightMode,
  position,
  clickFunction,
  cleanedWord
) => {
  if (currentColor == -1) {
    // prettier-ignore
    return html`<span 
        class="word ${selectedSegment}"
        position="${position}"
        @click="${clickFunction}">${cleanedWord}</span>`
  }
  if (!currentColor || currentColor == 0) {
    return cleanedWord;
  }
  let highlightColor =
    rightMode === 0 ? getCooccuranceColor(currentColor) : '#2ECC40';
  // prettier-ignore
  return html`<span 
        class="word highlight-parallel ${selectedSegment}"
        style="color:${highlightColor}"
        position="${position}"
        @click="${clickFunction}">${cleanedWord}</span>`
};
export function tokenizeWords(
  inputData,
  lang,
  colorValues,
  clickFunction = 0,
  highlightMode = 0,
  rightMode = 0
) {
  // Todo: It might be the case that SKT needs a special treatment here.
  if (lang.match(/tib|skt|pli/)) {
    return tokenizeTibPali(
      inputData,
      colorValues,
      clickFunction,
      highlightMode,
      rightMode
    );
  } else {
    return tokenizeChinese(
      inputData,
      colorValues,
      clickFunction,
      highlightMode,
      rightMode
    );
  }
}

export function tokenizeTibPali(
  inputData,
  colorValues,
  clickFunction = 0,
  highlightMode = 0,
  rightMode = 0
) {
  let words = [];
  let selectedSegment = '';
  if (colorValues.length > 0) {
    // this is a small hack to avoid line breaks when a * || combination occurs in ACIP
    inputData = inputData.replace(/\* \//, '*_/');
    let splitWords = inputData.split(' ');
    let position = 0;
    for (let i = 0; i < splitWords.length; ++i) {
      let currentColor = colorValues.length >= 0 ? colorValues[i] : 0;
      if (currentColor != 0 && highlightMode == 1) {
        selectedSegment = 'selected-segment';
      }
      let cleanedWord = preprocessTibetan(splitWords[i]);
      words.push(
        wrapWordsInSpan(
          selectedSegment,
          currentColor,
          rightMode,
          position,
          clickFunction,
          cleanedWord
        )
      );
      position += splitWords[i].length + 1;
    }
  } else {
    words = preprocessTibetan(inputData);
  }
  return words;
}

export function tokenizeChinese(
  inputData,
  colorValues,
  clickFunction = 0,
  highlightMode = 0,
  rightMode = 0
) {
  let words = [];
  let selectedSegment = '';
  if (colorValues.length > 0) {
    let splitWords = inputData;
    let position = 0;
    for (let i = 0; i < splitWords.length; ++i) {
      let currentColor = colorValues.length >= 0 ? colorValues[i] : 0;
      if (currentColor != 0 && highlightMode == 1) {
        selectedSegment = 'selected-segment';
      }
      let cleanedWord = preprocessChineseCharacter(splitWords[i]);

      words.push(
        wrapWordsInSpan(
          selectedSegment,
          currentColor,
          rightMode,
          position,
          clickFunction,
          cleanedWord
        )
      );
      position += splitWords[i].length;
    }
  } else {
    words = inputData.split('').map(character => {
      return preprocessChineseCharacter(character);
    });
  }
  return words;
}

export function replaceSegmentForDisplay(segment, lang) {
  let filename = segment.split(':')[0];
  let number = segment.split(':')[1];
  if (window.menuData[lang] && window.menuData[lang][filename]) {
    let displayName = window.menuData[lang][filename];
    return html`
      <span title="${segment}">${displayName}:${number}</span>
    `;
  } else {
    return segment;
  }
}

export function replaceFileNameForDisplay(fileName) {
  const lang = getLanguageFromFilename(fileName);
  if (!window.menuData) {
    return;
  }
  if (window.menuData[lang] && window.menuData[lang][fileName]) {
    let displayName = window.menuData[lang][fileName];
    return html`
      <span title="${fileName}">${displayName}</span>
    `;
  } else {
    return fileName.toUpperCase();
  }
}
