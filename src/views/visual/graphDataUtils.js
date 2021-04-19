function smoothGraphValues(value) {
  // this function is used to determine how much large collections are shrinked and
  // smaller collections are enlarged, resulting in a compression effect that makes
  // the rendering of smaller entities more readable. a value of ** 1 means nothing
  // is changed. The smaller the value is, the stronger the graph is 'compressed'.
  value = value ** 0.25;

  return value;
}

export function paginateGraphData(graphData, pageSize) {
  let paginatedGraphData = [];
  let currentPage = [];
  let alreadyFoundTexts = [];
  let count = 0;
  let entryCount = 0;
  let lastPageSize;
  graphData.forEach(entry => {
    entry[2] = smoothGraphValues(entry[2]);

    if (!alreadyFoundTexts.includes(entry[0])) {
      alreadyFoundTexts.push(entry[0]);
      count += 1;
      if (count > pageSize) {
        paginatedGraphData.push(currentPage);
        currentPage = [];
        count = 1;
      }
    }
    currentPage.push(entry);
    entryCount += 1;
    if (entryCount == graphData.length) {
      paginatedGraphData.push(currentPage);
      lastPageSize = count;
    }
  });
  return [paginatedGraphData, lastPageSize];
}

export function graphDataRemoveLowest(graphData) {
  // we remove very low values and increase the value of low-but-not-too-low values for the visualization.
  let highestValue = 0;
  graphData.forEach(page => {
    page.forEach(entry => {
      let value = entry[2];
      if (value > highestValue) {
        highestValue = value;
      }
    });
  });
  graphData = graphData.map(page => {
    page = page.map(entry => {
      let value = entry[2];
      if (value < highestValue / 15 && value > highestValue / 50) {
        entry[2] = highestValue / 15;
      }
      if (entry[2] > highestValue / 15) {
        return entry;
      }
    });
    page = page.filter(function(entry) {
      return entry !== undefined;
    });
    return page;
  });

  return graphData;
}
