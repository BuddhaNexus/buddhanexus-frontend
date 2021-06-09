import { html } from 'lit-element';

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

  let newSegText = PaliSegment(segText);
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

const PaliSegment = inputData => {
  if (!inputData) {
    return;
  }
  const strippedSegment = inputData.replace(/\//g, '|').trim();
  return strippedSegment.match(/^[0-9]/g) || strippedSegment.match(/[0-9]$/g)
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
  return html`<span class="segment ${highLightSegment ? 'segment--highlighted' : ''}"
                title=${displayNumber}
                id=${segmentNr}
                @click="${onClick}">
                ${firstDisplayNumber
                  ? html`
                    <span class="segment-number ${segmentDisplaySide}"
                      show-number="${showSegmentNumbers}">${displayNumber}</span>`
                  : null
                }
                ${segText}</span>`
}
