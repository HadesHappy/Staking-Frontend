import React, { useState, useEffect } from 'react'
import { useBalance } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { showBalance, showRate } from '../utils/helper'
import { ETH_INPUT_CHANGE } from '../store/constants'
import { useDispatch, useSelector } from 'react-redux'
import DappDisplayToken from './DappDisplayToken'
import { lsEthTokenAddress } from '../utils/constants'
import { usePrice } from '../hooks/usePrice'
import { stakeEthInfo } from '../contracts/info'

const DappSectionWithdraw = ({ setIsModalVisible }) => {
  const stakeType = useSelector(state => state.stakeEthReducer.stakeType)
  const outputValue = useSelector(state => state.stakeEthReducer.outputValue)
  const ethInfo = useSelector(state => state.stakeEthReducer.ethInfo)
  const ethLoading = useSelector(state => state.stakeEthReducer.ethLoading)

  const dispatch = useDispatch()

  const { ethPrice } = usePrice()
  const [amount, setAmount] = useState()

  let tokenAddress
  if (stakeType === 'Stake')
    tokenAddress = NATIVE_TOKEN_ADDRESS
  else
    tokenAddress = lsEthTokenAddress

  let { data } = useBalance(tokenAddress)

  const handleChange = (e) => {
    setAmount(e.target.value)
    dispatch({ type: ETH_INPUT_CHANGE, payload: e.target.value })
  }

  const handleMaxClick = () => {
    setAmount(data.displayValue)
    dispatch({ type: ETH_INPUT_CHANGE, payload: data?.displayValue })
  }

  useEffect(() => {
    dispatch(stakeEthInfo())
  }, [])

  useEffect(() => {
    if (stakeType === 'Stake') {
      setAmount(outputValue * ethInfo.lsdExchangeRate)
      dispatch({ type: ETH_INPUT_CHANGE, payload: outputValue * ethInfo.lsdExchangeRate })
    } else {
      setAmount(outputValue / ethInfo.lsdExchangeRate)
      dispatch({ type: ETH_INPUT_CHANGE, payload: outputValue / ethInfo.lsdExchangeRate })
    }
  }, [outputValue, ethInfo, stakeType, dispatch])

  return (
    <div className="dapp-section__withdraw">
      <header className="dapp-section__withdraw-header">

        <p className="dapp-section__withdraw-title">{
          stakeType === 'Stake' ? 'Stake ETH' : 'Unstake LS-ETH'
        }</p>
        <p className="dapp-section__withdraw-balance">
          Balance: <span>{showBalance(data?.displayValue)} {stakeType === 'Stake' ? 'ETH' : 'LS-ETH'}</span>
        </p>
        <button className="dapp-section__withdraw-max" onClick={handleMaxClick}>Max</button>
      </header>
      <div className="dapp-section__withdraw-actions">
        <input type="text" placeholder="0,000.000000" value={amount || undefined} onChange={handleChange} />
        <div className="dapp-section__withdraw-currency">
          <button
            className="dapp-section__withdraw-currency-select currency-select"
          >
            {
              stakeType === 'Stake' ?
                <DappDisplayToken token='ETH' /> :
                <DappDisplayToken token='LS-ETH' />
            }
          </button>
        </div>
      </div>
      {
        ethLoading ?
          <p className="dapp-section__withdraw-count">${stakeType === 'Stake' ? showRate(ethPrice * amount) : showRate(ethPrice * amount * 1)}</p>
          :
          <p className="dapp-section__withdraw-count">${stakeType === 'Stake' ? showRate(ethPrice * amount) : showRate(ethPrice * amount * ethInfo?.lsdExchangeRate)}</p>
      }
    </div>
  )
}

export default DappSectionWithdraw;
