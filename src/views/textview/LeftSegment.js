import { html } from 'lit-element';
import { findColorValues, highlightActiveMainElement } from './textViewUtils';
import { getLanguageFromFilename } from '../utility/views-common';
import { TextSegment } from './TextSegment';
import { SourceSegment } from './SourceSegment';

function getLeftSegmentColors(
  current_parallels,
  segText,
  segmentNr,
  lang,
  leftSideSelected,
  leftTextData
) {
  if (current_parallels[0]) {
    return findColorValues({
      mainSegment: segText,
      segmentName: segmentNr,
      parallels: current_parallels,
      lang,
    });
  } else if (leftSideSelected) {
    return highlightActiveMainElement({
      rootSegtext: segText,
      rootSegnr: segmentNr,
      selectedNumbers: leftTextData.selectedParallels,
      startoffset: leftTextData.startoffset,
      endoffset: leftTextData.endoffset,
      rightMode: false,
    });
  }
  return [];
}

export function LeftSegmentContainer({
  segmentNr,
  segText,
  current_parallels,
  number,
  onClick,
  leftTextData,
  showSegmentNumbers,
  segmentDisplaySide,
  transMethod,
}) {
  const lang = getLanguageFromFilename(segmentNr);
  const leftSideSelected =
    leftTextData && leftTextData.selectedParallels.indexOf(segmentNr) > -1;
  let segmentNrList = segmentNr.split(':')[1].split('_');
  const displayNumber =
    segmentNrList.length >= 2
      ? `${segmentNrList[segmentNrList.length - 2]}`
      : `${segmentNrList[0]}`;
  let firstDisplayNumber =
    segmentNr.split(':')[1].match('_') && !segmentNr.endsWith('_0')
      ? false
      : true;

  const colorValues = getLeftSegmentColors(
    current_parallels,
    segText,
    segmentNr,
    lang,
    leftSideSelected,
    leftTextData
  );
  let newSegText;
  if (segmentNr.match('source')) {
    newSegText = SourceSegment(segText);
  } else {
    newSegText = TextSegment({
      lang,
      colorValues,
      onClick,
      inputData: segText,
      highlightMode: leftSideSelected ? 1 : 0,
      transMethod: transMethod,
    });
  }
  return LeftSegment({
    segmentNr: segmentNr,
    segText: newSegText,
    number: number,
    displayNumber,
    firstDisplayNumber,
    showSegmentNumbers,
    segmentDisplaySide,
  });
}

export function LeftSegment({
  segmentNr,
  segText,
  number,
  displayNumber,
  firstDisplayNumber,
  showSegmentNumbers,
  segmentDisplaySide,
}) {
  // prettier-ignore
  return html`<span class="left-segment"
                title=${displayNumber}
                id=${segmentNr}
                number="${number}">
                ${firstDisplayNumber
                  ? html`
                    <a class="segment-number ${segmentDisplaySide}"
                      href="${window.location.href+'/'+segmentNr.replace(/\./g, '@')}"
                      target="_blank"
                      show-number="${showSegmentNumbers}">${displayNumber}</a>`
                  : null
                }
                ${segText}</span>`
}
