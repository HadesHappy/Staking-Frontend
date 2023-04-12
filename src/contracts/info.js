import { ethers } from 'ethers'
import { rpcUrl, lsdTokenVaultAddress } from '../utils/constants'
import updateBalance from './abis/updateBalance.json'
import owner from './abis/owner.json'
import lsEth from './abis/lseth.json'
import lsdStaking from './abis/lsdStaking.json'
import lpStaking from './abis/lpStaking.json'
import lsdToken from './abis/lsd.json'
import pairToken from './abis/pair.json'

import { formatEther, formatLsd } from '../utils/helper'

import {
  ETH_INFO,
  LSD_INFO,
  LSD_INFO_LOADING,
  LSD_PERSONAL_INFO,
  LSD_PERSONAL_INFO_LOADING,
  LP_INFO,
  LP_INFO_LOADING,
  LP_PERSONAL_INFO,
  LP_PERSONAL_INFO_LOADING,
  ETH_INFO_LOADING
} from '../store/constants'

const getContracts = () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

  const balanceContract = new ethers.Contract(updateBalance.address, updateBalance.abi, provider)
  const lsEthContract = new ethers.Contract(lsEth.address, lsEth.abi, provider)
  const ownerContract = new ethers.Contract(owner.address, owner.abi, provider)
  const lsdStakingContract = new ethers.Contract(lsdStaking.address, lsdStaking.abi, provider)
  const lpStakingContract = new ethers.Contract(lpStaking.address, lpStaking.abi, provider)
  const lsdTokenContract = new ethers.Contract(lsdToken.address, lsdToken.abit, provider)
  const pairTokenContract = new ethers.Contract(pairToken.address, pairToken.abi, provider)

  return { balanceContract, lsEthContract, ownerContract, lsdStakingContract, lpStakingContract, lsdTokenContract, pairTokenContract }
}

const stakeEthInfo = () => async dispatch => {
  // Get contracts
  const { ownerContract, lsEthContract, balanceContract } = getContracts()
  try {
    dispatch({ type: ETH_INFO_LOADING, payload: true })
    // Get Apr
    const lsdApr = Number(await ownerContract.getApy())

    // Get minimum deposit amount
    const minimumAmount = formatEther(await ownerContract.getMinimumDepositAmount())

    // Get Staked ETH Amount
    const ethAmount = formatEther(await balanceContract.getVirtualETHBalance())

    // Get exchange rate
    const lsdExchangeRate = formatEther(await lsEthContract.getExchangeRate())

    // Get Total Supply Amount
    // const lsEthTotalSupply = formatEther(await lsEthContract.totalSupply())

    dispatch({ type: ETH_INFO, payload: { lsdApr: lsdApr, minimumAmount: minimumAmount, ethAmount: ethAmount, lsdExchangeRate: lsdExchangeRate } })
    dispatch({ type: ETH_INFO_LOADING, payload: false })
    // return { lsdApr, minimumAmount, ethAmount, lsdExchangeRate, lsEthTotalSupply }

  } catch (error) {
    console.log(error)
  }
}

const stakeLsdInfo = () => async dispatch => {
  // Get contracts
  const { lsdStakingContract, lsdTokenContract } = getContracts()
  try {

    dispatch({ type: LSD_INFO_LOADING, payload: true })
    // Get Bonus Apr
    const lsdBonusApr = Number(await lsdStakingContract.getBonusApr())

    // Get Main Apr
    const lsdMainApr = Number(await lsdStakingContract.getMainApr())

    // Get Bonus Period
    const lsdBonusPeriod = Number(await lsdStakingContract.getBonusPeriod())

    // Get Total Staked LSD
    const totalLsd = formatLsd(await lsdTokenContract.balanceOf(lsdTokenVaultAddress))

    // Get Total Rewards By LSD
    const totalRewardsByLSD = formatLsd(await lsdStakingContract.getTotalRewards())

    // Get if now is bonus period
    const getBonusPeriod = Number(await lsdStakingContract.getIsBonusPeriod())

    dispatch({
      type: LSD_INFO, payload: {
        totalStaked: totalLsd,
        totalRewards: totalRewardsByLSD,
        bonusApr: lsdBonusApr,
        mainApr: lsdMainApr,
        bonusPeriod: lsdBonusPeriod,
        isBonusPeriod: getBonusPeriod,
      }
    })
    dispatch({ type: LSD_INFO_LOADING, payload: false })
    // return { lsdBonusApr, lsdMainApr, lsdBonusPeriod, totalLsd, totalRewardsByLSD, getBonusPeriod }

  } catch (error) {
    console.log(error)
  }
}

