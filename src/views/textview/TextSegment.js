import { C_SELECTED_SEGMENT } from './text-view';
import { html } from 'lit-element';
import { getCleanedWord, SEGMENT_COLORS } from '../utility/preprocessing';
import { LANGUAGE_CODES } from '../utility/constants';

const RIGHT_MODE_HIGHLIGHT_COLOR = '#2ECC40';

function getCooccuranceColor(cooc) {
  return SEGMENT_COLORS[cooc > 10 ? 10 : cooc];
}

export function TextSegmentChineseWord(currentString) {
  currentString = currentString.replace(/\//g, '|');
  if (currentString.includes('#')) {
    // prettier-ignore
    return html`<br />`;
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
  return html`<span class="word ${currentColor !== -1 ? 'highlight-parallel' : ""} ${selected ? C_SELECTED_SEGMENT : ""}" style="color:${highlightColor}" position="${position}" @click="${onClick}">${cleanedWord}</span>`;
}

export const TibetanSegment = segment => {
  const strippedSegment = segment.replace(/\//g, '|') + ' ';
  if (!strippedSegment.match(/\|\||[.?!:;]/g)) {
    return strippedSegment;
  } else if (!strippedSegment.includes('*')) {
    // prettier-ignore
    return html`${strippedSegment}<br />`;
  } else {
    // prettier-ignore
    return html`${strippedSegment.replace('*_', '* ')}`;
  }
};

function TextSegmentWords(
  inputData,
  lang,
  colorValues,
  highlightMode,
  onClick,
  rightMode
) {
  let segmentData = inputData;
  if (lang.match(/tib|pli/)) {
    // this is a small hack to avoid line breaks when a * || combination occurs in ACIP
    segmentData = segmentData.replace(/\* \//, '*_/').split(' ');
  }
  if (typeof segmentData === 'string') {
    segmentData = segmentData.split('');
  }
  let position = 0;
  let selected = false;
  return segmentData.map((word, i) => {
    const currentColor = colorValues.length >= 0 ? colorValues[i] : 0;

    if (currentColor !== 0 && highlightMode === 1) {
      selected = true;
    }
    const renderedWord = TextSegmentWord({
      selected,
      currentColor,
      position,
      onClick,
      cleanedWord: getCleanedWord(lang, segmentData, i),
      highlightColor: rightMode
        ? RIGHT_MODE_HIGHLIGHT_COLOR
        : getCooccuranceColor(currentColor),
    });
    if (lang.match(/tib|pli/)) {
      position += segmentData[i].length + 1;
    } else {
      position += segmentData[i].length;
    }

    return renderedWord;
  });
}

export function TextSegment({
  inputData,
  lang,
  colorValues,
  onClick = 0,
  highlightMode = 0,
  rightMode = false,
}) {
  if (colorValues.length <= 0) {
    if (lang.match(/tib|pli/)) {
      return TibetanSegment(inputData);
    } else if (lang.match(/chn/)) {
      const returnSegment = inputData.split('').map(TextSegmentChineseWord);
      return html`
        ${returnSegment}<br />
      `;
    }
  } else {
    const words = TextSegmentWords(
      inputData,
      lang,
      colorValues,
      highlightMode,
      onClick,
      rightMode
    );
    // prettier-ignore
    return (lang === LANGUAGE_CODES.SANSKRIT || lang === LANGUAGE_CODES.CHINESE) ? html`${words}<br />` : words;
  }
}
