import { html } from 'lit-element';
import { findColorValues, highlightActiveMainElement } from './textViewUtils';
import { getLanguageFromFilename } from '../utility/views-common';
import { TextSegment } from './TextSegment';

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
}) {
  const lang = getLanguageFromFilename(segmentNr);
  const leftSideSelected =
    leftTextData && leftTextData.selectedParallels.indexOf(segmentNr) > -1;
  const displayNumber = `${segmentNr.split(':')[1].split('_')[0]}`;
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

  return LeftSegment({
    segmentNr: segmentNr,
    segText: TextSegment({
      lang,
      colorValues,
      onClick,
      inputData: segText,
      highlightMode: leftSideSelected ? 1 : 0,
    }),
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
                    <span
                      class="segment-number"
                      style="float: ${segmentDisplaySide}"
                      show-number="${showSegmentNumbers}">
                        ${displayNumber}
                    </span>`
                  : null
                }
                ${segText}</span>`
}
