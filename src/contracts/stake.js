import { ethers } from 'ethers'
import staking from './abis/staking.json'
import { parseLsd, parseEther } from '../utils/helper'

const getSigner = () => {
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = walletProvider.getSigner()
  return signer
}

const stakeLsd = async (amount) => {
  try {
    const signer = getSigner()
    const stakingContract = new ethers.Contract(staking.address, staking.abi, signer)
    const tx1 = await stakingContract.stakeLSD(parseLsd(amount))
    const receipt = await tx1.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: receipt
      }
  } catch (error) {
    console.log(error)
  }
}

const unstakeLsd = async (amount) => {
  try {
    const signer = getSigner()
    const stakingContract = new ethers.Contract(staking.address, staking.abi, signer)
    const tx1 = await stakingContract.unstakeLSD(parseLsd(amount))
    const receipt = await tx1.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: receipt
      }
  } catch (error) {
    console.log(error)
  }
}

const claimByLsd = async () => {
  try {
    const signer = getSigner()
    const stakingContract = new ethers.Contract(staking.address, staking.abi, signer)
    const tx1 = await stakingContract.claimByLSD()
    const receipt = await tx1.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: receipt
      }
  } catch (error) {
    console.log(error)
  }
}

const stakeLp = async (amount) => {
  try {
    const signer = getSigner()
    const stakingContract = new ethers.Contract(staking.address, staking.abi, signer)
    const tx1 = await stakingContract.stakeLP(parseEther(amount))
    const receipt = await tx1.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: receipt
      }
  } catch (error) {
    console.log(error)
  }
}

const unstakeLp = async (amount) => {
  try {
    const signer = getSigner()
    const stakingContract = new ethers.Contract(staking.address, staking.abi, signer)
    const tx1 = await stakingContract.removeLP(parseEther(amount))
    const receipt = await tx1.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: receipt
      }
  } catch (error) {
    console.log(error)
  }
}

const claimByLp = async () => {
  try {
    const signer = getSigner()
    const stakingContract = new ethers.Contract(staking.address, staking.abi, signer)
    const tx1 = await stakingContract.claimByLP()
    const receipt = await tx1.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: receipt
      }
  } catch (error) {
    console.log(error)
  }
}

export { stakeLsd, unstakeLsd, claimByLsd, stakeLp, unstakeLp, claimByLp }