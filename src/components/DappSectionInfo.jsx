import React, { useEffect } from 'react'
import { showRate } from '../utils/helper'
import { useSelector, useDispatch } from 'react-redux'
import { stakeEthInfo } from '../contracts/info'

const DappSectionInfo = () => {
  const dispatch = useDispatch()
  const stakeType = useSelector(state => state.stakeEthReducer.stakeType)
  const ethInfo = useSelector(state => state.stakeEthReducer.ethInfo)
  const infoLoading = useSelector(state => state.stakeEthReducer.ethLoading)

  useEffect(() => {
    dispatch(stakeEthInfo())
  }, [])

  return (
    <div className="dapp-section__info">
      <p className="dapp-section__min">
        Min deposit ETH
        {
          infoLoading ?
            <span>0 ETH</span> :
            <span>{ethInfo.minimumAmount} ETH</span>
        }
      </p>
      <div className="dapp-section__info-list">
        <ul className="dapp-section__info-item">
          <li className="dapp-section__info-item-name">Exchange rate</li>
          {
            infoLoading ?
              <li className="dapp-section__info-numbers">{stakeType === 'Stake' ? `1 ETH = 1 LS-ETH` : `1 LS-ETH = 1 ETH`}</li>
              :
              <li className="dapp-section__info-numbers">{stakeType === 'Stake' ? `1 ETH = ${showRate(1 / ethInfo.lsdExchangeRate)} LS-ETH` : `1 LS-ETH = ${showRate(ethInfo.lsdExchangeRate)} ETH`}</li>

          }
          <li className="dapp-section__info-tip">
            <button className="dapp-section__info-button">Info</button>
            <span className='dapp-section__info-tip-text'>The amount you expect to receive at the current market price. If you have VE-LSD, you will get bonus LS-ETH according to the balance of your VE-LSD.</span>
          </li>
        </ul>
        <ul className="dapp-section__info-item">
          <li className="dapp-section__info-item-name">Average Return</li>
          {
            infoLoading ?
              <li className="dapp-section__info-numbers">
                <span className="green">≈ 20%</span> APR
              </li>
              :
              <li className="dapp-section__info-numbers">
                <span className="green">≈ {ethInfo.lsdApr / 100}%</span> APR
              </li>
          }
          <li className="dapp-section__info-tip">
            <button className="dapp-section__info-button">Info</button>
            <span className='dapp-section__info-tip-text'>Annual percentage rate (APR) refers to the yearly interest provided this platform.</span>
          </li>
        </ul>
        {/* <ul className="dapp-section__info-item">
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
        </ul> */}
      </div>
    </div>
  )
}

export default DappSectionInfo;
