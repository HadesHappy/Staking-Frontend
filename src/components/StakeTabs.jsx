import React from 'react'
import StakeEth from './StakeEth'
import StakeLsdBlock from './StakeLsdBlock'
import StakeLpBlock from './StakeLpBlock'

import { useStakeLsdInfo } from '../hooks/useStakeLsdInfo'
import { usePersonalInfo } from '../hooks/usePersonalInfo'

const StakeTabs = ({ currentHeadTab, setIsModalVisible, setCurrentModal }) => {
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
          <StakeLsdBlock setIsModalVisible={setIsModalVisible} setCurrentWindow={setCurrentModal} />
          :
          null
      }

      {
        currentHeadTab === 'Stake LP' ?
          <StakeLpBlock setIsModalVisible={setIsModalVisible} setCurrentWindow={setCurrentModal} />
          :
          null
      }
    </div>
  )
}

export default StakeTabs;
