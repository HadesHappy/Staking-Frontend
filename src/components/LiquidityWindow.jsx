import React, { useState, useEffect } from 'react'
import ButtonLoader from './ButtonLoader';
import { useBalance } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { lsdTokenAddress } from '../utils/constants'
import { showBalance } from '../utils/helper'
import { getLSDTokenForLPAllowance, approveLsdToLpStaking } from '../contracts/approve'
import { formatLsd } from '../utils/helper'
import { toast } from 'react-hot-toast'
import { addLiquidity } from '../contracts/lpStaking'
import { useAddress } from '@thirdweb-dev/react'
import { useDispatch } from 'react-redux'
import { stakeLpInfo, getPersonalLpInfo } from '../contracts/info'

const EthBalance = () => {
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS)
  return (
    <p>
      Balance: <span>{showBalance(Number(data?.displayValue)) || 0} ETH</span>
    </p>
  )
}

const LsdBalance = () => {
  const { data, isLoading } = useBalance(lsdTokenAddress)
  return (
    <p>
      Balance: <span>{showBalance(Number(data?.displayValue)) || 0}</span>
    </p>
  )
}

const LiquidityWindow = ({ setIsModalVisible }) => {
  const address = useAddress()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [amount1, setAmount1] = useState()
  const [amount2, setAmount2] = useState()
  const [isApproved, setIsApproved] = useState(false)
  const [allowance, setAllowance] = useState()

  const getAllowance = async () => {
    const lsdAllowance = await getLSDTokenForLPAllowance(address)
    setAllowance(lsdAllowance)
    if (formatLsd(lsdAllowance) < amount2)
      setIsApproved(false)
    else
      setIsApproved(true)
  }

  useEffect(() => {
    getAllowance()
  }, [])

  const handleEthChange = (e) => {
    setAmount1(e.target.value)
  }

  const handleLsdChange = (e) => {
    setAmount2(e.target.value)
    if (formatLsd(allowance) < e.target.value)
      setIsApproved(false)
    else
      setIsApproved(true)
  }

  const handleConfirmClick = async () => {
    try {
      if (amount1 > 0 && amount2 > 0) {
        setLoading(true)
        const response = await addLiquidity(amount1, amount2)
        setLoading(false)
        if (response.status === 'Success') {
          toast.success('Succeed.')
          dispatch(stakeLpInfo())
          dispatch(getPersonalLpInfo(address))
          setIsModalVisible(false)
        } else {
          if (response.status === 'Error')
            toast.error(`${response.status}: ${response.error}.`)
          else
            toast.error('Transaction failed by unknown reason.')
        }
      } else {
        if (amount1 === '0')
          toast.error('Error: Invalid Input')
        else
          toast.error('Error: Insufficient Balance')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error: Transaction reverted or unknown error occured.')
    }
  }

  const handleApproveClick = async () => {
    try {
      setLoading(true)
      const response = await approveLsdToLpStaking(amount2)
      setLoading(false)
      if (response.status === 'Success') {
        toast.success('Succeed.')
        getAllowance()
      } else {
        if (response.status === 'Error')
          toast.error(`${response.status}: ${response.error}.`)
        else
          toast.error('Transaction failed by unknown reason.')
      }
    } catch (error) {
      console.log(error)
      getAllowance()
    }
  }

  return (
    <div className='stake-window'>
      <header className='stake-window__header'>
        <h2 className='stake-window__title'>Add Liquidity</h2>
        <button className='stake-window__close' onClick={() => setIsModalVisible(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>
      <div className='stake-window__wrapper'>
        <form className='stake-window__form'>
          <div className='stake-window__form-wrapper'>
            <label htmlFor="stake-eth-input">Stake ETH</label>
            <EthBalance />
            <input type="number" placeholder='Eth amount' id='stake-eth-input' value={amount1} onChange={handleEthChange} />
          </div>
          <div className='stake-window__form-wrapper'>
            <label htmlFor="stake-lsd-input">Stake LSD</label>
            <LsdBalance />
            <input type="number" placeholder='Lsd amount' id='stake-lsd-input' value={amount2} onChange={handleLsdChange} />
          </div>
          <footer className='stake-window__footer'>
            <button type='button' className='gray' onClick={() => setIsModalVisible(false)}>Cancel</button>
            {
              isApproved ?
                <button type='button' className='stake-window__footer-confirm purple' onClick={handleConfirmClick}>
                  {loading && <ButtonLoader />}
                  Confirm
                </button>
                :
                <button type='button' className='stake-window__footer-confirm purple' onClick={handleApproveClick}>
                  {loading && <ButtonLoader />}
                  Approve
                </button>
            }
          </footer>
        </form>
      </div>
    </div>
  )
}

export default LiquidityWindow;
