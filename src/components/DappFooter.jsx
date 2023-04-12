import React, { useEffect } from 'react'
import { showBalance } from '../utils/helper'
import { useSelector, useDispatch } from 'react-redux'
import { stakeEthInfo, stakeLsdInfo } from '../contracts/info'
import { usePrice } from '../hooks/usePrice'

const DappFooter = () => {
  const dispatch = useDispatch()
  const ethAmount = useSelector(state => state.stakeEthReducer.ethInfo.ethAmount)
  const lsdAmount = useSelector(state => state.stakeLsdReducer.lsdInfo.totalStaked)
  const lpInfo = useSelector(state => state.stakeLpReducer.lpInfo)

  const { ethPrice, lsdPrice } = usePrice()

  useEffect(() => {
    dispatch(stakeEthInfo())
    dispatch(stakeLsdInfo())
  }, [])

  return (
    <footer className="dapp-footer">
      <ul className="dapp-footer__info">
        <li>
          <span>{showBalance(ethAmount)}</span> ETH staking
        </li>
        <li>
          <span>${showBalance(lsdPrice * lsdAmount)}</span> LSD Staked
        </li>
        {
          lpInfo.totalSupply ?
            <li>
              <span>${showBalance(lpInfo.totalStaked * lpInfo.poolEthAmount * ethPrice / (lpInfo.totalSupply || 1))}</span> Liquidity Staked</li>
            :
            <li>
              <span>$0.00</span> Liquidity Staked

            </li>
        }
        <li>
          <span>00</span> Stakers
        </li>
        {/* <li>
          <span>$0</span> Rewards distributed
        </li> */}
      </ul>
      <a href="" className='dapp-footer__supported'>
        A product by LSD Labs FZCO (Dubai)
        <img src="/img/logo.svg" alt="$LSD logo smiile" />
      </a>
    </footer>
  )
}

export default DappFooter;
