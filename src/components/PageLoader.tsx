import React from 'react'
import styled from 'styled-components'
import { Spinner } from 'cashcow-ui'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      {/* <Spinner /> */}
      <img height='150' width='150' src="/images/img.png" alt="Cashcow" />
    </Wrapper>
  )
}

export default PageLoader
