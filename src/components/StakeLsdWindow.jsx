import React, { useEffect, useState } from 'react'
import { lsdTokenAddress, veLsdTokenAddress } from '../utils/constants'
import { useBalance, useAddress } from '@thirdweb-dev/react'
import { showBalance, formatLsd } from '../utils/helper'
import { usePrice } from '../hooks/usePrice'
import { stakeLsd, unstakeLsd } from '../contracts/lsdStaking'
import { getLSDTokenAllowance, approveLsdToLsdStaking } from '../contracts/approve'
import { toast } from 'react-hot-toast'
import ButtonLoader from './ButtonLoader'
import { stakeLsdInfo, getPersonalLsdInfo } from '../contracts/info'
import { useDispatch } from 'react-redux'

const StakeLsdWindow = ({ setIsModalVisible }) => {
  const dispatch = useDispatch()
  const tabs = ['Stake', 'Unstake'];

  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('Stake')
  const [allowance, setAllowance] = useState()
  const [isApproved, setIsApproved] = useState()
  const [amount, setAmount] = useState()

  const { lsdPrice } = usePrice()
  const address = useAddress()

  const getTokenAllowance = async () => {
    try {
      const lsdAllowance = await getLSDTokenAllowance(address)
      setAllowance(lsdAllowance)

      if (formatLsd(lsdAllowance) < amount)
        setIsApproved(false)
      else
        setIsApproved(true)
    } catch (error) {
      console.log(error)
    }
  }

  let tokenAddress
  if (activeTab === 'Stake')
    tokenAddress = lsdTokenAddress
  else {
    tokenAddress = veLsdTokenAddress
  }

  const { data } = useBalance(tokenAddress)

  const handleApproveClick = async () => {
    try {
      setLoading(true)
      const response = await approveLsdToLsdStaking(amount)
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
      if (activeTab === 'Stake') {
        if (amount > 0 && amount <= Number(data.displayValue)) {
          setLoading(true)
          const response = await stakeLsd(amount)
          setLoading(false)
          if (response.status === 'Success') {
            toast.success('Succeed.')
            dispatch(stakeLsdInfo())
            dispatch(getPersonalLsdInfo(address))
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
      } else {
        if (amount > 0 && amount <= Number(data.displayValue)) {
          setLoading(true)
          const response = await unstakeLsd(amount)
          setLoading(false)
          if (response.status === 'Success') {
            toast.success('Succeed.')
            dispatch(stakeLsdInfo())
            dispatch(getPersonalLsdInfo(address))
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
      }
    } catch (error) {
      console.log(error)
      toast.error('Error: Transaction reverted or Unknown error occured.')
    }
  }

  const handleMaxClick = () => {
    if (data && data?.displayValue)
      setAmount(data.displayValue)
    else
      setAmount(0)
  }

  const handleChange = (e) => {
    setAmount(e.target.value)
    if (formatLsd(allowance) < e.target.value)
      setIsApproved(false)
    else
      setIsApproved(true)
  }

  useEffect(() => {
    getTokenAllowance()
  }, [])

  return (
    <div className='stake-window'>
      <header className='stake-window__header'>
        <h2 className='stake-window__title'>{activeTab === 'Stake' ? 'Stake LSD' : 'Unstake LSD'}</h2>
        <button className='stake-window__close' onClick={() => setIsModalVisible(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>
      <div className='stake-window__wrapper'>
        <ul className={`stake-window__tabs ${activeTab === 'Unstake' && `stake-window__tabs--unstake`}`}>
          {
            tabs.map((tab) => <li className={`stake-window__tab ${activeTab === tab && 'active'}`} key={tab} onClick={() => setActiveTab(tab)}>{tab}</li>)
          }
        </ul>
        <form className='stake-window__form'>
          <div className='stake-window__form-wrapper'>
            <label htmlFor="stake-input">{activeTab}</label>
            <p>
              Balance: <span>{data ? showBalance(data?.displayValue) : 0}{activeTab === 'Stake' ? ' LSD' : ' VE-LSD'}</span>
            </p>
            <input type="number" placeholder='Enter an amount' id='stake-input' value={amount} onChange={handleChange} />
          </div>
          <div className='stake-window__total'>
            <span className='stake-window__subtitle'>Total</span>
            <button type='button' className='stake-window__max-btn' onClick={handleMaxClick}>Max</button>
            <b className='stake-window__total-amount'>=${showBalance(lsdPrice * amount)}</b>
          </div>
          <footer className='stake-window__footer'>
            <button type='button' className='gray' onClick={() => setIsModalVisible(false)}>Cancel</button>
            {
              (isApproved && activeTab === 'Stake') || activeTab === 'Unstake' ?
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

export default StakeLsdWindow;
