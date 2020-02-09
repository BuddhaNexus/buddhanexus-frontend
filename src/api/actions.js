import {
  API_URL,
  getFileSegmentsUrl,
  getGraphDataUrl,
  getTableViewUrl,
  getDataForVisualUrl,
  getFileTextAndParallelsUrl,
  getParallelCountUrl,
} from './apiUtils';

export const getSegmentsForFile = async ({
  fileName,
  limit_collection,
  ...queryParams
}) => {
  try {
    const url = getFileSegmentsUrl(fileName, limit_collection, queryParams);
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load segments from server: ', e);
    return {
      error: 'Could not load segments. Please check the console for details.',
    };
  }
};

export const getTableViewData = async ({
  fileName,
  limit_collection,
  ...queryParams
}) => {
  try {
    const url = getTableViewUrl(fileName, limit_collection, queryParams);
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load segments from server: ', e);
    return {
      error: 'Could not load segments. Please check the console for details.',
    };
  }
};

export const getDataForGraph = async ({
  fileName,
  target_collection,
  ...queryParams
}) => {
  try {
    const url = getGraphDataUrl(fileName, target_collection, queryParams);
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load graph data from server: ', e);
    return {
      error: 'Could not load graph data. Please check the console for details.',
    };
  }
};

export const getDataForVisual = async ({
  searchTerm,
  selected,
  ...queryParams
}) => {
  try {
    const url = getDataForVisualUrl(searchTerm, selected, queryParams);
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load graph data from server: ', e);
    return {
      error: 'Could not load graph data. Please check the console for details.',
    };
  }
};

export const getFileTextAndParallels = async ({
  fileName,
  limit_collection,
  ...queryParams
}) => {
  try {
    fileName = fileName.replace(' ', '');
    const url = getFileTextAndParallelsUrl(
      fileName,
      limit_collection,
      queryParams
    );
    console.log('LIMIT COLLECTION', limit_collection);
    console.log('URL', url);
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load text segments from server: ', e);
    return {
      error:
        'Could not load text segments. Please check the console for details.',
    };
  }
};

export const searchFileTextSegments = async ({ fileName, searchString }) => {
  try {
    fileName = fileName.replace(' ', '');
    const url = `${API_URL}/files/${fileName}/searchtext?search_string=${searchString}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load text segments from server: ', e);
    return {
      error:
        'Could not load text segments. Please check the console for details.',
    };
  }
};

export const getFileTextParallelsMiddle = async ({
  segmentnr,
  file_name,
  score,
  par_length,
  co_occ,
  limit_collection,
}) => {
  try {
    let data = {
      segmentnr: segmentnr,
      file_name: file_name,
      score: score,
      par_length: par_length,
      co_occ: co_occ,
      limit_collection: limit_collection,
    };
    const url = `${API_URL}/parallels-for-middle/`;
    const request = {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      method: 'POST',
    };
    const response = await fetch(url, request);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load parallels from server: ', e);
    return {
      error:
        'Could not load text segments. Please check the console for details.',
    };
  }
};

export const getParallelCount = async ({
  fileName,
  limit_collection,
  ...queryParams
}) => {
  try {
    const url = getParallelCountUrl(fileName, limit_collection, queryParams);
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load segments from server: ', e);
    return {
      error: 'Could not load segments. Please check the console for details.',
    };
  }
};

export const getDataForSidebarMenu = async ({ language }) => {
  try {
    const url = `${API_URL}/menus/sidebar/${language}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load segments from server: ', e);
    return {
      error: 'Could not load segments. Please check the console for details.',
    };
  }
};
