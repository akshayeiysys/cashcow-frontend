import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton,Button,Text, useModal, IconButton, AddIcon } from 'cashcow-ui'
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
import tokens from 'config/constants/tokens'
import WithdrawModal from 'views/Pools/components/WithdrawModal'
import DepositModal from 'views/Pools/components/DepositModal'
import BigNumber from 'bignumber.js'
import { Pool } from 'state/types'
import { useSousStake } from 'hooks/useStake'
import { PoolCategory } from 'config/constants/types'
import { useSousUnstake } from 'hooks/useUnstake'
import { useSousApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import OldSyrupTitle from 'views/Pools/components/OldSyrupTitle'
import Label from 'components/Label'

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
const Labels = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  background : pink;
  color : red;
  border-radius : 10px;
  width : 40%;
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
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`
const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`
const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

interface HarvestProps {
  pool: Pool
}

interface stakesValue{
  contractAddress : any,
  earningToken : any,
  stakingToken : any,
  totalStaked: any,
  tokenPerBlock: any,
  poolCategory: any,
  sousId:any,
  userData:any,
  stakingLimit:any,
  isFinished: any
}

interface stakeObject{
  stakeObject:stakesValue
}

type Props = stakeObject 
// 
// const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
//   const {
//     sousId,
//     stakingToken,
//     earningToken,
//     harvest,
//     poolCategory,
//     totalStaked,
//     startBlock,
//     endBlock,
//     isFinished,
//     userData,
//     stakingLimit,
//   } = pool
const StakingCard : React.FC<Props> = (props) => {

  const {stakeObject} = props
  const isFinished = stakeObject.isFinished;
    console.log(stakeObject.stakingLimit,"stakeObjectprops")
   
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
  const isBnbPool = stakeObject.poolCategory === PoolCategory.BINANCE
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const stakingTokenContract = useERC20(stakeObject.stakingToken.address ? getAddress(stakeObject.stakingToken.address) : '')
  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))
  const isOldSyrup = stakeObject.stakingToken.symbol === tokens.syrup.symbol
  const allowance = new BigNumber(stakeObject.userData?.allowance || 0)
  const stakedBalance = new BigNumber(stakeObject.userData?.stakedBalance || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const [requestedApproval, setRequestedApproval] = useState(false)
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const stakingTokenBalance = new BigNumber(stakeObject.userData?.stakingTokenBalance || 0)
  const { onApprove } = useSousApprove(stakingTokenContract, stakeObject.sousId)
  const { onStake } = useSousStake(stakeObject.sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(stakeObject.sousId)
  const earnings = new BigNumber(stakeObject.userData?.pendingReward || 0)
  
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={stakeObject.stakingToken.symbol}
      stakingTokenDecimals={stakeObject.stakingToken.decimals}
    />,
  )
  const convertedLimit = new BigNumber(stakeObject.stakingLimit).multipliedBy(new BigNumber(10).pow(stakeObject.earningToken.decimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakeObject.stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakeObject.stakingLimit ? `${stakeObject.stakingToken.symbol} (${stakeObject.stakingLimit} max)` : stakeObject.stakingToken.symbol}
      stakingTokenDecimals={stakeObject.stakingToken.decimals}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash:any = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])
  
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
       
        <Labels className="labelSize">{t('Popular')}</Labels>
        </div>
         <Heading color="contrast" size="lg">
         {stakeObject.earningToken.symbol}
        </Heading>
        
          <Row>
          <Label isFinished={isFinished && stakeObject.sousId !== 0} text={t(`${stakeObject.earningToken.symbol} earned`)} />
          {/* <Text>{t('Earn')}</Text> */}
          <Text>{t('APR')} %</Text>
          </Row>
          <Row>
          {!isOldSyrup ? (
          <BalanceAndCompound>
            <Balance fontSize="14px" value={getBalanceNumber(earnings, stakeObject.earningToken.decimals)} isDisabled={isFinished} />
           
          </BalanceAndCompound>
        ) : (
          <OldSyrupTitle hasBalance={accountHasStakedBalance} />
        )}
          {/* <Text>${stakeObject.earningToken.symbol}</Text> */}
          <Balance color="green" fontSize="14px" isDisabled={isFinished} value={apr} decimals={2}  />
         
          </Row>
          
        
        
        

<StyledCardActions>
          {!account && <UnlockButton style={{background:'black',width:'100%',marginBottom:'-15px',marginTop:'11px'}} />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} onClick={handleApprove} width="100%" style={{marginBottom:'0px'}}>
                  {t(`Approve`)} {` ${stakeObject.stakingToken.symbol}`}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={
                    isOldSyrup
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0', stakeObject.stakingToken.decimals)
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }
                >
                  {`${t(`Unstake`)} ${stakeObject.stakingToken.symbol}`}
                </Button>
                <StyledActionSpacer />
                {!isOldSyrup && (
                  <IconButton disabled={isFinished && stakeObject.sousId !== 0} onClick={onPresentDeposit}>
                    <AddIcon color="white" />
                  </IconButton>
                )}
              </>
            ))}
        </StyledCardActions>
      </CardBody>
      
    </StyledFarmStakingCard>
    
  )
}
export default StakingCard