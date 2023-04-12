import '../pages/dapp/dapp.css';
import { showTvl } from '../utils/helper';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { stakeEthInfo, stakeLsdInfo, stakeLpInfo } from '../contracts/info'
import { usePrice } from '../hooks/usePrice'

const Tvl = () => {
  const dispatch = useDispatch()
  const ethAmount = useSelector(state => state.stakeEthReducer.ethInfo.ethAmount)
  const lsdAmount = useSelector(state => state.stakeLsdReducer.lsdInfo.totalStaked)
  const lpInfo = useSelector(state => state.stakeLpReducer.lpInfo)

  const { ethPrice, lsdPrice } = usePrice()

  useEffect(() => {
    dispatch(stakeEthInfo())
    dispatch(stakeLsdInfo())
    dispatch(stakeLpInfo())
  }, [])

  return (
    <>
      {
        lpInfo.totalSupply === 0 ?
          <h1 className="dapp-section__title">
            <span>TVL</span>
            0
          </h1>
          :
          <h1 className="dapp-section__title">
            <span>TVL</span>$
            {showTvl(ethAmount * ethPrice + lsdAmount * lsdPrice + lpInfo.totalStaked * lpInfo.poolEthAmount * ethPrice / (lpInfo.totalSupply))}
          </h1>
      }
    </>
  )
}

export default Tvl