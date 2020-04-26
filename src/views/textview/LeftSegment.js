import { html } from 'lit-element';
import { findColorValues, highlightActiveMainElement } from './textViewUtils';
import { getLanguageFromFilename } from '../utility/views-common';
import { tokenizeWords } from '../utility/preprocessing';

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
  let colorValues = [];
  let leftSideHighlight = 0;
  if (leftTextData && leftTextData.selectedParallels.indexOf(segmentNr) > -1) {
    leftSideHighlight = 1;
    colorValues = highlightActiveMainElement(
      segText,
      segmentNr,
      leftTextData.selectedParallels,
      leftTextData.startoffset,
      leftTextData.endoffset,
      false
    );
  }
  let lang = getLanguageFromFilename(segmentNr);
  if (current_parallels[0]) {
    colorValues = findColorValues(segText, segmentNr, current_parallels);
  }
  segText = tokenizeWords(
    segText,
    lang,
    colorValues,
    onClick,
    leftSideHighlight
  );
  return LeftSegment({
    segmentNr: segmentNr,
    segText: segText,
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
    ${showLineBreak ? "<br/>": null }
    <span class="left-segment" title=${displayNumber} id=${segmentNr} number="${number}">${segText}</span>
  `
}
