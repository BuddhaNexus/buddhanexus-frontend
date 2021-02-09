export const navMenuDataMain = [
  {
    text: 'About',
    url: 'about',
    children: [
      {
        text: ' Introduction',
        url: 'introduction',
      },
      {
        text: ' History',
        url: 'history',
      },
    ],
  },
  {
    text: 'Community',
    url: 'community',
    children: [
      {
        text: ' Institutions',
        url: 'institutions',
      },
      {
        text: ' People',
        url: 'people',
      },
    ],
  },
  {
    text: 'News',
    url: 'news',
  },
  {
    text: 'Guidelines',
    url: 'guidelines',
  },
  {
    text: 'Activities',
    url: 'activities',
    children: [
      {
        text: ' Events',
        url: 'events',
      },
      {
        text: ' Projects',
        url: 'projects',
      },
      {
        text: ' Presentations',
        url: 'presentations',
      },
    ],
  },
  {
    text: 'Publications',
    url: 'publications',
  },
  {
    text: 'Database',
    children: [
      {
        text: 'Pāli',
        url: 'pli/neutral',
      },
      {
        text: 'Sanskrit',
        url: 'skt/neutral',
      },
      {
        text: 'Tibetan',
        url: 'tib/neutral',
      },
      {
        text: 'Chinese',
        url: 'chn/neutral',
      },
      {
        text: 'Multilingual',
        url: 'multi/neutral',
      },
    ],
  },
  {
    text: 'Visual Charts',
    url: 'visual',
  },
  {
    text: 'Tools',
    children: [
      {
        text: 'Sanskrit',
        url: 'sanskrit-tools',
      },
    ],
  },
];

export const navMenuDataSub = [
  {
    text: 'Home',
    url: './',
  },
  ...navMenuDataMain,
];
