import React, { useState } from 'react'
import DappSectionHeader from './DappSectionHeader'
import DappSectionReceive from './DappSectionReceive'
import DappSectionWithdraw from './DappSectionWithdraw'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useAddress } from '@thirdweb-dev/react'
import { deposit, withdraw } from '../contracts/deposit'
import { useBalance } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { lsEthTokenAddress } from '../utils/constants'
import ButtonLoader from './ButtonLoader'
import { stakeEthInfo } from '../contracts/info'

const StakeEth = ({ setIsModalVisible, setCurrentModal }) => {
  const dispatch = useDispatch()
  const stakeType = useSelector(state => state.stakeEthReducer.stakeType)
  const inputValue = useSelector(state => state.stakeEthReducer.inputValue)
  const ethInfo = useSelector(state => state.stakeEthReducer.ethInfo)

  let tokenAddress
  if (stakeType === 'Stake')
    tokenAddress = NATIVE_TOKEN_ADDRESS
  else
    tokenAddress = lsEthTokenAddress

  let { data } = useBalance(tokenAddress)

  const address = useAddress()

  const [loading, setLoading] = useState(false);

  const handleStake = async () => {
    if (address) {
      if (inputValue !== 0 && inputValue <= data.displayValue) {
        if (inputValue >= ethInfo.minimumAmount) {
          setLoading(true)
          const response = await deposit(inputValue)
          setLoading(false)

          if (response.status === 'Success') {
            toast.success('Succeed')
            dispatch(stakeEthInfo())
          } else {
            if (response.status === 'Error')
              toast.error(`${response.status}: ${response.error}.`)
            else
              toast.error('Transaction failed by unknown reason.')
          }
        } else {
          toast.error(`Input Value Error. your input is less than minimum deposit amount.`)
        }
      } else {
        if (inputValue === 0)
          toast.error('Invalid Input Value')
        else
          toast.error('Insufficient Balance')
      }
    } else {
      toast.error('Please connect your wallet.')
    }
  }

  const handleUnstake = async () => {
    if (address) {
      if (inputValue !== 0 && inputValue <= data.displayValue) {
        setLoading(true)
        const response = await withdraw(inputValue)
        setLoading(false)
        if (response.status === 'Success') {
          toast.success('Succeed')
          dispatch(stakeEthInfo())
        } else {
          if (response.status === 'Error')
            toast.error(`${response.status}: ${response.error}.`)
          else
            toast.error('Transaction failed by unknown reason.')
        }
      } else {
        if (inputValue === 0)
          toast.error('Invalid Input Value.')
        else
          toast.error('Insufficient Balance')
      }
    } else {
      toast.error('Please connect your wallet.')
    }
  }

  return (
    <div className='dapp-section__actions'>
      <div className="dapp-section__actions-wrapper">
        <DappSectionHeader setIsModalVisible={setIsModalVisible} setCurrentModal={setCurrentModal} />
        <DappSectionWithdraw setIsModalVisible={setIsModalVisible} />
        <DappSectionReceive setIsModalVisible={setIsModalVisible} />
      </div>
      {
        stakeType === 'Stake' ?
          <button type="button" className="dapp-section__submit" onClick={handleStake}>
            {loading === true && <ButtonLoader />}
            Stake now
          </button>
          :
          <button type="button" className="dapp-section__submit" onClick={handleUnstake}>
            {loading === true && <ButtonLoader />}
            Unstake now
          </button>
      }
    </div>
  )
}

export default StakeEth;
