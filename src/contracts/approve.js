import { ethers } from 'ethers'
import lsd from './abis/lsd.json'
import pair from './abis/pair.json'
import lsdStaking from './abis/lsdStaking.json'
import lpStaking from './abis/lpStaking.json'
import { rpcUrl } from '../utils/constants'

import { parseEther, parseLsd } from '../utils/helper'

const getContracts = () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

  const lsdContract = new ethers.Contract(lsd.address, lsd.abi, provider)
  const pairContract = new ethers.Contract(pair.address, pair.abi, provider)

  return { lsdContract, pairContract }
}

const getSigner = () => {
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = walletProvider.getSigner()
  return signer
}

const approveLsdToLsdStaking = async (amount) => {
  try {
    const signer = getSigner()
    const lsdContract = new ethers.Contract(lsd.address, lsd.abi, signer)

    const tx1 = await lsdContract.approve(lsdStaking.address, parseLsd(amount))
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

const approveLsdToLpStaking = async (amount) => {
  try {
    const signer = getSigner()
    const lsdContract = new ethers.Contract(lsd.address, lsd.abi, signer)

    const tx1 = await lsdContract.approve(lpStaking.address, parseLsd(amount))
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

const approveLp = async (amount) => {
  try {
    const signer = getSigner()
    const pairContract = new ethers.Contract(pair.address, pair.abi, signer)

    console.log(parseEther(amount))
    const tx1 = await pairContract.approve(lpStaking.address, parseEther(amount))

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

const getAllowance = async (address) => {
  try {
    const { lsdContract, pairContract } = getContracts()
    // Get LSD token allowance to LSD Staking Contract
    const allowanceToLsd = Number(await lsdContract.allowance(address, lsdStaking.address))

    // Get LSD token allowance to LP Staking Contract
    const allowanceToLp = Number(await lsdContract.allowance(address, lpStaking.address))

    // Get LP token allowance
    const allowanceLp = Number(await pairContract.allowance(address, lpStaking.address))

    return { allowanceToLsd, allowanceToLp, allowanceLp }
  } catch (error) {
    console.log(error)
  }
}

export { approveLsdToLsdStaking, approveLsdToLpStaking, approveLp, getAllowance }