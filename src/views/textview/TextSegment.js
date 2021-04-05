import { C_SELECTED_SEGMENT } from './text-view';
import { html } from 'lit-element';
import { SEGMENT_COLORS } from '../utility/preprocessing';
import { LANGUAGE_CODES } from '../utility/constants';
import { fromWylie } from '../utility/tibetan-transliteration';

const RIGHT_MODE_HIGHLIGHT_COLOR = '#2ECC40';

function getCooccuranceColor(cooc) {
  return SEGMENT_COLORS[cooc > 10 ? 10 : cooc];
}

function getCleanedWord(lang, splitWords, i,transMethod) {
  let cleanedWord = '';
    if (lang === LANGUAGE_CODES.TIBETAN) {
      if(transMethod == "uni") {
          cleanedWord = TibetanSegmentUnicode(splitWords[i]);
      }
      else {
          cleanedWord = TibetanSegmentWylie(splitWords[i]);
      }
    } else {
      cleanedWord = TextSegmentChineseWord(splitWords[i]);
  }
  return cleanedWord;
}

function TextSegmentChineseWord(currentString) {
  currentString = currentString.replace(/\//g, '|');
  if (currentString.includes('#')) {
    // prettier-ignore
    return html`<br />`;
  }
  return currentString;
}

const TibetanSegmentWylie = (segment) => {
  var strippedSegment = segment.replace(/\//g, '|') + ' ';
  return !strippedSegment.match(/\|\||[.?!:;]/g)
    ? strippedSegment
    : !strippedSegment.includes('*')
    ? // prettier-ignore
      html`${strippedSegment}<br />`
    : // prettier-ignore
      html`${strippedSegment.replace('*_', '* ')}`;
};

// possibly we have to do a few more changes to the method of 
// preprocessing in case of unicode, so having it as a separate function might be 
const TibetanSegmentUnicode = (segment) => {
  var strippedSegment = segment.replace(/\//g, '|') + ' ';
  return !strippedSegment.match(/\|\||[.?!:;]/g)
    ? fromWylie(strippedSegment)
    : !strippedSegment.includes('*')
    ? // prettier-ignore
      html`${fromWylie(strippedSegment)}<br />`
    : // prettier-ignore
      html`${fromWylie(strippedSegment).replace('*_', '* ')}`;
};

const ChineseSegment = (inputData, segment) => {
  return inputData.includes('　　')
    ? //prettier-ignore
      html`
        <div class="chinese-verse">${segment}</div>
      `
    : html`
        ${segment}<br />
      `;
};

const PaliSegment = (inputData, segment) => {
  const strippedSegment = inputData.replace(/\//g, '|');
  return strippedSegment.match(/^[0-9]/g) || strippedSegment.match(/[0-9]$/g)
    ? html`
        <br />${segment}<br />
      `
    : strippedSegment.match(/[.?|)'vagga''vatthu''sutta']$/g)
    ? html`
        ${segment}<br />
      `
    : html`
        ${segment}
      `;
};

const SanskritSegment = (inputData, segment) => {
  return html`
    ${segment}<br />
  `;
};

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
  return html`<span 
              class="word ${currentColor !== -1 ? 'highlight-parallel' : ""} ${selected ? C_SELECTED_SEGMENT : ""}"
              style="color:${highlightColor}"
              position="${position}"
              @click="${onClick}">${cleanedWord}</span>`;
}

function TextSegmentWords(
  inputData,
  lang,
  colorValues,
  highlightMode,
  onClick,
  rightMode,
  transMethod
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
      cleanedWord: getCleanedWord(lang, segmentData, i, transMethod),
      highlightColor: rightMode
        ? RIGHT_MODE_HIGHLIGHT_COLOR
        : getCooccuranceColor(currentColor),
    });
    if (lang === LANGUAGE_CODES.TIBETAN) {
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
  transMethod,
}) {
  if (colorValues.length <= 0) {
    let outputText;
    switch (lang) {
      case LANGUAGE_CODES.PALI:
        outputText = PaliSegment(inputData, inputData.replace(/\//g, '|'));
        break;
      case LANGUAGE_CODES.SANSKRIT:
        outputText = SanskritSegment(inputData, inputData.replace(/\//g, '|'));
        break;
      case LANGUAGE_CODES.CHINESE:
        outputText = ChineseSegment(
          inputData,
          inputData.split('').map(TextSegmentChineseWord)
        );
        break;
      default:
        if (transMethod == "uni") {
                outputText = TibetanSegmentUnicode(inputData);
        }
        else {
            outputText = TibetanSegmentWylie(inputData);
        }
    }
    return outputText;
  } else {
    const words = TextSegmentWords(
      inputData,
      lang,
      colorValues,
      highlightMode,
      onClick,
      rightMode,
      transMethod,
    );
    let outputwords;
    switch (lang) {
      case LANGUAGE_CODES.TIBETAN:
          outputwords = words;
          break;
        case LANGUAGE_CODES.PALI:
          outputwords = PaliSegment(inputData, words);
          break;
        case LANGUAGE_CODES.SANSKRIT:
          outputwords = SanskritSegment(inputData, words);
          break;
        case LANGUAGE_CODES.CHINESE:
          outputwords = ChineseSegment(inputData, words);
          break;
        default:
          outputwords = words;
      }
    return outputwords;
  }
}