const stakeLpInfo = () => async dispatch => {
  // Get contracts
  const { lpStakingContract, pairTokenContract } = getContracts()
  try {
    dispatch({ type: LP_INFO_LOADING, payload: true })
    // Get Bonus Apr
    const lpBonusApr = Number(await lpStakingContract.getBonusApr())

    // Get Main Apr
    const lpMainApr = Number(await lpStakingContract.getMainApr())

    // Get Bonus Period
    const lpBonusPeriod = Number(await lpStakingContract.getBonusPeriod())

    // Get Total Staked LP
    const totalLp = formatEther(await pairTokenContract.balanceOf(lsdTokenVaultAddress))

    // Get Total Rewards By LP
    const totalRewardsByLP = formatLsd(await lpStakingContract.getTotalRewards())

    // Get if now is bonus period
    const getBonusPeriod = Number(await lpStakingContract.getIsBonusPeriod())

    // Get total Lp 
    const totalLpSupply = formatEther(await pairTokenContract.totalSupply())

    const { _reserve0, _reserve1, _blockTimestampLast } = await pairTokenContract.getReserves()

    const poolEthAmount = formatEther(_reserve1)
    dispatch({
      type: LP_INFO, payload: {
        totalStaked: totalLp,
        totalRewards: totalRewardsByLP,
        bonusApr: lpBonusApr,
        mainApr: lpMainApr,
        bonusPeriod: lpBonusPeriod,
        isBonusPeriod: getBonusPeriod,
        totalSupply: totalLpSupply,
        poolEthAmount: poolEthAmount,
      }
    })
    dispatch({ type: LP_INFO_LOADING, payload: false })

    // return { lpBonusApr, lpMainApr, lpBonusPeriod, totalLp, totalRewardsByLP, getBonusPeriod, totalLpSupply, poolEthAmount }

  } catch (error) {
    console.log(error)
  }
}

const getPersonalLsdInfo = (address) => async dispatch => {
  // Get contracts
  const { lsdStakingContract } = getContracts()
  try {
    dispatch({ type: LSD_PERSONAL_INFO_LOADING, payload: true })
    // Get claim amount by LSD
    const claimAmountByLSD = formatLsd(await lsdStakingContract.getClaimAmount(address))

    // Get earned amount by LSD
    const earnedByLSD = formatLsd(await lsdStakingContract.getEarnedByLSD(address))

    // Get staked LSD
    const stakedLsd = formatLsd(await lsdStakingContract.getStakedLSD(address))
    dispatch({
      type: LSD_PERSONAL_INFO, payload: {
        stakedAmount: stakedLsd,
        lsdEarned: claimAmountByLSD,
        earning: earnedByLSD,
      }
    })
    dispatch({ type: LSD_PERSONAL_INFO_LOADING, payload: false })

    // return { claimAmountByLSD, earnedByLSD, stakedLsd }

  } catch (error) {
    console.log(error)
  }
}

const getPersonalLpInfo = (address) => async dispatch => {
  // Get contracts
  const { lpStakingContract } = getContracts()
  try {
    dispatch({ type: LP_PERSONAL_INFO_LOADING, payload: true })

    // Get claim amount by LP
    const claimAmountByLP = formatLsd(await lpStakingContract.getClaimAmount(address))

    // Get earned amount by LP
    const earnedByLP = formatLsd(await lpStakingContract.getEarnedByLP(address))

    // Get staked LP
    const stakedLP = formatEther(await lpStakingContract.getStakedLP(address))

    dispatch({
      type: LP_PERSONAL_INFO, payload: {
        stakedAmount: stakedLP,
        lsdEarned: claimAmountByLP,
        earning: earnedByLP,
      }
    })
    dispatch({ type: LP_PERSONAL_INFO_LOADING, payload: false })

    // return { claimAmountByLP, earnedByLP, stakedLP }

  } catch (error) {
    console.log(error)
  }
}

export { stakeEthInfo, stakeLsdInfo, stakeLpInfo, getPersonalLsdInfo, getPersonalLpInfo }