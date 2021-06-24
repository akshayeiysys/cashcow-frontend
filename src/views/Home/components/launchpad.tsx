import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from 'cashcow-ui'
import { NavLink } from 'react-router-dom'
import useLotteryTotalPrizesUsd from 'hooks/useLotteryTotalPrizesUsd'
import { useTranslation } from 'contexts/Localization'

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
  padding : 5px 0 5px 0;
  float: right;
`
const Coming = styled.div`
    text-align: center;
    margin-top: 82px;
    background: black;
    padding: 15px 0 15px 0;
    color: white;
    border-radius: 16px;
  `
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`

interface value{
title: string
}
interface currentCard{
  currentCard:value
}

type props = currentCard;
const LaunchpadCard:React.FC<props> = (props) => {
  const {currentCard} = props;
//   const lotteryPrize = Math.round(useLotteryTotalPrizesUsd())
const { t } = useTranslation()
  return (
    <StyledFarmStakingCard>
      <div style={{textAlign:'center',marginTop:'5px'}}><Heading color="contrast" size="xl">
         {t('Upcoming')}
        </Heading></div>
      <CardBody>
          <div>
              
        
        <Label>{t('In')} 3 {t('days')}</Label>
        </div>
        <Heading color="contrast" size="lg" style={{marginTop:'90px',margin:'65px 0 0px 30px',width:'100%'}}>
        {t(`${currentCard.title}`)}
        {/* {t('LAUNCHPAD')} */}
        </Heading>
        {/* <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            up for grabs
          </Heading>
          <NavLink exact activeClassName="active" to="/lottery" id="lottery-pot-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex> */}
        <Coming >
        {t('Coming soon')}
        </ Coming>
      </CardBody>
      
    </StyledFarmStakingCard>
  )
}

export default LaunchpadCard
