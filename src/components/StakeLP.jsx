import React, { useState } from 'react'
import StakeLPForm from './StakeLPForm';
import UnstakeLPForm from './UnstakeLPForm';
import StakeWindowTabs from './StakeWindowTabs';

const StakeLP = ({setIsModalVisible}) => {

  const [currentMode, setCurrentMode] = useState('Stake');

  return (
    <div className='stake-window'>
      <header className='stake-window__header'>
        <h2 className='stake-window__title'>
          {
            currentMode === 'Stake' ?
            'Stake LP'
            :
            'Unstake LP'
          }
        </h2>
        <button className='stake-window__close' onClick={() => setIsModalVisible(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>
      <div className='stake-window__wrapper'>
        <StakeWindowTabs setCurrentMode={setCurrentMode} />
        {
          currentMode === 'Stake' ?
          <StakeLPForm setIsModalVisible={setIsModalVisible} />
          :
          <UnstakeLPForm setIsModalVisible={setIsModalVisible} />
        }
      </div>
    </div>
  )
}

export default StakeLP;
