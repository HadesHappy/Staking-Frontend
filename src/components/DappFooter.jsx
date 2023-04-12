import React, { useEffect } from 'react'
import { showBalance } from '../utils/helper'
import { useSelector, useDispatch } from 'react-redux'
import { stakeEthInfo, stakeLsdInfo, stakeLpInfo } from '../contracts/info'
import { usePrice } from '../hooks/usePrice'

const DappFooter = () => {
  const dispatch = useDispatch()
  const ethAmount = useSelector(state => state.stakeEthReducer.ethInfo.ethAmount)
  const lsdInfo = useSelector(state => state.stakeLsdReducer.lsdInfo)
  const lpInfo = useSelector(state => state.stakeLpReducer.lpInfo)

  const { ethPrice, lsdPrice } = usePrice()

  useEffect(() => {
    dispatch(stakeEthInfo())
    dispatch(stakeLsdInfo())
    dispatch(stakeLpInfo())
  }, [])

  return (
    <footer className="dapp-footer">
      <ul className="dapp-footer__info">
        <li>
          <span>{showBalance(ethAmount)}</span> ETH staking
        </li>
        <li>
          <span>${showBalance(lsdPrice * lsdInfo.totalStaked)}</span> LSD Staked
        </li>
        {
          lpInfo.totalSupply ?
            <li>
              <span>${showBalance(lpInfo.totalStaked * lpInfo.poolEthAmount * ethPrice / (lpInfo.totalSupply))}</span> Liquidity Staked</li>
            :
            <li>
              <span>$0.00</span> Liquidity Staked
            </li>
        }
        <li>
          <span>{lpInfo.stakers + lsdInfo.stakers}</span> Stakers
        </li>
        <li>
          <span>${showBalance((lpInfo.totalRewards + lsdInfo.totalRewards) * lsdPrice)}</span> Rewards distributed
        </li>
      </ul>
      <a href="" className='dapp-footer__supported'>
        A product by LSD Labs FZCO (Dubai)
        <img src="/img/logo.svg" alt="$LSD logo smiile" />
      </a>
    </footer>
  )
}

export default DappFooter;
