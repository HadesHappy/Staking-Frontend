import { useState, useEffect } from 'react'
import { stakeLsdInfo } from '../contracts/info'

export const useStakeLsdInfo = () => {
  const [bonusApr, setBonusApr] = useState()
  const [stakeApr, setStakeApr] = useState()
  const [totalStakedLsd, setTotalStakedLsd] = useState()
  const [totalStakedLp, setTotalStakedLp] = useState()
  const [totalRewardsByLP, setTotalRewardsByLP] = useState()
  const [totalRewardsByLSD, setTotalRewardsByLSD] = useState()

  const setInfos = async () => {
    try {
      const { lsdBonusApr, lsdStakeApr, totalLsd, totalLp, totalRewardsByLP, totalRewardsByLSD } = await stakeLsdInfo()

      setBonusApr(lsdBonusApr)
      setStakeApr(lsdStakeApr)
      setTotalStakedLp(totalLp)
      setTotalStakedLsd(totalLsd)
      setTotalRewardsByLP(totalRewardsByLP)
      setTotalRewardsByLSD(totalRewardsByLSD)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setInfos()
  }, [])

  return { bonusApr, stakeApr, totalStakedLp, totalStakedLsd, totalRewardsByLP, totalRewardsByLSD }
}
