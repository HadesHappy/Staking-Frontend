import React, { useState, useEffect } from 'react'
import DappSectionInfo from './DappSectionInfo'
import { useBalance } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { showBalance, showRate } from '../utils/helper'
import { ETH_INPUT_CHANGE, ETH_OUTPUT_CHANGE } from '../store/constants'
import { useDispatch, useSelector } from 'react-redux'
import DappDisplayToken from './DappDisplayToken'
import { lsEthTokenAddress } from '../utils/constants'
import { usePrice } from '../hooks/usePrice'
import { stakeEthInfo } from '../contracts/info'

const DappSectionReceive = ({ setIsModalVisible }) => {
  const stakeType = useSelector(state => state.stakeEthReducer.stakeType)
  const inputValue = useSelector(state => state.stakeEthReducer.inputValue)
  const ethInfo = useSelector(state => state.stakeEthReducer.ethInfo)
  const ethLoading = useSelector(state => state.stakeEthReducer.ethLoading)

  const dispatch = useDispatch()

  const { ethPrice } = usePrice()
  const [amount, setAmount] = useState()

  let tokenAddress
  if (stakeType === 'Stake')
    tokenAddress = lsEthTokenAddress
  else
    tokenAddress = NATIVE_TOKEN_ADDRESS

  const { data } = useBalance(tokenAddress)

  const handleChange = (e) => {
    setAmount(e.target.value)
    dispatch({ type: ETH_OUTPUT_CHANGE, payload: e.target.value })
  }

  useEffect(() => {
    dispatch(stakeEthInfo())
  }, [])

  useEffect(() => {
    if (stakeType === 'Stake') {
      setAmount(inputValue / ethInfo.lsdExchangeRate)
    } else {
      setAmount(inputValue * ethInfo.lsdExchangeRate)
    }
  }, [inputValue, ethInfo.lsdExchangeRate, stakeType])

  return (
    <div className="dapp-section__receive">
      {/* <button className="dapp-section__receive-swap">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 4V20M17 20L13 16M17 20L21 16M7 20V4M7 4L3 8M7 4L11 8" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button> */}
      <header className="dapp-section__receive-header">
        <p className="dapp-section__receive-title">Receive {stakeType === 'Stake' ? 'LS-ETH' : 'ETH'}</p>
        <p className="dapp-section__receive-balance">
          Balance: <span>{showBalance(data?.displayValue)} {stakeType === 'Stake' ? 'LS-ETH' : 'ETH'}</span>
        </p>
      </header>
      <div className="dapp-section__receive-actions">
        <input type="text" placeholder="0,000.000000" value={amount || 0} onChange={handleChange} />
        <div className="dapp-section__receive-currency">
          <button
            className="dapp-section__receive-currency-select currency-select"
          >
            {
              stakeType === 'Stake' ?
                <DappDisplayToken token='LS-ETH' /> :
                <DappDisplayToken token='ETH' />
            }
          </button>
        </div>
      </div>
      {
        ethLoading ?
          <p className="dapp-section__receive-count">${stakeType === 'UnStake' ? showRate(ethPrice * amount) : showRate(ethPrice * amount * 1)}</p>
          :
          <p className="dapp-section__receive-count">${stakeType === 'UnStake' ? showRate(ethPrice * amount) : showRate(ethPrice * amount * ethInfo.lsdExchangeRate)}</p>
      }
      <DappSectionInfo />
    </div>
  )
}

export default DappSectionReceive
