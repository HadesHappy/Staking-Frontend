import { ethers } from "ethers"

const formatEther = (amount) => {
  return Number(ethers.utils.formatEther(amount.toString()))
}

const parseEther = (amount) => {
  return Number(ethers.utils.parseEther(amount.toString()))
}

const formatLsd = (amount) => {
  return Number(ethers.utils.formatUnits(amount.toString(), 9))
}

const parseLsd = (amount) => {
  return Number(ethers.utils.parseUnits(amount.toString(), 9))
}

const showAddress = (address) => {
  if (address)
    return address.slice(0, 5) + '...' + address.slice(-4)
  else
    return ''
}

const showBalance = (value) => {
  if (value > 0.00001) {
    const reDot = /[.]/
    const valueString = value + ''
    const dotLocation = valueString.search(reDot)
    if (dotLocation === -1)
      return value
    else {
      return valueString.slice(0, dotLocation + 3)
    }
  }
  else
    return '0'
}

const showRate = (rate) => {
  if (rate > 0.00000001) {
    const reDot = /[.]/
    const rateString = rate + ''
    const dotLocation = rateString.search(reDot)
    if (dotLocation === -1)
      return rate
    else {
      return rateString.slice(0, dotLocation + 7)
    }
  }
  else
    return 0
}

export {
  showAddress,
  showBalance,
  showRate,
  formatEther,
  parseEther,
  formatLsd,
  parseLsd
}