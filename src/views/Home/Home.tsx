import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout,Button, RowType } from 'cashcow-ui'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import EarningsCard from 'views/Home/components/earnings'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import LaunchpadCard from 'views/Home/components/launchpad'
import StakingCard from 'views/Home/components/StakingPool'
import FarmingCard from 'views/Home/components/FarmingPool'

import { useBlock, useFarms, useGetApiPrices, usePools, usePriceCakeBusd } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import usePersistState from 'hooks/usePersistState'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { DesktopColumnSchema, ViewMode } from 'views/Farms/components/types'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync, setLoadArchivedFarmsData } from 'state/farms'
import isArchivedPid from 'utils/farmHelpers'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { Farm } from 'state/types'
import { getFarmApr } from 'utils/apr'
import { orderBy, partition } from 'lodash'
import { RowProps } from 'views/Farms/components/FarmTable/Row'
import { getBalanceNumber } from 'utils/formatBalance'
import Table from '../Farms/components/FarmTable/FarmTable'
import FarmCard, { FarmWithStakedValue } from '../Farms/components/FarmCard/FarmCard'


const Hero = styled.div`
  align-items: center;
  
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  margin-top: -40px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`
const NUMBER_OF_FARMS_VISIBLE = 12
let index = 0;
let farmed = []
let index0 = 0;
let staked = []
const upcoming=[{title : 'Launchpad',imgUrl :'/launchpad.png'},{title:'Cowblast',imgUrl :'/cowblast.png'},{title:'Prediction',imgUrl :'/images/prediction.png'}];
let index1 =0;
//  [{title : 'busd', earn : '10', apy :'4'},{title : 'eth', earn : '20', apy :'8'},{title : 'btc', earn : '30', apy :'12'}]
 let currentFarm;
 let currentcard=upcoming[0];
 let currentStake = staked[0];
