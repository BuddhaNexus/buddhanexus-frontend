import { html } from 'lit-element';

const NumbersViewTableHeader = (fileName, collectionKeys) =>
  html`
    <thead>
      <tr>
        <th class="segment-header">
          Segment id in ${fileName.toUpperCase()}
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
