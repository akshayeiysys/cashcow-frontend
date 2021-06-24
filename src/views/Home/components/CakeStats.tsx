import React from 'react'
import { Card, CardBody, Heading, Text } from 'cashcow-ui'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 0px
`

const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledCakeStats>
      <CardBody>
        {/* <Heading size="xl" mb="24px">
          {t('Cake Stats')}
        </Heading> */}
        <Row>
        <div>
          <Text fontSize="16px" style={{marginBottom:'10px'}}>{t('Total Supply')}</Text>
          {cakeSupply && <CardValue fontSize="16px" value={cakeSupply}  />}
        </div>
        <div style={{textAlign:'right'}}>
          <Text fontSize="16px" style={{marginBottom:'10px',width:'100%'}}>{t('Burn Rate')}</Text>
          <CardValue fontSize="16px" decimals={0} value={2} />
        </div>
        </Row>
        <Row>
            <div>
          <Text fontSize="16px" style={{marginBottom:'10px'}}>{t('New token/block')}</Text>
          <CardValue fontSize="16px" decimals={0} value={40} />
          </div>

          <div  style={{textAlign:'right'}}>
          <Text fontSize="16px" style={{marginBottom:'10px',width:'100%'}}>{t('Total Burned')}</Text>
          <CardValue fontSize="16px" decimals={0} value={burnedBalance} />
          </div>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
