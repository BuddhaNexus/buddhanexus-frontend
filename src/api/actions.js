import {
  API_URL,
  getFileSegmentsUrl,
  getGraphDataUrl,
  getTableViewUrl,
  getTableViewMultiUrl,
  getDataForVisualUrl,
  getFileTextAndParallelsUrl,
  getFileTextUrl,
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

export const getTableViewMultiData = async ({
  fileName,
  multi_lingual,
  ...queryParams
}) => {
  try {
    const url = getTableViewMultiUrl(fileName, multi_lingual, queryParams);
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
  multi_lingual,
  ...queryParams
}) => {
  try {
    fileName = fileName.replace(' ', '');
    const url = getFileTextAndParallelsUrl(
      fileName,
      limit_collection,
      multi_lingual,
      queryParams
    );
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

export const getFileText = async ({
  fileName,
  ...queryParams
}) => {
  try {
    fileName = fileName.replace(' ', '');
    const url = getFileTextUrl(
      fileName,
      queryParams
    );
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
  multi_lingual,
}) => {
  try {
    let data = {
      segmentnr: segmentnr,
      file_name: file_name,
      score: score,
      par_length: par_length,
      co_occ: co_occ,
      limit_collection: limit_collection,
      multi_lingual: multi_lingual,
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

export const getSearchDataFromBackend = async ({ query }) => {
  try {
    const url = `${API_URL}/search/${query}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load search results from server: ', e);
    return {
      error:
        'Could not load search results. Please check the console for details.',
    };
  }
};

export const getTaggedSanskrit = async ({ query }) => {
  try {
    const url = `${API_URL}/sanskrittagger/${query}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load search results from server: ', e);
    return {
      error:
        'Could not load Tagged Sanskrit. Please check the console for details.',
    };
  }
};

export const getDisplayName = async ({ segmentnr }) => {
  try {
    const url = `${API_URL}/displayname/${segmentnr}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load displayName from server: ', e);
    return {
      error:
        'Could not load displayName. Please check the console for details.',
    };
  }
};

export const getExternalLink = async ({ fileName }) => {
  try {
    const url = `${API_URL}/externallink/${fileName}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load external link from server: ', e);
    return {
      error:
        'Could not load external link. Please check the console for details.',
    };
  }
};

export const getMultilingualData = async ({ fileName }) => {
  try {
    const url = `${API_URL}/multilingual/${fileName}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load multilingual languages from server: ', e);
    return {
      error:
        'Could not load multilingual languages. Please check the console for details.',
    };
  }
};
