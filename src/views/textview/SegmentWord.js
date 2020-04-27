import { C_SELECTED_SEGMENT } from './text-view';
import { html } from 'lit-element';
import {
  colorTable,
  preprocessChineseCharacter,
  preprocessTibetan,
} from '../utility/preprocessing';

function getCooccuranceColor(cooc) {
  return cooc < 10 ? colorTable[cooc] : colorTable[10];
}

function wrapWordsInSpan({
  selectedSegment,
  currentColor,
  rightMode,
  position,
  clickFunction,
  cleanedWord,
}) {
  if (currentColor === -1) {
    // prettier-ignore
    return html`<span 
        class="word ${selectedSegment}"
        position="${position}"
        @click="${clickFunction}">${cleanedWord}</span>`;
  }
  if (!currentColor || currentColor === 0) {
    return cleanedWord;
  }
  let highlightColor = rightMode
    ? '#2ECC40'
    : getCooccuranceColor(currentColor);
  // prettier-ignore
  return html`<span 
        class="word highlight-parallel ${selectedSegment}"
        style="color:${highlightColor}"
        position="${position}"
        @click="${clickFunction}">${cleanedWord}</span>`;
}

export function SegmentWord({
  inputData,
  lang,
  colorValues,
  clickFunction = 0,
  highlightMode = 0,
  rightMode = false,
}) {
  let words = [];
  let selectedSegment = '';
  if (colorValues.length > 0) {
    let splitWords = inputData;
    if (lang.match(/tib|pli/)) {
      // this is a small hack to avoid line breaks when a * || combination occurs in ACIP
      inputData = inputData.replace(/\* \//, '*_/');
      splitWords = inputData.split(' ');
    }
    let position = 0;
    for (let i = 0; i < splitWords.length; ++i) {
      let currentColor = colorValues.length >= 0 ? colorValues[i] : 0;
      if (currentColor !== 0 && highlightMode === 1) {
        selectedSegment = C_SELECTED_SEGMENT;
      }
      let cleanedWord = '';
      if (lang.match(/tib|pli/)) {
        cleanedWord = preprocessTibetan(splitWords[i]);
      } else {
        cleanedWord = preprocessChineseCharacter(splitWords[i]);
      }
      words.push(
        wrapWordsInSpan({
          selectedSegment: selectedSegment,
          currentColor: currentColor,
          rightMode: rightMode,
          position: position,
          clickFunction: clickFunction,
          cleanedWord: cleanedWord,
        })
      );
      if (lang.match(/tib|pli/)) {
        position += splitWords[i].length + 1;
      } else {
        position += splitWords[i].length;
      }
    }
  } else {
    if (lang.match(/tib|pli/)) {
      words = preprocessTibetan(inputData);
    } else {
      words = inputData.split('').map(character => {
        return preprocessChineseCharacter(character);
      });
    }
  }
  return lang !== 'skt'
    ? words
    : html`
        ${words}<br />
      `;
}
