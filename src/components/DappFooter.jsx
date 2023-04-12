import React from 'react'
import { showBalance } from '../utils/helper'

const DappFooter = () => {

  return (
    <footer className="dapp-footer">
      <ul className="dapp-footer__info">
        <li>
          <span>{showBalance(0)}</span> ETH staking
        </li>
        <li>
          <span>{showBalance(0)}</span> LSD Staked
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
