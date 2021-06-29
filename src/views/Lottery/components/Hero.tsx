import React from 'react'
import PageHeader from 'components/PageHeader'
import styled from 'styled-components'
import { Heading, Text } from 'cashcow-ui'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/layout/Container'
import LotteryProgress from './LotteryProgress'


const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  background-image: linear-gradient(180deg,#ff5467 0%,#ff5467 100%);
  padding-bottom: 40px;
  padding-top: 40px;
`

const StyledContainer = styled(Container)`
  display: flex;

  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-left: 0;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
    padding-left: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 32px;
  }
`

const Hero = () => {
  const { t } = useTranslation()

  return (
    // <StyledHero style={{}}>
    //   <StyledContainer>
    <PageHeader>
      <StyledContainer>
        <LeftWrapper>
          <Title>{t('The COW Lottery')}</Title>
          <Blurb>{t('Buy tickets with COW')}</Blurb>
          <Blurb>{t('Win if 2, 3, or 4 of your ticket numbers match!')}</Blurb>
        </LeftWrapper>
        <RightWrapper>
          <LotteryProgress />
        </RightWrapper>
        </StyledContainer>
        </PageHeader>
    //   </StyledContainer>
    // </StyledHero>
  )
}

export default Hero
