import {
  LSD_INFO,
  LSD_INFO_LOADING,
  LSD_PERSONAL_INFO,
  LSD_PERSONAL_INFO_LOADING
} from '../constants'

const initialState = {
  lsdInfo: {
    totalStaked: 0,
    totalRewards: 0,
    bonusApr: 0,
    mainApr: 0,
    bonusPeriod: 0,
    isBonusPeriod: 0,
    stakers: 0
  },
  lsdInfoLoading: false,
  personalInfo: {
    stakedAmount: 0,
    lsdEarned: 0,
    earning: 0,
  },
  personalInfoLoading: false
}

const stakeLsdReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LSD_INFO:
      return {
        ...state,
        lsdInfo: payload
      }
    case LSD_INFO_LOADING:
      return {
        ...state,
        lsdInfoLoading: payload
      }
    case LSD_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: payload
      }
    case LSD_PERSONAL_INFO_LOADING:
      return {
        ...state,
        personalInfoLoading: payload
      }
    default:
      return state
  }
}

export default stakeLsdReducer