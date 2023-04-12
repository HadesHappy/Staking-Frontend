import {
  STAKE_ETH_TYPE,
  ETH_INPUT_CHANGE,
  ETH_OUTPUT_CHANGE,
  ETH_INFO,
  ETH_INFO_LOADING
} from '../constants'

const initialState = {
  ethInfo: {
    lsdApr: 0,
    minimumAmount: 0,
    ethAmount: 0,
    lsdExchangeRate: 1
  },
  ethLoading: false,
  inputValue: 0,
  outputValue: 0,
  stakeType: 'Stake' // 'Stake' || 'Unstake'
}

const stakeEthReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ETH_INFO_LOADING:
      return {
        ...state,
        ethLoading: payload
      }
    case ETH_INFO:
      return {
        ...state,
        ethInfo: payload
      }
    case STAKE_ETH_TYPE:
      return {
        ...state,
        stakeType: payload
      }
    case ETH_INPUT_CHANGE:
      return {
        ...state,
        inputValue: payload
      }
    case ETH_OUTPUT_CHANGE:
      return {
        ...state,
        outputValue: payload
      }
    default:
      return state
  }
}

export default stakeEthReducer