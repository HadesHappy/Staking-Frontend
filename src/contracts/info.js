import { ethers } from 'ethers'
import { rpcUrl } from '../utils/constants'
import updateBalance from './abis/updateBalance.json'
import owner from './abis/owner.json'
import lsEth from './abis/lseth.json'
import staking from './abis/staking.json'

import { formatEther, formatLsd } from '../utils/helper'

const getContracts = () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

  const balanceContract = new ethers.Contract(updateBalance.address, updateBalance.abi, provider)
  const lsEthContract = new ethers.Contract(lsEth.address, lsEth.abi, provider)
  const ownerContract = new ethers.Contract(owner.address, owner.abi, provider)
  const stakingContract = new ethers.Contract(staking.address, staking.abi, provider)

  return { balanceContract, lsEthContract, ownerContract, stakingContract }
}

const stakeEthInfo = async () => {
  // Get contracts
  const { ownerContract, lsEthContract, balanceContract } = getContracts()
  try {
    // Get Apr
    const lsdApr = Number(await ownerContract.getApy())

    // Get minimum deposit amount
    const minimumAmount = formatEther(await ownerContract.getMinimumDepositAmount())

    // Get Staked ETH Amount
    const ethAmount = formatEther(await balanceContract.getVirtualETHBalance())

    // Get exchange rate
    const lsdExchangeRate = formatEther(await lsEthContract.getExchangeRate())

    // Get Total Supply Amount
    const lsEthTotalSupply = formatEther(await lsEthContract.totalSupply())

    return { lsdApr, minimumAmount, ethAmount, lsdExchangeRate, lsEthTotalSupply }

  } catch (error) {
    console.log(error)
  }
}

const stakeLsdInfo = async () => {
  // Get contracts
  const { ownerContract, stakingContract } = getContracts()
  try {
    // Get Bonus Apr
    const lsdBonusApr = Number(await ownerContract.getBonusApr())

    // Get Main Apr
    const lsdStakeApr = Number(await ownerContract.getStakeApr())

    // Get Total Staked LSD
    const totalLsd = formatLsd(await stakingContract.getTotalLSD())

    // Get Total Staked LP
    const totalLp = formatEther(await stakingContract.getTotalLPTokenBalance())

    // Get Total Rewards By LSD
    const totalRewardsByLSD = formatLsd(await stakingContract.getTotalRewardsByLSD())

    // Get Total Rewards By LP
    const totalRewardsByLP = formatLsd(await stakingContract.getTotalRewardsByLP())

    return { lsdBonusApr, lsdStakeApr, totalLsd, totalLp, totalRewardsByLP, totalRewardsByLSD }

  } catch (error) {
    console.log(error)
  }
}

const getPersonalInfo = async (address) => {
  // Get contracts
  const { stakingContract } = getContracts()
  try {
    // Get claim amount by LP
    const claimAmountByLP = formatLsd(await stakingContract.getClaimAmountByLP(address))
    
    // Get claim amount by LSD
    const claimAmountByLSD = formatLsd(await stakingContract.getClaimAmountByLSD(address))

    // Get earned amount by LP
    const earnedByLP = formatLsd(await stakingContract.getEarnedByLP(address))

    // Get earned amount by LSD
    const earnedByLSD = formatLsd(await stakingContract.getEarnedByLSD(address))
  
    // Get staked LP
    const stakedLP = formatEther(await stakingContract.getStakedLP(address))

    // Get staked LSD
    const stakedLsd = formatLsd(await stakingContract.getStakedLSD(address))

    return { claimAmountByLP, claimAmountByLSD, earnedByLP, earnedByLSD, stakedLP, stakedLsd }

  } catch (error) {
    console.log(error)
  }
}

export { stakeEthInfo, stakeLsdInfo, getPersonalInfo }