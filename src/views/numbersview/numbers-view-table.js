import { html } from 'lit-element';

import { objectMap } from '../utility/utils';
import { getParCollectionNumber } from './numbersViewUtils';
import { createTextViewSegmentUrl } from '../data/dataViewUtils';
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
        const rootLink = createTextViewSegmentUrl(segmentnr);
        return TableRow(segmentlink, collections, language, rootLink);
      }
    }
  });

const TableRow = (segmentNr, collections, language, rootLink) =>
  //prettier-ignore
  html`
    <tr class="numbers-view-table-row">
      <th>
        <span class="segment-number">${segmentNr}&nbsp;<iron-icon
        class="open-link-icon"
        icon="vaadin:external-browser"
        title="Display this text in a new tab"
        onclick="window.open('${rootLink}','_blank');">
      </iron-icon></span>
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
    const parLink = createTextViewSegmentUrl(item[0]);
    const segmentlink = html`
      <formatted-segment
        .segmentnr="${item}"
        .lang="${language}"
      ></formatted-segment>
    `;
    //prettier-ignore
    return html`
      <span class="segment-number">${segmentlink}&nbsp;<iron-icon
        class="open-link-icon"
        icon="vaadin:external-browser"
        title="Display this text in a new tab"
        onclick="window.open('${parLink}','_blank');">
      </iron-icon></span><br />
    `;
  });

export default NumbersViewTable;
