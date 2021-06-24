import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  // change address
  const address = {
    56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    97: '0xf2fe597Ba4Ec1ddfB116df60107247E441D4C699',
  }

  it(`get address for mainnet (chainId 56)`, () => {
    process.env.REACT_APP_CHAIN_ID = '56'
    const expected = address[56]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 97)`, () => {
    process.env.REACT_APP_CHAIN_ID = '97'
    const expected = address[97]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.REACT_APP_CHAIN_ID = '31337'
    const expected = address[56]
    expect(getAddress(address)).toEqual(expected)
  })
})
