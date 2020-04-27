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
  currentSegment,
  currentPosition,
}) {
  const lang = getLanguageFromFilename(segmentNr);
  const leftSideSelected =
    leftTextData && leftTextData.selectedParallels.indexOf(segmentNr) > -1;

  return LeftSegment({
    segmentNr: segmentNr,
    segText: TextSegment({
      inputData: segText,
      lang: lang,
      colorValues: getLeftSegmentColors(
        current_parallels,
        segText,
        segmentNr,
        lang,
        leftSideSelected,
        leftTextData
      ),
      onClick,
      highlightMode: leftSideSelected ? 1 : 0,
    }),
    number: number,
    currentSegment: currentSegment,
    currentPosition: currentPosition,
  });
}

export function LeftSegment({
  segmentNr,
  segText,
  number,
  currentSegment,
  currentPosition,
}) {
  const displayNumber = `${segmentNr.split(':')[1].split('_')[0]}`;
  const showLineBreak =
    segmentNr === currentSegment &&
    number > 10 &&
    number < 180 &&
    currentPosition < 100;
  // prettier-ignore
  return html`
    ${showLineBreak ? html`<br />` : null }
    <span class="left-segment" title=${displayNumber} id=${segmentNr} number="${number}">${segText}</span>
  `
}
