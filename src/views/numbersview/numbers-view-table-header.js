import { html } from 'lit-element';

import '../utility/formatted-segment';

const NumbersViewTableHeader = (fileName, collectionKeys) =>
  html`
    <thead>
      <tr>
        <th class="segment-header">
          Segment id in
          <formatted-filename .filename="${fileName}"></formatted-filename>
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
