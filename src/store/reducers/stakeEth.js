import {
  STAKE_ETH_TYPE,
  ETH_INPUT_CHANGE,
  ETH_OUTPUT_CHANGE
} from '../constants'

const initialState = {
  inputValue: 0,
  outputValue: 0,
  stakeType: 'Stake' // 'Stake' || 'Unstake'
}

const stakeEthReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
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