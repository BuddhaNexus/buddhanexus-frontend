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
      url: 'Activities',
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
      text: 'Visual Charts',
      url: 'visual',
    },
];

export const navMenuDataSub = [ 
    {
	text: 'Home',
	url: './'
    },
    ...navMenuDataMain
    ]


