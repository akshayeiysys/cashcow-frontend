import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 18 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 12 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in components/CakeStats.tsx = 22 (40 - Amount sent to burn pool)

// CAKE_PER_BLOCK from 40 to 1
export const CAKE_PER_BLOCK = new BigNumber(1)
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const BASE_URL = 'http://3.143.197.157'
export const BASE_EXCHANGE_URL = 'http://3.143.197.157:8000'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 9
// change address lottery ticket price from 1 to 10 and LOTTERY_MAX_NUMBER_OF_TICKETS from 50 to 9
export const LOTTERY_TICKET_PRICE = 10
export const DEFAULT_TOKEN_DECIMAL = new BigNumber(10).pow(18)
