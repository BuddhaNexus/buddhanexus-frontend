import { html } from 'lit-element';

import { SEGMENT_COLORS } from '../utility/preprocessing';
import { minimumLengthText } from '../data/data-view-subheader';

export default function TextViewInfoModalContent(language) {
  return html`
    <div>
      <p>
        The color coding of the syllables in the Inquiry Text indicates how many
        approximate matches are to be encountered at a certain syllable
        according to the current filter settings.
      </p>
      <p><b>Color codes per number of matches:</b></p>
      <table style="width:100%; table-layout:fixed" align="center">
        <tr>
          ${[...new Array(10)].map(
            (k, i) => html`
              <td><b>${i}</b></td>
            `
          )}
          <td><b>10 or more</b></td>
        </tr>
        <tr>
          <td bgcolor="#000000" style="height:30px"></td>
          ${[...new Array(10)].map(
            (k, i) => html`
              <td bgcolor="${SEGMENT_COLORS[i + 1]}"></td>
            `
          )}
        </tr>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </table>

      ${minimumLengthText(language)}
    </div>
  `;
}
