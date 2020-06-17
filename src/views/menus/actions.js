import { API_URL } from '../../api/apiUtils';

export const getFilesForMainMenu = async ({ language }) => {
  try {
    const url = `${API_URL}/menus/${language}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load main-menu-items from server: ', e);
    return {
      error:
        'Could not load main-menu-items. Please check the console for details.',
    };
  }
};

export const getFilesForFilterMenu = async ({ language }) => {
  try {
    const url = `${API_URL}/menus/filter/${language}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load menu-items from server: ', e);
    return {
      error: 'Could not load menu-items. Please check the console for details.',
    };
  }
};

export const getCategoriesForFilterMenu = async ({ language }) => {
  try {
    const url = `${API_URL}/menus/category/${language}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load menu-items from server: ', e);
    return {
      error: 'Could not load menu-items. Please check the console for details.',
    };
  }
};

export const getCollectionsForTargetMenu = async ({ language }) => {
  try {
    const url = `${API_URL}/menus/collections/${language}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    return json;
  } catch (e) {
    console.error('Could not load menu-items from server: ', e);
    return {
      error: 'Could not load menu-items. Please check the console for details.',
    };
  }
};

export const getCollectionsForVisual = async () => {
  try {
    const url = `${API_URL}/collections`;
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

export const getFoliosForFile = async ({ fileName }) => {
  try {
    const url = `${API_URL}/files/${fileName}/folios`;
    console.log('FETCHING FOLIOS', url);
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw Error(json.detail.errorMessage);
    }
    console.log('FOLIOS JSON', json);
    return json;
  } catch (e) {
    console.error('Could not load folios from server: ', e);
    return {
      error: 'Could not load folios. Please check the console for details.',
    };
  }
};
