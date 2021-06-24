import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton,Button,Text } from 'cashcow-ui'
import { NavLink } from 'react-router-dom'
import useLotteryTotalPrizesUsd from 'hooks/useLotteryTotalPrizesUsd'
import UnlockButton from 'components/UnlockButton'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { useGetApiPrice } from 'state/hooks'
import { getAddress } from 'utils/addressHelpers'
import { getPoolApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'

const Actions = styled.div`
  margin-top: 24px;
`
const CardImage = styled.img`
  margin-bottom: 16px;
`

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  background : pink;
  color : red;
  border-radius : 10px;
  width : 30%;
  text-align: center;
  padding-top : 5px;
  height: 25px;
`
const Coming = styled.div`
    text-align: center;
    margin-top: 25px;
    background: black;
    padding: 15px 0 15px 0;
    color: white;
    border-radius: 30px;
  `
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`
interface stakesValue{
  contractAddress : any,
  earningToken : any,
  stakingToken : any,
  totalStaked: any,
  tokenPerBlock: any
 
}

interface stakeObject{
  stakeObject:stakesValue
}

type Props = stakeObject 
const isFinished = true;
const StakingCard : React.FC<Props> = (props) => {

  const {stakeObject} = props
    console.log(props,"props")
   
    const poolImage = `/images/pools/${stakeObject.earningToken.symbol}-${stakeObject.stakingToken.symbol}.png`.toLocaleLowerCase()
    
    const rewardTokenPrice = useGetApiPrice(stakeObject.earningToken.address ? getAddress(stakeObject.earningToken.address) : '')
  const stakingTokenPrice = useGetApiPrice(stakeObject.stakingToken.address ? getAddress(stakeObject.stakingToken.address) : '')
  const apr = getPoolApr(
    stakingTokenPrice,
    rewardTokenPrice,
    getBalanceNumber(stakeObject.totalStaked, stakeObject.stakingToken.decimals),
    parseFloat(stakeObject.tokenPerBlock),
  )
  console.log(apr,"apr")
    console.log(props,"stakeObject")

const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
     console.log(error,"error")
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <div style={{textAlign:'center',marginTop:'5px'}}><Heading color="contrast" size="xl">
         {t('Pools')}
        </Heading></div>
      <CardBody>
          <div style={{display:'flex',justifyContent:'space-around'}}>
          <CardImage src={poolImage} alt="cow logo" width={50} height={50} /> 
       
        <Label>{t('Popular')}</Label>
        </div>
         <Heading color="contrast" size="lg">
         {stakeObject.earningToken.symbol}
        </Heading>
        
          <Row>
          <Text>{t('Earn')}</Text>
          <Text>{t('APR')} %</Text>
          </Row>
          <Row>
          <Text>${stakeObject.earningToken.symbol}</Text>
          <Balance color="green" fontSize="14px" isDisabled={isFinished} value={apr} decimals={2} unit="%" />
         
          </Row>
          
        
        
        
         <Actions style={{textAlign:'center'}}>
        
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx
                ? t('Collecting COW')
                : t(`Harvest all (${balancesWithValue.length})`, {
                    count: balancesWithValue.length,
                  })}
            </Button>
          ) : (
            <UnlockButton width="100%" style={{background:'black'}}  />
          )}
        </Actions>
      </CardBody>
      
    </StyledFarmStakingCard>
    
  )
}

export default StakingCard
