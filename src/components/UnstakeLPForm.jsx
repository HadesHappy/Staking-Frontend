import React, { useState, useEffect } from 'react'
import { useBalance } from '@thirdweb-dev/react'
import { unstakeLp } from '../contracts/lpStaking'
import { pairTokenAddress } from '../utils/constants'
import { toast } from 'react-hot-toast'
import ButtonLoader from './ButtonLoader'
import { useDispatch, useSelector } from 'react-redux'
import { stakeLpInfo, getPersonalLpInfo } from '../contracts/info'
import { useAddress } from '@thirdweb-dev/react'

const UnstakeLPForm = ({ setIsModalVisible }) => {
  const dispatch = useDispatch()
  const personalInfo = useSelector(state => state.stakeLpReducer.personalInfo)
  const address = useAddress()

  const { data } = useBalance(pairTokenAddress)
  const [amount, setAmount] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getPersonalLpInfo(address))
  }, [address])

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handleMaxClick = () => {
    setAmount(personalInfo.stakedAmount)
  }

  const handleUnstakeClick = async () => {
    try {
      if (amount > 0 && amount <= personalInfo.stakedAmount) {
        setLoading(true)
        const response = await unstakeLp(amount)
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
        console.log(amount)
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
  return (
    <form className='stake-window__form'>
      <div className='stake-window__form-wrapper'>
        <label htmlFor="unstake-input">LP-Token</label>
        <p>
          Balance: <span>{data?.displayValue} LP</span>
        </p>
        <input type="number" placeholder='Enter an amount' id='unstake-input' value={amount} onChange={handleChange} />
      </div>
      <div className='stake-window__total'>
        <span className='stake-window__subtitle'>Staked amount of LP token</span>
        <button type='button' className='stake-window__max-btn' onClick={handleMaxClick}>Max</button>
        <b className='stake-window__total-amount'>{personalInfo.stakedAmount}</b>
      </div>
      <footer className='stake-window__footer'>
        <button type='button' className='gray' onClick={() => setIsModalVisible(false)}>
          Cancel
        </button>
        <button type='button' className='purple' onClick={handleUnstakeClick}>
          {loading && <ButtonLoader />}
          Unstake
        </button>
      </footer>
    </form>
  )
}

export default UnstakeLPForm;
