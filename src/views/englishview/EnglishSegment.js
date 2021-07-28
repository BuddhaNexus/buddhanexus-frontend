import { html } from 'lit-element';

import { createTextViewSegmentUrl } from '../data/dataViewUtils';

export function EnglishSegmentContainer({
  segmentNr,
  segText,
  activeSegment,
  showSegmentNumbers,
  segmentDisplaySide,
  onClick,
}) {
  let highLightSegment = false;
  if (
    activeSegment &&
    (segmentNr.split('_')[0] === activeSegment.split('_')[0] ||
      segmentNr.split('_')[0] === activeSegment.substr(3))
  ) {
    highLightSegment = true;
  }
  let segmentNrList = segmentNr.split(':')[1].split('_');
  const displayNumber =
    segmentNrList.length >= 2
      ? `${segmentNrList[segmentNrList.length - 2]}`
      : `${segmentNrList[0]}`;
  let firstDisplayNumber =
    segmentNr.split(':')[1].match('_') && !segmentNr.endsWith('_0')
      ? false
      : true;

  let newSegText = PaliSegment(segText, segmentNr);
  return EnglishSegment({
    segmentNr: segmentNr,
    segText: newSegText,
    highLightSegment,
    displayNumber,
    firstDisplayNumber,
    showSegmentNumbers,
    segmentDisplaySide,
    onClick,
  });
}

const PaliSegment = (inputData, segmentNr) => {
  if (!inputData) {
    return;
  }
  const strippedSegment = inputData.replace(/\//g, '|').trim();
  return !segmentNr.match(/^(anya|tika|atk)/g) &&
    (strippedSegment.match(/^[0-9]/g) || strippedSegment.match(/[0-9]$/g))
    ? html`
        <h3>${strippedSegment}</h3>
      `
    : strippedSegment.match(/[.?|)'vagga''vatthu''sutta']$/g)
    ? html`
        ${strippedSegment}</p><p>
      `
    : html`
        ${strippedSegment}
      `;
};

function convertSegment(segmentNr) {
  return segmentNr.startsWith('ai-') || segmentNr.startsWith('en-')
    ? (segmentNr = segmentNr.replace('ai-', '').replace('en-', '') + '_0')
    : segmentNr;
}

export function EnglishSegment({
  segmentNr,
  segText,
  highLightSegment,
  displayNumber,
  firstDisplayNumber,
  showSegmentNumbers,
  segmentDisplaySide,
  onClick,
}) {
  // prettier-ignore
  return html`${firstDisplayNumber
                  ? html`
                    <a class="segment-number ${segmentDisplaySide}"
                      href="${createTextViewSegmentUrl(convertSegment(segmentNr))}"
                      target="_blank"
                      show-number="${showSegmentNumbers}">${displayNumber}</a>`
                  : null
                }
                <span class="segment ${highLightSegment ? 'segment--highlighted' : ''}"
                title=${displayNumber}
                id=${segmentNr}
                @click="${onClick}">${segText}</span>`
}
