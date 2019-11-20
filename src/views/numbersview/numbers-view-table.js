import { html } from 'lit-element';

import { objectMap } from '../utility/utils';
import { getParCollectionNumber, getParSutta } from './numbersViewUtils';
import NumbersViewTableHeader from './numbers-view-table-header';

const NumbersViewTable = ({ fileName, collections, segments }) => {
  if (!segments || segments.length === 0) {
    return null;
  }

  let collectionslist = {};
  for (let key in collections) {
    collectionslist = Object.assign(collectionslist, collections[key]);
  }
  return html`
    <table class="numbers-view-table">
      ${NumbersViewTableHeader(fileName, collectionslist)}
      ${NumbersViewTableContent(segments, collectionslist)}
    </table>
  `;
};

const NumbersViewTableContent = (segments, collectionkeys) =>
  segments.map(segment => {
    const collections = objectMap(collectionkeys, () => []);
    const { parallels: segmentParallels, segmentnr } = segment;

    return TableRowContainer(
      segmentParallels ? segmentParallels : [],
      collections,
      segmentnr
    );
  });

const TableRowContainer = (segmentParallels, collections, segmentnr) =>
  segmentParallels.map((parallelArr, index) => {
    const parSutta = getParSutta(
      parallelArr[0],
      parallelArr[parallelArr.length - 1]
    );
    const parCollection = getParCollectionNumber(parSutta);

    if (collections[parCollection]) {
      collections[parCollection].push(parSutta);
      if (index === segmentParallels.length - 1) {
        return TableRow(segmentnr, collections);
      }
    }
  });

const TableRow = (segmentNr, collections) =>
  html`
    <tr>
      <th>
        <span class="segment-number">${segmentNr}</span>
      </th>
      ${Object.keys(collections).map(
        key => html`
          <td>
            ${getParallelsForCollection(collections[key])}
          </td>
        `
      )}
    </tr>
  `;

const getParallelsForCollection = collection =>
  collection.map(item => {
    const segmentName =
      item.length >= 3
        ? `${item[0]}:${item[1]}:${item[item.length - 1]}`
        : `${item[0]}:${item[item.length - 1]}`;
    return html`
      <span class="segment-number">${segmentName}</span><br />
    `;
  });

export default NumbersViewTable;
