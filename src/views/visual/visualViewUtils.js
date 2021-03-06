const graphColors = [
  'rgb(23, 190, 207)',
  'rgb(31, 119, 180)',
  'rgb(255,127,14)',
  'rgb(44, 160, 44)',
  'rgb(214, 39, 40)',
  'rgb(148, 103, 189)',
  'rgb(140, 86, 75)',
  'rgb(227, 119, 194)',
  'rgb(127, 127, 127)',
  'rgb(188,189,34)',
  'rgb(23, 190, 207)',
  'rgb(44, 160, 44)',
  'rgb(255,127,14)',
  'rgb(44, 160, 44)',
  'rgb(214, 39, 40)',
  'rgb(148, 103, 189)',
  'rgb(140, 86, 75)',
  'rgb(255,127,14)',
  'rgb(31, 119, 180)',
  'rgb(188,189,34)',
  'rgb(23, 190, 207)',
  'rgb(148, 103, 189)',
  'rgb(227, 119, 194)',
  'rgb(140, 86, 75)',
  'rgb(214, 39, 40)',
  'rgb(227, 119, 194)',
  'rgb(44, 160, 44)',
  'rgb(127, 127, 127)',
  'rgb(23, 190, 207)',
];

export const getGoogleGraphOptions = {
  sankey: {
    iterations: 0,
    node: {
      width: 40,
      interactivity: true,
      nodePadding: 20,
      colors: graphColors,
      label: {
        fontSize: 14,
        bold: true,
      },
    },
    link: {
      colorMode: 'gradient',
      fillOpacity: 0.4,
      colors: graphColors,
    },
  },
};

export const getGoogleGraphOptionsSource = {
  sankey: {
    iterations: 0,
    node: {
      width: 40,
      interactivity: true,
      nodePadding: 20,
      colors: graphColors,
      label: {
        fontSize: 14,
        bold: true,
      },
    },
    link: {
      colorMode: 'source',
      fillOpacity: 0.1,
    },
  },
};

export const getGoogleGraphOptionsTarget = {
  sankey: {
    iterations: 0,
    node: {
      width: 40,
      interactivity: true,
      nodePadding: 20,
      colors: graphColors,
      label: {
        fontSize: 14,
        bold: true,
      },
    },
    link: {
      colorMode: 'target',
      fillOpacity: 0.1,
    },
  },
};
