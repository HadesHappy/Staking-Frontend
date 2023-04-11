import React from 'react'
import StakeEth from './StakeEth';
import StakeBlock from './StakeBlock';
import { useStakeLsdInfo } from '../hooks/useStakeLsdInfo'
import { usePersonalInfo } from '../hooks/usePersonalInfo'

const StakeTabs = ({ currentHeadTab, setIsModalVisible, setCurrentModal }) => {
  const { bonusApr, stakeApr, totalStakedLp, totalStakedLsd, totalRewardsByLP, totalRewardsByLSD } = useStakeLsdInfo()
  const { claimAmountByLp, claimAmountByLsd, earnedAmountByLp, earnedAmountByLsd, stakedLp, stakedLsd } = usePersonalInfo()

  let leftData = {
    img: ['img/coins/lseth.png'],
    coinName: 'LSD',
    coinAbbr: 'LSD',
    totalStaked: totalStakedLsd || 0,
    totalRewards: totalRewardsByLSD || 0,
    yourStakedAmount: stakedLsd,
    yourStakedBtn: 'Stake',
    lsdEarned: claimAmountByLsd,
    footer: {
      earning: `${earnedAmountByLsd}`,
      bonus: `${bonusApr}%`,
      apr: `${stakeApr}%`
    }
  }

  let rightData = {
    img: ['img/coins/lseth.png', 'img/coins/eth.png'],
    coinName: 'ETH',
    coinAbbr: 'LP',
    totalStaked: totalStakedLp || 0,
    totalRewards: totalRewardsByLP || 0,
    yourStakedAmount: stakedLp,
    yourStakedBtn: 'Stake LP',
    lsdEarned: claimAmountByLp,
    footer: {
      earning: `${earnedAmountByLp}`,
      bonus: `${bonusApr}%`,
      apr: `${stakeApr}%`
    }
  }

  return (
    <div className='stake-tabs'>
      {
        currentHeadTab === 'Stake ETH' ?
          <StakeEth setIsModalVisible={setIsModalVisible} setCurrentModal={setCurrentModal} />
          :
          null
      }

      {
        currentHeadTab === 'Stake LSD' ?
          <StakeBlock data={leftData} setIsModalVisible={setIsModalVisible} setCurrentWindow={setCurrentModal} />
          :
          null
      }

      {
        currentHeadTab === 'Stake LP' ?
          <StakeBlock data={rightData} setIsModalVisible={setIsModalVisible} setCurrentWindow={setCurrentModal} />
          :
          null
      }
    </div>
  )
}

export default StakeTabs;
