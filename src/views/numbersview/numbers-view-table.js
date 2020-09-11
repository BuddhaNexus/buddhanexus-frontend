import { html } from 'lit-element';

import { objectMap } from '../utility/utils';
import { getParCollectionNumber } from './numbersViewUtils';
import NumbersViewTableHeader from './numbers-view-table-header';
import '../utility/formatted-segment';

const NumbersViewTable = ({ fileName, collections, segments, language }) => {
  if (!segments || segments.length === 0) {
    return null;
  }
  let collectionslist = {};
  for (let key in collections[0]) {
    collectionslist = Object.assign(collectionslist, collections[0][key]);
  }

  return html`
    <table class="numbers-view-table">
      ${NumbersViewTableHeader(fileName, collectionslist)}
      ${NumbersViewTableContent(segments, collectionslist, language)}
    </table>
  `;
};

function Comparator(a, b) {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
}

const NumbersViewTableContent = (segments, collectionkeys, language) =>
  segments.map(segment => {
    const collections = objectMap(collectionkeys, () => []);
    const { parallels: segmentParallels, segmentnr } = segment;
    return TableRowContainer(
      segmentParallels ? segmentParallels.sort(Comparator) : [],
      collections,
      segmentnr,
      language
    );
  });

const TableRowContainer = (
  segmentParallels,
  collections,
  segmentnr,
  language
) =>
  segmentParallels.map((parallelArr, index) => {
    const parCollection = getParCollectionNumber(parallelArr);
    const segmentlink = html`
      <formatted-segment
        .segmentnr="${[`${segmentnr}`]}"
        .lang="${language}"
      ></formatted-segment>
    `;
    if (collections[parCollection]) {
      collections[parCollection].push(parallelArr);
      if (index === segmentParallels.length - 1) {
        return TableRow(segmentlink, collections, language);
      }
    }
  });

const TableRow = (segmentNr, collections, language) =>
  //prettier-ignore
  html`
    <tr class="numbers-view-table-row">
      <th>
        <span class="segment-number">${segmentNr}</span>
      </th>
      ${Object.keys(collections).map(
        key => html`
          <td>
            ${getParallelsForCollection(collections[key], language)}
          </td>
        `
      )}
    </tr>
  `;

const getParallelsForCollection = (collection, language) =>
  collection.map(item => {
    const segmentlink = html`
      <formatted-segment
        .segmentnr="${item}"
        .lang="${language}"
      ></formatted-segment>
    `;
    //prettier-ignore
    return html`
      <span class="segment-number">${segmentlink}</span><br />
    `;
  });

export default NumbersViewTable;
