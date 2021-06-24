import { MenuEntry } from 'cashcow-ui'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    // status: {
    //   text: 'MIGRATE',
    //   color: 'warning',
    // },
    items: [
      // {
      //   label: 'LP Migration',
      //   href: 'https://v1exchange.pancakeswap.finance/#/migrate',
      // },
      {
        label: 'Exchange',
        href: 'http://3.143.197.157:8000/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'http://3.143.197.157:8000/#/pool',
      },
      // {
      //   label: 'V1 Liquidity (Old)',
      //   href: 'https://v1exchange.pancakeswap.finance/#/pool',
      // },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: '/lottery',
    status: {
      text: 'WIN',
      color: 'warning',
    },
  },
  // {
  //   label: 'Collectibles',
  //   icon: 'NftIcon',
  //   href: '/collectibles',
  // },
  // {
  //   label: 'Team Battle',
  //   icon: 'TeamBattleIcon',
  //   href: '/competition',
  // },
  // {
  //   label: 'Teams & Profile',
  //   icon: 'GroupsIcon',
  //   items: [
  //     {
  //       label: 'Leaderboard',
  //       href: '/teams',
  //     },
  //     {
  //       label: 'Task Center',
  //       href: '/profile/tasks',
  //     },
  //     {
  //       label: 'Your Profile',
  //       href: '/profile',
  //     },
  //   ],
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'http://3.143.197.157:9000/',
      },
      // {
      //   label: 'Tokens',
      //   href: 'https://pancakeswap.info/tokens',
      // },
      // {
      //   label: 'Pairs',
      //   href: 'https://pancakeswap.info/pairs',
      // },
      // {
      //   label: 'Accounts',
      //   href: 'https://pancakeswap.info/accounts',
      // },
    ],
  },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: '/ifo',
  // },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      // {
      //   label: 'Contact',
      //   href: 'https://docs.pancakeswap.finance/contact-us',
      // },
      // {
      //   label: 'Voting',
      //   href: 'https://voting.pancakeswap.finance',
      // },
      {
        label: 'Github',
        href: 'https://github.com/pancakeswap',
      },
      // {
      //   label: 'Docs',
      //   href: 'https://docs.pancakeswap.finance',
      // },
      {
        label: 'Blog',
        href: 'https://medium.com/@CashCowDefi',
      },
      // {
      //   label: 'Merch',
      //   href: 'https://pancakeswap.creator-spring.com/',
      // },
    ],
  },
]

export default config


// import { MenuEntry } from 'cashcow-ui'
// import { ContextApi } from 'contexts/Localization/types'

// const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
//   {
//     label: t('Home'),
//     icon: 'HomeIcon',
//     href: '/',
//   },
//   {
//     label: t('Trade'),
//     icon: 'TradeIcon',
//     // status: {
//     //   text: 'MIGRATE',
//     //   color: 'warning',
//     // },
//     items: [
//       // {
//       //   label: 'LP Migration',
//       //   href: 'https://v1exchange.pancakeswap.finance/#/migrate',
//       // },
//       {
//         label: t('Exchange'),
//         href: 'http://3.143.197.157:8000/#/swap',
//       },
//       {
//         label:  t('Liquidity'),
//         href: 'http://3.143.197.157:8000/#/pool',
//       },
//       // {
//       //   label: 'V1 Liquidity (Old)',
//       //   href: 'https://v1exchange.pancakeswap.finance/#/pool',
//       // },
//     ],
//   },
//   {
//     label: t('Farms'),
//     icon: 'FarmIcon',
//     href: '/farms',
//   },
//   {
//     label: t('Pools'),
//     icon: 'PoolIcon',
//     href: '/pools',
//   },
//   {
//     label: t('Lottery'),
//     icon: 'TicketIcon',
//     href: '/lottery',
//     status: {
//       text: 'WIN',
//       color: 'warning',
//     },
//   },
//   // {
//   //   label: 'Collectibles',
//   //   icon: 'NftIcon',
//   //   href: '/collectibles',
//   // },
//   // {
//   //   label: 'Team Battle',
//   //   icon: 'TeamBattleIcon',
//   //   href: '/competition',
//   // },
//   // {
//   //   label: 'Teams & Profile',
//   //   icon: 'GroupsIcon',
//   //   items: [
//   //     {
//   //       label: 'Leaderboard',
//   //       href: '/teams',
//   //     },
//   //     {
//   //       label: 'Task Center',
//   //       href: '/profile/tasks',
//   //     },
//   //     {
//   //       label: 'Your Profile',
//   //       href: '/profile',
//   //     },
//   //   ],
//   // },
//   {
//     label: t('Info'),
//     icon: 'InfoIcon',
//     items: [
//       {
//         label:  t('Overview'),
//         href: 'https://pancakeswap.info',
//       },
//       {
//         label: t('Tokens'),
//         href: 'https://pancakeswap.info/tokens',
//       },
//       {
//         label: t('Pairs'),
//         href: 'https://pancakeswap.info/pairs',
//       },
//       {
//         label: t('Accounts'),
//         href: 'https://pancakeswap.info/accounts',
//       },
//     ],
//   },
//   // {
//   //   label: 'IFO',
//   //   icon: 'IfoIcon',
//   //   href: '/ifo',
//   // },
//   {
//     label: t('More'),
//     icon: 'MoreIcon',
//     items: [
//       {
//         label: t('Contact'),
//         href: 'https://docs.pancakeswap.finance/contact-us',
//       },
//       {
//         label: t('Voting'),
//         href: 'https://voting.pancakeswap.finance',
//       },
//       {
//         label: t('Github'),
//         href: 'https://github.com/pancakeswap',
//       },
//       {
//         label: t('Docs'),
//         href: 'https://docs.pancakeswap.finance',
//       },
//       {
//         label: t('Blog'),
//         href: 'https://pancakeswap.medium.com',
//       },
//       // {
//       //   label: 'Merch',
//       //   href: 'https://pancakeswap.creator-spring.com/',
//       // },
//     ],
//   },
// ]

// export default config