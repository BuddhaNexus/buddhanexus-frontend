import qs from 'qs';

export const API_URL = process.env.API_ROOT_URL;

const stringifyQueryParams = queryParams =>
  '?' + qs.stringify(queryParams, { prefix: '&' });

export const getFileSegmentsUrl = (fileName, limit_collection, queryParams) => {
  let q = stringifyQueryParams(queryParams);
  if (limit_collection && limit_collection.length > 0) {
    q += limit_collection
      .map(collectionName => `&limit_collection=${collectionName}`)
      .join('');
  }
  return `${API_URL}/files/${fileName}/segments${q}`;
};

export const getTableViewUrl = (fileName, limit_collection, queryParams) => {
  let q = stringifyQueryParams(queryParams);
  if (limit_collection && limit_collection.length > 0) {
    q += limit_collection
      .map(collectionName => `&limit_collection=${collectionName}`)
      .join('');
  }
  return `${API_URL}/files/${fileName}/table${q}`;
};

export const getFileTextAndParallelsUrl = (
  fileName,
  limit_collection,
  queryParams
) => {
  let q = stringifyQueryParams(queryParams);
  if (limit_collection && limit_collection.length > 0) {
    q += limit_collection
      .map(() => `&limit_collection=${limit_collection}`)
      .join('');
  }
  return `${API_URL}/files/${fileName}/textandparallels${q}`;
};

export const getGraphDataUrl = (fileName, target_collection, queryParams) => {
  let q = stringifyQueryParams(queryParams);
  if (target_collection && target_collection.length > 0) {
    q += target_collection
      .map(collectionName => `&target_collection=${collectionName}`)
      .join('');
  }
  return `${API_URL}/files/${fileName}/graph${q}`;
};

export const getDataForVisualUrl = (searchTerm, selected, queryParams) => {
  let q = '?' + qs.stringify(queryParams, { prefix: '&' });
  if (selected && selected.length > 0) {
    q += selected.map(collectionName => `&selected=${collectionName}`).join('');
  }
  return `${API_URL}/visual/${searchTerm}${q}`;
};

export const getParallelCountUrl = (
  fileName,
  limit_collection,
  queryParams
) => {
  let q = '?' + qs.stringify(queryParams, { prefix: '&' });
  if (limit_collection && limit_collection.length > 0) {
    q += limit_collection
      .map(collectionName => `&limit_collection=${collectionName}`)
      .join('');
  }
  return `${API_URL}/parallels/${fileName}/count${q}`;
};
