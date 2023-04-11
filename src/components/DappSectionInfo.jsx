import React from 'react'
import { useStakeEthInfo } from '../hooks/useStakeEthInfo'
import { showRate } from '../utils/helper'
import { useSelector } from 'react-redux'

const DappSectionInfo = () => {
  const stakeType = useSelector(state => state.stakeEthReducer.stakeType)
  const { apr, minimum, exchangeRate } = useStakeEthInfo()

  return (
    <div className="dapp-section__info">
      <p className="dapp-section__min">
        Min deposit ETH
        <span>{minimum} ETH</span>
      </p>
      <div className="dapp-section__info-list">
        <ul className="dapp-section__info-item">
          <li className="dapp-section__info-item-name">Exchange rate</li>
          <li className="dapp-section__info-numbers">{stakeType === 'Stake' ? `1 ETH = ${showRate(1 / exchangeRate)} LS-ETH` : `1 LS-ETH = ${showRate(exchangeRate)} ETH`}</li>
          <li className="dapp-section__info-tip">
            <button className="dapp-section__info-button">Info</button>
            <span className='dapp-section__info-tip-text'>The amount you expect to receive at the current market price. If you have VE-LSD, you will get bonus LS-ETH according to the balance of your VE-LSD.</span>
          </li>
        </ul>
        <ul className="dapp-section__info-item">
          <li className="dapp-section__info-item-name">Average Return</li>
          <li className="dapp-section__info-numbers">
            <span className="green">≈ {apr / 100}%</span> APR
          </li>
          <li className="dapp-section__info-tip">
            <button className="dapp-section__info-button">Info</button>
            <span className='dapp-section__info-tip-text'>Annual percentage rate (APR) refers to the yearly interest provided this platform.</span>
          </li>
        </ul>
        <ul className="dapp-section__info-item">
          <li className="dapp-section__info-item-name">Bonus APR</li>
          <li className="dapp-section__info-numbers">
            <span className="green">≈ 10.10%</span> APR
          </li>
          <li className="dapp-section__info-tip">
            <button className="dapp-section__info-button">Info</button>
            <span className='dapp-section__info-tip-text'>Annual percentage rate (APR) refers to the yearly interest provided this platform.</span>
          </li>
        </ul>
        <ul className='dapp-section__info-item'>
          <li className='dapp-section__info-item-name'>Bonus is Active now</li>
          <li className='dapp-section__info-tip'>1 day 15 hours 14 minutes left</li>
          <li className='dapp-section__info-progress'></li>
        </ul>
      </div>
    </div>
  )
}

export default DappSectionInfo;
