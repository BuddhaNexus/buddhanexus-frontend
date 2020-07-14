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

const ChineseSegment = (inputData, segment, lineBreak) => {
  return inputData.includes('　　')
    ? html`
        <div class="chinese-verse">${segment}</div>
      `
    : lineBreak
    ? html`
        ${segment}<br />
      `
    : segment;
};

const PaliSanskritSegment = (inputData, segment) => {
  const strippedSegment = inputData.replace(/\//g, '|');
  return strippedSegment.match(/^[0-9]/g)
    ? html`
        <br />${segment}<br />
      `
    : strippedSegment.match(/[.?|]$/g)
    ? html`
        ${segment}<br />
      `
    : html`
        ${segment}
      `;
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
  if (lang === LANGUAGE_CODES.TIBETAN) {
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
    if (lang === LANGUAGE_CODES.TIBETAN || lang === LANGUAGE_CODES.PALI) {
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
    let outputText;
    if (lang === LANGUAGE_CODES.TIBETAN) {
      outputText = TibetanSegment(inputData);
    } else if (lang === LANGUAGE_CODES.CHINESE) {
      outputText = ChineseSegment(
        inputData,
        inputData.split('').map(TextSegmentChineseWord),
        false
      );
    } else {
      outputText = PaliSanskritSegment(inputData, inputData);
    }
    return outputText;
  } else {
    const words = TextSegmentWords(
      inputData,
      lang,
      colorValues,
      highlightMode,
      onClick,
      rightMode
    );
    if (lang === LANGUAGE_CODES.CHINESE) {
      return ChineseSegment(inputData, words, true);
    }
    if (lang === LANGUAGE_CODES.SANSKRIT || lang === LANGUAGE_CODES.PALI) {
      return PaliSanskritSegment(inputData, words);
    } else {
      return words;
    }
  }
}
