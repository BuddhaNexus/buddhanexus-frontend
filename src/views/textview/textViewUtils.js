import { getLanguageFromFilename } from '../utility/views-common';

export const findColorValues = (mainSegment, segmentName, parallels) => {
  // todo: get language as parameter instead
  let lang = getLanguageFromFilename(segmentName);
  let WordList = [];
  let colourValues = [];
  let position = 0;
  let Words = mainSegment;
  parallels = parallels.filter(function(el) {
    return el != null;
  });
  if (lang.match(/tib|pli/)) {
    Words = mainSegment.split(' ');
  }
  for (let i = 0; i < Words.length; ++i) {
    WordList.push(position);
    colourValues.push(0);
    position += Words[i].length;
    if (lang.match(/tib|pli/)) {
      position += 1;
    }
  }
  for (let i = 0; i < parallels.length; ++i) {
    for (let j = 0; j < colourValues.length; ++j) {
      let position = WordList[j];

      // TODO: refactor the below ifstatements
      if (
        parallels[i].root_segnr[0] === segmentName &&
        position >= parallels[i].root_offset_beg
      ) {
        if (parallels[i].root_segnr.slice(-1)[0] === segmentName) {
          if (position < parallels[i].root_offset_end) {
            colourValues[j] += 1;
          }
        } else {
          colourValues[j] += 1;
        }
      } else if (
        parallels[i].root_segnr.slice(-1)[0] === segmentName &&
        position < parallels[i].root_offset_end &&
        parallels[i].root_segnr[0] !== segmentName
      ) {
        colourValues[j] += 1;
      } else if (
        parallels[i].root_segnr.slice(1, -1).indexOf(segmentName) > -1
      ) {
        colourValues[j] += 1;
      }
    }
  }
  return colourValues;
};

export const highlightActiveMainElement = (
  rootSegtext,
  rootSegnr,
  selectedNumbers,
  startoffset,
  endoffset,
  rightMode = false
) => {
  let lang = getLanguageFromFilename(rootSegnr);
  let Words = rootSegtext;
  let Wordlist = [];
  let position = 0;
  let colourValues = [];
  if (lang.match(/tib|pli/)) {
    Words = rootSegtext.split(' ');
    for (let i = 0; i < Words.length; ++i) {
      Wordlist.push(position);
      colourValues.push(0);
      position += Words[i].length + 1;
    }
  }
  if (lang.match(/chn|skt/)) {
    for (let i = 0; i < Words.length; ++i) {
      Wordlist.push(i);
      colourValues.push(0);
    }
  }
  // only on the right side will we add a colour value; on the left side, this shall remain 0.
  if (!rightMode) {
    return colourValues.map(colour => colour - 1);
  }
  for (let i = 0; i < colourValues.length; ++i) {
    let position = Wordlist[i];
    if (
      (rootSegnr == selectedNumbers[0] && position >= startoffset) ||
      (rootSegnr == selectedNumbers.slice(-1)[0] &&
        rootSegnr != selectedNumbers[0]) ||
      selectedNumbers.slice(1, -1).indexOf(rootSegnr) > -1
    ) {
      colourValues[i] = 1;
    }
    // danger: postion > endoffset -1 _might_ be bad in the case of chinese; debug this carefully.
    if (rootSegnr == selectedNumbers.slice(-1)[0] && position > endoffset - 1) {
      colourValues[i] = 0;
    }
  }
  return colourValues;
};

export const truncateSegnrText = segnrText => {
  var lengths = segnrText.map(function(segment) {
    return segment.length;
  });
  const sumLength = lengths.reduce((partial_sum, a) => partial_sum + a, 0);
  if (sumLength > 500 && segnrText.length > 2) {
    segnrText.splice(
      1,
      segnrText.length - 2,
      '… this text has been truncated …'
    );
    return segnrText;
  } else return segnrText;
};
