import { ethers } from 'ethers'
import { parseLsd, parseEther } from '../utils/helper'
import lsdStaking from './abis/lsdStaking.json'

const getSigner = () => {
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = walletProvider.getSigner()
  return signer
}

const stakeLsd = async (amount) => {
  try {
    const signer = getSigner()
    const stakingContract = new ethers.Contract(lsdStaking.address, lsdStaking.abi, signer)
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
    const stakingContract = new ethers.Contract(lsdStaking.address, lsdStaking.abi, signer)
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
    const stakingContract = new ethers.Contract(lsdStaking.address, lsdStaking.abi, signer)
    const tx1 = await stakingContract.claim()
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

export { stakeLsd, unstakeLsd, claimByLsd }
