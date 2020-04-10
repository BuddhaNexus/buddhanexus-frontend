import { html } from 'lit-element';

export default function TextViewInfoModalContent(numbers, colors) {
  return html`
    <div>
      <p>
        The color coding of the syllables in the Inquiry Text on the left side
        indicates how many approximate matches are to be encountered at a
        certain syllable according to the current filter settings.
      </p>
      <p><b>Color codes per number of matches:</b></p>
      <table style="width:100%; table-layout:fixed" align="center">
        <tr>
          ${numbers}
        </tr>
        <tr>
          ${colors}
        </tr>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </table>
    </div>
  `;
}
