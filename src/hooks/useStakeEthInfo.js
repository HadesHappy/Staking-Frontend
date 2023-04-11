import { useState, useEffect } from 'react'
import { stakeEthInfo } from '../contracts/info'

export const useStakeEthInfo = () => {
  const [apr, setApr] = useState(0)
  const [minimum, setMinimum] = useState(0)
  const [totalEth, setTotalEth] = useState(0)
  const [totalLsEth, setTotalLsEth] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)

  const setInfos = async () => {
    try {
      const { lsdApr, minimumAmount, ethAmount, lsdExchangeRate, lsEthTotalSupply } = await stakeEthInfo()
      
      setApr(lsdApr)
      setMinimum(minimumAmount)
      setTotalEth(ethAmount)
      setExchangeRate(lsdExchangeRate)
      setTotalLsEth(lsEthTotalSupply)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setInfos()
  }, [])

  return { apr, minimum, totalEth, totalLsEth, exchangeRate }
}