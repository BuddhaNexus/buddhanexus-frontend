import { html } from 'lit-element';

import { createTextViewSegmentUrl } from '../data/dataViewUtils';

export function EnglishSegmentContainer({
  segmentNr,
  segText,
  activeSegment,
  showSegmentNumbers,
  segmentDisplaySide,
  onClick,
  language,
}) {
  let highLightSegment = false;
  let displayNumber = segmentNr.split(':')[1];
  let firstDisplayNumber = true;

  if (language == 'pli') {
    if (
      activeSegment &&
      (segmentNr.split('_')[0] === activeSegment.split('_')[0] ||
        segmentNr.split('_')[0] === activeSegment.substr(3))
    ) {
      highLightSegment = true;
    }
    let segmentNrList = segmentNr.split(':')[1].split('_');
    displayNumber =
      segmentNrList.length >= 2
        ? `${segmentNrList[segmentNrList.length - 2]}`
        : `${segmentNrList[0]}`;
    firstDisplayNumber =
      segmentNr.split(':')[1].match('_') && !segmentNr.endsWith('_0')
        ? false
        : true;
  } else {
    const lastIndex = segmentNr.lastIndexOf('_');
    if (
      activeSegment &&
      (segmentNr === activeSegment ||
        segmentNr === activeSegment.substr(3) ||
        segmentNr.slice(0, lastIndex) === activeSegment ||
        segmentNr.slice(0, lastIndex) === activeSegment.substr(3))
    ) {
      highLightSegment = true;
    }
  }

  let newSegText =
    language == 'pli'
      ? PaliSegment(segText, segmentNr)
      : ChineseSegment(segText);

  return EnglishSegment({
    segmentNr: segmentNr,
    segText: newSegText,
    highLightSegment,
    displayNumber,
    firstDisplayNumber,
    showSegmentNumbers,
    segmentDisplaySide,
    onClick,
    language,
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

const ChineseSegment = inputData => {
  if (!inputData) {
    return;
  }
  const strippedSegment = inputData.trim();
  return html`
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
  language,
}) {
  let lineBreak =
    segmentNr.endsWith('_0') && language == 'chn' ? html`</p><p>` : '';

  // prettier-ignore
  return html`${firstDisplayNumber
                  ? html`
                    ${lineBreak}<a class="segment-number ${segmentDisplaySide}"
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