const Home: React.FC = () => {

  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, 'pancake_farm_view')
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const prices = useGetApiPrices()

  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  useEffect(() => {
    // Makes the main scheduled fetching to request archived farms data
    dispatch(setLoadArchivedFarmsData(isArchived))

    // Immediately request data for archived farms so users don't have to wait
    // 60 seconds for public data and 10 seconds for user data
    if (isArchived) {
      dispatch(fetchFarmsPublicDataAsync())
      if (account) {
        dispatch(fetchFarmUserDataAsync(account))
      }
    }
  }, [isArchived, dispatch, account])

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !prices) {
          return farm
        }

        const quoteTokenPriceUsd = prices[getAddress(farm.quoteToken.address).toLowerCase()]
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const apr = isActive ? getFarmApr(farm.poolWeight, cakePrice, totalLiquidity) : 0

        return { ...farm, apr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return farm.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, prices, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])
 
  // useEffect(() => {
  //   const showMoreFarms = (entries) => {
  //     const [entry] = entries
  //     if (entry.isIntersecting) {
  //       setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
  //     }
  //   }

  //   if (!observerIsSet) {
  //     const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
  //       rootMargin: '0px',
  //       threshold: 1,
  //     })
  //     loadMoreObserver.observe(loadMoreRef.current)
  //     setObserverIsSet(true)
  //   }
  // }, [farmsStakedMemoized, observerIsSet])

  const rowData = farmsStakedMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

   
    return row
  })

  // const { path } = useRouteMatch()
  // const { t } = useTranslation()
  // const { account } = useWeb3React()
  const pools = usePools(account)
  const { currentBlock } = useBlock()
  // const [stakedOnly, setStakedOnly] = usePersistState(false, 'pancake_pool_staked')

  const [finishedPools, openPools] = useMemo(
    () => partition(pools, (pool) => !pool.isFinished || currentBlock > pool.endBlock),
    [currentBlock, pools],
  )
  const stakedOnlyPools = useMemo(
    () => openPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [openPools],
  )
  const hasStakeInFinishedPools = useMemo(
    () => finishedPools.some((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [finishedPools],
  )

  console.log(finishedPools,"finishedPools")
  console.log(stakedOnlyPools,"stakedOnlyPools")
  console.log(hasStakeInFinishedPools,"hasStakeInFinishedPools")

  farmed = rowData;
  staked = finishedPools;
  currentFarm=farmed[index];
  currentStake = staked[index0]
  console.log(farmed,"row")
  // const renderContent = (): JSX.Element => {
  //   if (viewMode === ViewMode.TABLE && rowData.length) {
  //     const columnSchema = DesktopColumnSchema

  //     const columns = columnSchema.map((column) => ({
  //       id: column.id,
  //       name: column.name,
  //       label: column.label,
  //       sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
  //         switch (column.name) {
  //           case 'farm':
  //             return b.id - a.id
  //           case 'apr':
  //             if (a.original.apr.value && b.original.apr.value) {
  //               return Number(a.original.apr.value) - Number(b.original.apr.value)
  //             }

  //             return 0
  //           case 'earned':
  //             return a.original.earned.earnings - b.original.earned.earnings
  //           default:
  //             return 1
  //         }
  //       },
  //       sortable: column.sortable,
  //     }))

  //     return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
  //   }
  // }
  
  // const { t } = useTranslation()
 const [pool, setpool] = useState(0)

 
 
 const changeCard=(value)=>{
  if(value==='next'){
    if(index < farmed.length - 1)
    {
      
      setpool(pool + 1);
      index++
      console.log(index,"pool1")
      currentFarm = farmed[index]
      console.log(currentFarm,"currentFarm 1")
    }
   
  }if(value==='previous'){
    console.log('hello')
    if(index>0){
      
      setpool(pool - 1)
      index--
      console.log(index,"pool 2")
      currentFarm = farmed[index]
      console.log(currentFarm,"currentFarm 2")
    }
    
  }
}
const changeStake=(value)=>{
  if(value==='next'){
    if(index0 < staked.length - 1)
    {
      
      // setpool(pool + 1);
      index0++
      console.log(index,"pool1")
      currentStake = staked[index0]
      console.log(currentStake,"currentStake 1")
    }
   
  }if(value==='previous'){
    console.log('hello')
    if(index0>0){
      
      // setpool(pool - 1)
      index0--
      console.log(index0,"pool 2")
      currentStake = staked[index0]
      console.log(currentStake,"currentStake 2")
    }
    
  }
}
const changeUpcoming=(value)=>{
  if(value==='next'){
    if(index1 < upcoming.length - 1)
    {      
      index1++
      currentcard = upcoming[index1]
      console.log(currentcard,"currentcard")
    }
   
  }if(value==='previous'){
    console.log('hello')
    if(index1>0){
      
      index1--
      currentcard = upcoming[index1]
      console.log(currentcard,"currentcard")
    }
    
  }
}

  return ( 
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="primary">
          {t('Cashcow Defi')}
        </Heading>
        <Text>{t('The #1 AMM and yield farm on Binance Smart Chain.')}</Text>
      </Hero>
      <div>
        <Cards>
          {/* <FarmStakingCard /> */}
          <EarningsCard />
          <TotalValueLockedCard />
          {/* <LotteryCard /> */}
        </Cards>
        <CTACards>
          <div>
          <StakingCard stakeObject={currentStake} />
          <div style={{textAlign:'center',padding:'10px'}}>
          <Button onClick={()=>changeStake('previous')} style={{background:'none',boxShadow:'0px 0px 0px 0px'}}><img alt="text" src="images/left-arrow.png" /></Button>{index0 + 1}/{staked.length}
        <Button onClick={()=>changeStake('next')} style={{background:'none',boxShadow:'0px 0px 0px 0px'}}><img alt="text" src="images/right-arrow.png" /></Button>
        </div>
          </div>
        
        <div>
        <FarmingCard farmObject={currentFarm} />
        <div style={{textAlign:'center',padding:'10px'}}>
        <Button onClick={()=>changeCard('previous')} style={{background:'none',boxShadow:'0px 0px 0px 0px'}}>
          <img alt="text" src="images/left-arrow.png" /></Button>{index + 1}/{farmed.length}
          
        <Button onClick={()=>changeCard('next')} style={{background:'none',boxShadow:'0px 0px 0px 0px'}}><img alt="text" src="images/right-arrow.png" /></Button>
        </div>
        </div>
        
        <div>
        <LaunchpadCard currentCard={currentcard} />
        <div style={{textAlign:'center',padding:'10px'}}>
        <Button onClick={()=>changeUpcoming('previous')} style={{background:'none',boxShadow:'0px 0px 0px 0px'}} >
          <img alt="text" src="images/left-arrow.png" /></Button>{index1 + 1}/{upcoming.length}
        <Button onClick={()=>changeUpcoming('next')} style={{background:'none',boxShadow:'0px 0px 0px 0px'}}><img alt="text" src="images/right-arrow.png" /></Button>
        </div>
        
        </div>
        
          {/* <EarnAPRCard /> */}
          {/* <EarnAssetCard /> */}
          {/* <WinCard /> */}
          
        </CTACards>
       
        {/* <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards> */}
      </div>
    </Page>
  )
}

export default Home
