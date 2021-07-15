import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button,Text} from 'cashcow-ui'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'


const StyledEarningsCard = styled(Card)`
  
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 300px;
  padding : 15px;
`

const Block = styled.div`
  margin-bottom: 16px;
`


const CardImage = styled.img`
margin: auto;
display: block;
max-width: 100px;
min-height: 100px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 0px;
  flex: 0 0 200px;
  max-width: 200px;
`
interface earnings{
  earned: any
}

const EarningsCard:React.FC<earnings> = (props) => {
  let earn=0;
  const abc=props;
  for(let i=0;i<abc.earned.length;i++){
      earn+= abc.earned[i].earned.earnings;
  }
  console.log(earn,"earningprop")
  // console.log(abc.earned[0],"earningprop")
  // for(int i=0;i<props.earned.length;i++){

  // }
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))
  // const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  // const displayBalance = rawEarningsBalance.toLocaleString()
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
    <StyledEarningsCard>
       <Heading size="xl" mb="24px" style={{textAlign:'center',marginTop:'10px'}}>
          {t('Farms & Staking')}
        </Heading>
      <CardBody style={{ display: 'flex',justifyContent: 'center',padding:'0px',alignItems:'center'}}>
       
        
        {/* <Block>
          <Text className="sizeEarning" style={{marginBottom:'25px'}}><b>{t('Daily')}</b> {t('Earnings')}</Text>
          <Text className="sizeEarning" >{t('Pending harvest')}</Text>
          <Text fontSize="14px">5.0122</Text>
          
        </Block> */}
        
        {/* <Block>
          <Label>{t('CAKE in Wallet')}:</Label>
          <CakeWalletBalance />
        </Block> */}
        <Block>
          <Text className="sizeEarning" style={{marginBottom:'25px'}}><b>{t('Total')}</b> {t('Earnings(Pending Harvest)')}</Text>
          {/* <Text className="sizeEarning" >{t('Pending harvest')}</Text> */}
          {account ? (
            <Text style={{fontWeight:'bold'}} fontSize="16px">{earn.toFixed(3)}</Text>
          ):(
            <Text style={{fontWeight:'bold'}} fontSize="16px">0</Text>
          )}
          
          {/* <CakeHarvestBalance /> */}
        </Block>
        <Actions >
        <CardImage  src="/images/img.png"   />
          
        </Actions>
        
      </CardBody>
      {account ? (
            <Button style={{marginTop:'20px',marginLeft:'21%'}}
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="60%"
            >
              {pendingTx
                ? t('Collecting COW')
                : t(`Harvest all (${balancesWithValue.length})`, {
                    count: balancesWithValue.length,
                  })}
            </Button>
          ) : (
            <UnlockButton style={{marginTop:'20px',marginLeft:'19%'}} width="60%" />
          )}
    </StyledEarningsCard>
  )
}

export default EarningsCard
