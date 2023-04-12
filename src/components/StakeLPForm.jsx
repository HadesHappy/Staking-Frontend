import React, { useState, useEffect } from 'react'
import { useAddress, useBalance } from '@thirdweb-dev/react'
import { pairTokenAddress } from '../utils/constants'
import { stakeLp } from '../contracts/lpStaking'
import { approveLp, getLPTokenAllowance } from '../contracts/approve'
import { toast } from 'react-hot-toast'
import { formatEther } from '../utils/helper'
import ButtonLoader from './ButtonLoader'
import { useDispatch } from 'react-redux'
import { stakeLpInfo, getPersonalLpInfo } from '../contracts/info'

const StakeLPForm = ({ setIsModalVisible }) => {
  const dispatch = useDispatch()

  const [amount, setAmount] = useState()
  const [loading, setLoading] = useState(false)
  const [allowance, setAllowance] = useState()
  const [isApproved, setIsApproved] = useState()

  const address = useAddress()
  const { data } = useBalance(pairTokenAddress)

  const getTokenAllowance = async () => {
    try {
      const lpAllowance = await getLPTokenAllowance(address)
      console.log('lpAllowance: ', lpAllowance)
      setAllowance(lpAllowance)
      if (formatEther(lpAllowance) < amount)
        setIsApproved(false)
      else
        setIsApproved(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTokenAllowance()
  }, [])

  const handleApproveClick = async () => {
    try {
      setLoading(true)
      const response = await approveLp(amount)
      setLoading(false)
      if (response.status === 'Success') {
        toast.success('Succeed.')
        getTokenAllowance()
      } else {
        if (response.status === 'Error')
          toast.error(`${response.status}: ${response.error}.`)
        else
          toast.error('Transaction failed by unknown reason.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleConfirmClick = async () => {
    try {
      if (amount > 0 && amount <= Number(data.displayValue)) {
        setLoading(true)
        const response = await stakeLp(amount)
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
        if (amount === '0')
          toast.error('Error: Invalid Input')
        else
          toast.error('Error: Insufficient Balance')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error: Transaction reverted or unknown error occured.')
    }
  }

  const handleMaxClick = () => {
    if (data && data?.displayValue) {
      setAmount(data.displayValue)
      if (formatEther(allowance) < data.displayValue)
        setIsApproved(false)
      else
        setIsApproved(true)
    }
    else
      setAmount(0)
  }

  const handleChange = (e) => {
    setAmount(e.target.value)
    if (formatEther(allowance) < e.target.value)
      setIsApproved(false)
    else
      setIsApproved(true)
  }

  return (
    <form className='stake-window__form'>
      <div className='stake-window__form-wrapper'>
        <label htmlFor="stake-eth-input">Stake</label>
        <p>
          Balance: <span>{data?.displayValue} LP</span>
        </p>
        <input type="number" placeholder='Enter an amount' id='stake-eth-input' value={amount} onChange={handleChange} />
      </div>
      <button type='button' className='stake-window__max-btn stake-window__max-btn--alone' onClick={handleMaxClick}>Max</button>

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
  )
}

export default StakeLPForm;
