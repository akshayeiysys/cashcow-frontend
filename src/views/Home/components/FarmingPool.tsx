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
interface farmsValue{
    apr : any,
    details : any,
    earned : any,
    farm : any,
    liquidity : any,
    multiplier : any
}

interface farmObject{
    farmObject:farmsValue
}

type Props = farmObject 


const FarmingCard: React.FC<Props> = (props) => {
    const {farmObject} = props
    console.log(props,"props")
    const farmImage =farmObject.details.lpSymbol.split(' ')[0].toLocaleLowerCase()
    const imgUrl = `/images/farms/${farmImage}.png `
    console.log(farmImage,"farmImage")
//   const lotteryPrize = Math.round(useLotteryTotalPrizesUsd())
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
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <div style={{textAlign:'center',marginTop:'5px'}}><Heading color="contrast" size="xl">
         {t('Farms')}
        </Heading></div>
      <CardBody>
      <div style={{display:'flex',justifyContent:'space-around'}}>
      {/* farmImage={farmImage} */}
          <CardImage src={imgUrl} alt="cow logo" width={50} height={50} /> 
       
        <Label>{t('New')}</Label>
        </div>
         <Heading color="contrast" size="lg">
         {farmObject.farm.label}
        </Heading>
        {/* <div style={{display:'flex',justifyContent:'space-around'}}> */}
          <Row>
          <Text>{t('Earn')}</Text>
          <Text>{t('APR')} %</Text>
          </Row>
          <Row>
            {account ? (
              <Text>${farmObject.earned.earnings.toFixed(3)}</Text>
            ):(
              <Text>0</Text>
            )}
          
          <Text style={{color:'green'}}>{farmObject.apr.value}</Text>
          </Row>
         <Actions style={{textAlign:'center'}}>
        {/* <CardImage src="/images/cake.svg" alt="cake logo" width={64} height={64} /> */}
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
            <UnlockButton width="100%"  style={{background:'black'}}  />
          )}
        </Actions>
      </CardBody>
      
    </StyledFarmStakingCard>
  )
}

export default FarmingCard
