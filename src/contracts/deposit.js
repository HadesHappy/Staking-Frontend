import { ethers } from 'ethers'
import depositPool from './abis/deposit.json'
import lsEth from './abis/lseth.json'

const getSigner = () => {
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = walletProvider.getSigner()
  return signer
}

const deposit = async (amount) => {
  try {
    const signer = getSigner()
    const contract = new ethers.Contract(depositPool.address, depositPool.abi, signer)

    const tx = await contract.deposit({ value: ethers.utils.parseEther(amount.toString()) })
    const receipt = await tx.wait()

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
    console.log('error: ', error.code)
    return {
      status: 'Error',
      error: error.code
    }
  }
}

const withdraw = async (amount) => {
  try {
    const signer = getSigner()
    const contract = new ethers.Contract(lsEth.address, lsEth.abi, signer)
    const tx = await contract.burn(ethers.utils.parseEther(amount.toString()))
    const receipt = await tx.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: ''
      }
  } catch (error) {
    console.log(error)
    return {
      status: 'Error',
      error: error.code
    }
  }
}

export { deposit, withdraw }