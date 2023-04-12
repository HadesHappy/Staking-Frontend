import { ethers } from 'ethers'
import { parseLsd, parseEther } from '../utils/helper'
import lpStaking from './abis/lpStaking.json'

const getSigner = () => {
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = walletProvider.getSigner()
  return signer
}

const stakeLp = async (amount) => {
  try {
    const signer = getSigner()
    const stakingContract = new ethers.Contract(lpStaking.address, lpStaking.abi, signer)
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
    const stakingContract = new ethers.Contract(lpStaking.address, lpStaking.abi, signer)
    const tx1 = await stakingContract.unstakeLP(parseEther(amount))
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

const addLiquidity = async (amount1, amount2) => {
  try {
    const signer = getSigner()

    const stakingContract = new ethers.Contract(lpStaking.address, lpStaking.abi, signer)

    const tx1 = await stakingContract.addLiquidity(parseLsd(amount2), {
      value: parseEther(amount1)
    });

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
  }
  catch (error) {
    console.log(error)
    return {
      status: 'Error',
      error: error.code
    }
  }
}

const claimByLp = async () => {
  try {
    const signer = getSigner()
    const stakingContract = new ethers.Contract(lpStaking.address, lpStaking.abi, signer)
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

export { stakeLp, unstakeLp, claimByLp, addLiquidity }
