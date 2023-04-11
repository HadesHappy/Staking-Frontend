import { useState, useEffect } from 'react'
import { getPersonalInfo } from '../contracts/info'
import { useAddress } from '@thirdweb-dev/react'

export const usePersonalInfo = () => {
  const address = useAddress()

  const [claimAmountByLp, setClaimAmountByLp] = useState()
  const [claimAmountByLsd, setClaimAmountByLsd] = useState()
  const [earnedAmountByLp, setEarnedAmountByLp] = useState()
  const [earnedAmountByLsd, setEarnedAmountByLsd] = useState()
  const [stakedLp, setStakedLp] = useState()
  const [stakedLsd, setStakedLsd] = useState()

  const getInfos = async () => {
    const { claimAmountByLP, claimAmountByLSD, earnedByLP, earnedByLSD, stakedLP, stakedLsd } = await getPersonalInfo(address)

    setClaimAmountByLp(claimAmountByLP)
    setClaimAmountByLsd(claimAmountByLSD)
    setEarnedAmountByLp(earnedByLP)
    setEarnedAmountByLsd(earnedByLSD)
    setStakedLp(stakedLP)
    setStakedLsd(stakedLsd)
  }

  useEffect(() => {
    if (address)
      getInfos()
    else {
      setClaimAmountByLp(0)
      setClaimAmountByLsd(0)
      setEarnedAmountByLp(0)
      setEarnedAmountByLsd(0)
      setStakedLp(0)
      setStakedLsd(0)
    }
  }, [address])

  return { claimAmountByLp, claimAmountByLsd, earnedAmountByLp, earnedAmountByLsd, stakedLp, stakedLsd }
}