import React from 'react'
import { useState } from 'react';
import StakeWindowTabs from './StakeWindowTabs';
import ButtonLoader from './ButtonLoader';

const LiquidityWindow = ({setIsModalVisible}) => {
  const [currentMode, setCurrentMode] = useState('Stake');
  return (
    <div className='stake-window'>
      <header className='stake-window__header'>
        <h2 className='stake-window__title'>Add Liquidity</h2>
        <button className='stake-window__close' onClick={() => setIsModalVisible(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>
      <div className='stake-window__wrapper'>
        <StakeWindowTabs setCurrentMode={setCurrentMode} />
        <form className='stake-window__form'>
          <div className='stake-window__form-wrapper'>
            <label htmlFor="stake-eth-input">Stake ETH</label>
            <p>
              Balance: <span>2,850.30 ETH</span>
            </p>
            <input type="number" placeholder='Eth amount' id='stake-eth-input' />
          </div>
          <div className='stake-window__form-wrapper'>
            <label htmlFor="stake-lsd-input">Stake LSD</label>
            <input type="number" placeholder='Lsd amount' id='stake-lsd-input' />
          </div>
          <footer className='stake-window__footer'>
            <button type='button' className='gray' onClick={() => setIsModalVisible(false)}>Cancel</button>
            <button type='button' className='stake-window__footer-confirm purple'>
              <ButtonLoader />
              Confirm
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default LiquidityWindow;
