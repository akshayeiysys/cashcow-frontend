import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Cashcow Defi',
  description:
    'The most popular AMM on BSC by user count! Earn COW through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Cashcow Defi), NFTs, and more, on a platform you can trust.',
  image: 'http://3.143.197.157/images/easter-battle.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/competition': {
    title: 'Cashcow Defi Easter Battle',
    description: 'Register now for the Cashcow Defi Easter battle!',
    image: 'http://3.143.197.157/images/easter-battle.png',
  },
}
