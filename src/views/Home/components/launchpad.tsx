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
    margin-top: 78px;
    align-items: center;
    background: black;
    padding: 15px 0 15px 0;
    border: 0;
    border-radius: 16px;
    box-shadow: 0px -1px 0px 0px rgb(14 14 44 / 40%) inset;
    cursor: pointer;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-letter-spacing: 0.03em;
    -moz-letter-spacing: 0.03em;
    -ms-letter-spacing: 0.03em;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0;
    -webkit-transition: background-color 0.2s,opacity 0.2s;
    transition: background-color 0.2s,opacity 0.2s;
    height: 48px;
    padding: 0 24px;
    
    color: white;
    width: 100%;
  `
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const CardImage = styled.img`
  margin-bottom: 16px;
`

interface value{
title: string
imgUrl: string
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
              
        
        <Label className="labelSize">{t('In')} 3 {t('days')}</Label>
        </div>
        <CardImage className="launchpadImage" src={currentCard.imgUrl} alt="cow logo" width={50} height={50} />
        <Heading color="contrast" size="lg" style={{marginTop:'10px',margin:'0px 0px 0px 50px',width:'90%'}}>
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
