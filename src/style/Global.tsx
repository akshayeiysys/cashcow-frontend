import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from 'cashcow-ui/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  @media(max-width:480px){
    .sizeEarning{
      font-size: 12px;
      font-weight: 400;
    }
    .labelSize{
      width: 100% !important;
    }
    .launchpadImage{
      margin-top: 12px;
    }
    .sizeHead{
      font-size: 35px;
      font-weight: 600;
    }
  }
`

export default GlobalStyle
