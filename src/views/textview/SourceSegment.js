import { html } from 'lit-element';

export function SourceSegment(inputData) {
  // prettier-ignore
  const outputText = html`
    <span class="source-segment">${inputData}</span><br /><br />
  `;
  return outputText;
}
