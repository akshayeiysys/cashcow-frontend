/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PriceApiResponse, PriceApiThunk, PriceState } from 'state/types'

const initialState: PriceState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
}

// Thunks
export const fetchPrices = createAsyncThunk<PriceApiThunk>('prices/fetch', async () => {
  const response = await fetch('https://api.pancakeswap.info/api/v2/tokens')
  const data = (await response.json()) as PriceApiResponse
//  change address
  // Return normalized token names
//   return {
//     updated_at: data.updated_at,
//     data: Object.keys(data.data).reduce((accum, token) => {
//       return {
//         ...accum,
//         [token.toLowerCase()]: parseFloat(data.data[token].price),
//       }
//     }, {}),
//   }
// })
const datasss =
  {"updated_at":1621849446533,"data":{"0xae13d989dac2f0debff460ac112a837c89baa7cd":
  {"name":"Shiba Inu Fan Token","symbol":"WBNB",
  "price":"0.00000000002083089712469237894375610498555721",
  "price_BNB":"0.0000000000000000000000003964021546740927131996550225937686"},
  "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee":
  {"name":"BUSD Token","symbol":"BUSD",
  "price":"0.000000000000000000000000190955",
  "price_BNB":"0.0000002569108179732081785879067555606616"},
  "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd":
  {"name":"USDT Token","symbol":"USDT",
  "price":"0.00000000000000000490955",
  "price_BNB":"0.0000000000032081785879067555606616"},
  "0xeceDe11E78C9f015635F7D6dDef1293caC7F37E0":
  {"name":"BTCB Token","symbol":"BTCB",
  "price":"0.80000000000000000000000 090955",
  "price_BNB":"0.009108179732081785879067555606616"},
  "0xed6103246Ac7a24AfE818982293EA5E4E1af8d07":
  {"name":"WETH Token","symbol":"WETH",
  "price":"0.0000000000000000007500000000000955",
  "price_BNB":"0.0000000000000000000000000090007320817858790675556066169888"},
  "0xf2fe597Ba4Ec1ddfB116df60107247E441D4C699":
  {"name":"COW Token","symbol":"COW",
  "price":"0.0000000000000000007500000000000955",
  "price_BNB":"0.0000000000000000000000000090007320817858790675556066169888"}
}}
 return {
    updated_at: data.updated_at,
    data: Object.keys(datasss.data).reduce((accum, token) => {
      return {
        ...accum,
        [token.toLowerCase()]: parseFloat(datasss.data[token].price),
      }
    }, {}),
  }
})

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchPrices.fulfilled, (state, action: PayloadAction<PriceApiThunk>) => {
      state.isLoading = false
      state.lastUpdated = action.payload.updated_at
      state.data = action.payload.data
    })
  },
})

export default pricesSlice.reducer
