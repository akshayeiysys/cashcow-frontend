import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from 'cashcow-ui'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import CakeStats from 'views/Home/components/CakeStats'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: block;
  flex: 1;
`

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CardBody  style={{display:'flex',justifyContent:'space-around'}}>
        <Heading size="xl" >
          {t('Total Value Locked')}
        </Heading>
        {data ? (
          <>
            <Heading size="xl">{`$${tvl}`}</Heading>
            {/* <Text color="textSubtle">{t('Across all LPs and Syrup Pools')}</Text> */}
          </>
        ) : (
          <Skeleton height={2} />
        )}
      </CardBody>
      <CakeStats />
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
