import { html } from 'lit-element';

import { FormattedFileName } from '../utility/common-components';

const NumbersViewTableHeader = (fileName, collectionKeys) =>
  html`
    <thead>
      <tr>
        <th class="segment-header">
          Segment id in ${FormattedFileName({ fileName: fileName })}
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
