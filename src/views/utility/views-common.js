import { LANGUAGE_CODES } from './constants';

export const sortByKey = (array, key) =>
  array.sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0));

export function getLanguageFromFilename(filename) {
  if (filename.match('[DH][0-9][0-9][0-9]|NG|NK')) {
    return LANGUAGE_CODES.TIBETAN;
  } else if (filename.match('(u$|u:|^Y|^XX)')) {
    return LANGUAGE_CODES.SANSKRIT;
  } else if (filename.match('([TX][0-9]*n[0-9])')) {
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
