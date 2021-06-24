import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background: ${(props) => props.theme.card.background};
  box-shadow: 0px 2px 12px -8px #ff5467, 0px 1px 1px #ff5467;
  border-radius: 8px;
  display: flex;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  box-shadow: ${({ isActive }) =>
    isActive
      ? '0px 0px 0px 1px #ff5467, 0px 0px 4px 8px rgba(31, 199, 212, 0.4);'
      : '0px 2px 12px -8px #ff5467, 0px 1px 1px #ff5467'};
  flex-direction: column;
  align-self: baseline;
  position: relative;
`

export default Card
