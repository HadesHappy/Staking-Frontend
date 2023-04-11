import React from 'react'
import { showBalance } from '../utils/helper'
import { useStakeEthInfo } from '../hooks/useStakeEthInfo'

const DappFooter = () => {
  const { totalEth, totalLsEth } = useStakeEthInfo()

  return (
    <footer className="dapp-footer">
      <ul className="dapp-footer__info">
        <li>
          <span>{showBalance(totalEth)}</span> ETH staking
        </li>
        <li>
          <span>{showBalance(totalLsEth)}</span> LSD Staked
        </li>
        <li>
          <span>$0.00</span> Liquidity Staked
        </li>
        <li>
          <span>00</span> Stakers
        </li>
        <li>
          <span>$0</span> Rewards distributed
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
