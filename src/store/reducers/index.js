import { combineReducers } from 'redux'
import stakeEthReducer from './stakeEth'
// import stakeLsdReducer from './stakeLsd'
// import stakeLpReducer from './stakeLp'

const reducer = combineReducers({
  stakeEthReducer,
  // stakeLsdReducer,
  // stakeLpReducer
})

export default reducer