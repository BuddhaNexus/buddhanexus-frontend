import { html } from 'lit-element';

import { objectMap } from '../utility/utils';
import { getParCollectionNumber } from './numbersViewUtils';
import NumbersViewTableHeader from './numbers-view-table-header';
import { getLinkForSegmentNumbers } from '../utility/preprocessing';

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

const NumbersViewTableContent = (segments, collectionkeys, language) =>
  segments.map(segment => {
    const collections = objectMap(collectionkeys, () => []);
    const { parallels: segmentParallels, segmentnr } = segment;
    return TableRowContainer(
      segmentParallels ? segmentParallels : [],
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
    const segmentlink = getLinkForSegmentNumbers(language, [`${segmentnr}`]);
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
    <tr>
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
    const segmentlink = getLinkForSegmentNumbers(language, item);
    //prettier-ignore
    return html`
      <span class="segment-number">${segmentlink}</span><br />
    `;
  });

export default NumbersViewTable;
