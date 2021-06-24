import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button,Text} from 'cashcow-ui'
import { useWeb3React } from '@web3-react/core'
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
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const EarningsCard = () => {
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
    <StyledEarningsCard>
       <Heading size="xl" mb="24px" style={{textAlign:'center',marginTop:'25px'}}>
          {t('Farms & Staking')}
        </Heading>
      <CardBody style={{ display: 'flex',justifyContent: 'center',padding:'0px'}}>
       
        
        <Block>
          <Text style={{marginBottom:'25px'}}><b>{t('Daily')}</b> {t('Earnings')}</Text>
          <Text >{t('Pending harvest')}</Text>
          <Text fontSize="24px">5.0122</Text>
          {/* <CakeHarvestBalance /> */}
        </Block>
        
        {/* <Block>
          <Label>{t('CAKE in Wallet')}:</Label>
          <CakeWalletBalance />
        </Block> */}
        <Actions style={{maxWidth: '190px'}}>
        <CardImage style={{margin:'auto',display:'block'}} src="/images/img.png"  width={100} height={100} />
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
            <UnlockButton width="100%" />
          )}
        </Actions>
        <Block>
          <Text style={{marginBottom:'25px'}}><b>{t('Total')}</b> {t('Earnings')}</Text>
          <Text >{t('Pending harvest')}</Text>
          <Text fontSize="24px">5.0122</Text>
          {/* <CakeHarvestBalance /> */}
        </Block>
      </CardBody>
    </StyledEarningsCard>
  )
}

export default EarningsCard
