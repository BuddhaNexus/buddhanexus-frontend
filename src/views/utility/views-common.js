import { LANGUAGE_CODES } from './constants';

export const sortByKey = (array, key) =>
  array.sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0));

export function getLanguageFromFilename(filename) {
  if (filename.match('(TD|acip|kl[0-9]|NY)')) {
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
