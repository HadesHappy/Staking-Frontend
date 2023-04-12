import {
  LP_INFO,
  LP_INFO_LOADING,
  LP_PERSONAL_INFO,
  LP_PERSONAL_INFO_LOADING
} from '../constants'

const initialState = {
  lpInfo: {
    totalStaked: 0,
    totalRewards: 0,
    bonusApr: 0,
    mainApr: 0,
    bonusPeriod: 0,
    isBonusPeriod: 0,
    totalSupply: 0,
    poolEthAmount: 0,
  },
  lpInfoLoading: false,
  personalInfo: {
    stakedAmount: 0,
    lsdEarned: 0,
    earning: 0,
  },
  personalInfoLoading: false
}

const stakeLpReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LP_INFO_LOADING:
      return {
        ...state,
        lpInfoLoading: payload
      }
    case LP_INFO:
      return {
        ...state,
        lpInfo: payload
      }
    case LP_PERSONAL_INFO_LOADING:
      return {
        ...state,
        personalInfoLoading: payload
      }
    case LP_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: payload
      }
    default:
      return state
  }
}

export default stakeLpReducer