import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'config/constants/types'
import { DEFAULT_TOKEN_DECIMAL } from 'config'

const fetchFarms = async (farmsToFetch: FarmConfig[]) => {
  const data = await Promise.all(
    farmsToFetch.map(async (farmConfig) => {
      console.log(farmConfig,"farmConfig")
      const lpAddress = getAddress(farmConfig.lpAddresses)
      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(farmConfig.token.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of quote token on LP contract
        {
          address: getAddress(farmConfig.quoteToken.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: lpAddress,
          name: 'balanceOf',
          params: [getMasterChefAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAddress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: getAddress(farmConfig.token.address),
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: getAddress(farmConfig.quoteToken.address),
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBalanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals,
      ] = await multicall(erc20, calls)

      
      let tokenPriceVsQuote;
      // let lpTokenRatio;
      // console.log((tokenBalanceLP.div(tokenAmount)).toJSON(),"quoteTokenAmount.div(tokenAmount).toJSON()")
      // console.log(new BigNumber(tokenBalanceLP).toJSON(),"tokenBalanceLP")
      // console.log(quoteTokenBalanceLP,"quoteTokenBalanceLP")
      // console.log(new BigNumber(lpTokenBalanceMC).toJSON(),"lpTokenBalanceMC")
      // console.log(new BigNumber(lpTotalSupply).toJSON(),"lpTotalSupply")
      // console.log(tokenDecimals,"tokenDecimals")
      // console.log(quoteTokenDecimals,"quoteTokenDecimals")
      // console.log(lpAddress,"lpAddress")
      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      // if(lpTokenBalanceMC > 0){
      const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
      // }else{
      //  const lpTokenRatio = 10000000000000
      // }
      
     console.log(lpTokenRatio.toJSON(),farmConfig.pid,"lpTokenRatio,farmConfig.pid")
      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
        .div(DEFAULT_TOKEN_DECIMAL)
        .times(new BigNumber(2))
        .times(lpTokenRatio)
        console.log(lpTotalInQuoteToken.toJSON(),"lpTokenRatiolpTotalInQuoteToken")
        console.log(lpTotalInQuoteToken.toJSON(), " = ", new BigNumber(quoteTokenBalanceLP).toJSON(), " x ", lpTokenRatio.toJSON(), " / ", '10^18', "lpTokenRatio, lpTotalInQuoteToken")
      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
      const quoteTokenAmount = new BigNumber(quoteTokenBalanceLP)
        .div(new BigNumber(10).pow(quoteTokenDecimals))
        .times(lpTokenRatio)
        console.log(tokenAmount.toJSON(),"lpTokenRatiotokenAmount")
        console.log(quoteTokenAmount.toJSON(),"lpTokenRatioquoteTokenAmount")
        // change address and code
        if (tokenAmount.comparedTo(0) > 0) {
          tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount)
          console.log(new BigNumber(tokenPriceVsQuote).toJSON(),"greater than 0")
        } else {
          tokenPriceVsQuote = new BigNumber(quoteTokenBalanceLP).div(new BigNumber(tokenBalanceLP))
          console.log(new BigNumber(tokenPriceVsQuote).toJSON(),"less than 0")
        }
// console.log(tokenBalanceLP,tokenDecimals,lpTokenRatio,"tokenBalanceLP,tokenDecimals,lpTokenRatio")
      const [info, totalAllocPoint] = await multicall(masterchefABI, [
        {
          address: getMasterChefAddress(),
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: getMasterChefAddress(),
          name: 'totalAllocPoint',
        },
      ])

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
      // console.log((quoteTokenAmount.div(tokenAmount)).toJSON(),"quoteTokenAmount.div(tokenAmount).toJSON()")
      // console.log(quoteTokenAmount.toJSON(),"quoteTokenAmount")
      // console.log(tokenAmount.toJSON(),"tokenAmount")
      // console.log(lpTotalSupply,"lpTotalSupply")
      // console.log(poolWeight.toJSON(),"poolWeight.toJSON()")
      return {
        ...farmConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        // tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        tokenPriceVsQuote: new BigNumber(tokenPriceVsQuote).toJSON(),
        poolWeight: poolWeight.toJSON(),
        multiplier: `${allocPoint.div(100).toString()}X`,
        
      }
     
    }),
  )
  return data
}

export default fetchFarms
