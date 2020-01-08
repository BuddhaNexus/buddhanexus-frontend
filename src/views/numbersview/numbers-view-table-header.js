import { html } from 'lit-element';

import { replaceFileNameForDisplay } from '../utility/preprocessing';

const NumbersViewTableHeader = (fileName, collectionKeys) =>
  html`
    <thead>
      <tr>
        <th class="segment-header">
          Segment id in ${replaceFileNameForDisplay(fileName)}
        </th>
        ${Object.keys(collectionKeys).map(
          item =>
            html`
              <td class="segment-header" name="${collectionKeys[item]}">
                ${item.toUpperCase()}
              </td>
            `
        )}
      </tr>
    </thead>
  `;

export default NumbersViewTableHeader;
