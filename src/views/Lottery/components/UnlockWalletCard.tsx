import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Ticket } from 'cashcow-ui'
import { useTranslation } from 'contexts/Localization'
import UnlockButton from 'components/UnlockButton'

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const IconWrapper = styled.div`
  svg {
    width: 80px;
    height: 80px;
  }
`

const UnlockWalletCard = () => {
  const { t } = useTranslation()

  return (
    <Card style={{boxShadow: '0px 0px 0px 1px #ff54678c, 0px 0px 4px 8px rgb(255 84 103 / 39%)'}} isActive>
      <StyledCardBody>
        <IconWrapper>
          <Ticket />
        </IconWrapper>
        <StyledHeading size="md">{t('Unlock wallet to access lottery')}</StyledHeading>
        <UnlockButton />
      </StyledCardBody>
    </Card>
  )
}

export default UnlockWalletCard
