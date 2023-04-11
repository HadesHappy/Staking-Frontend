import React, { useState } from 'react'
import StakeUnstakeLiquidityWindow from '../../components/StakeLP'
import DappFooter from '../../components/DappFooter'
import ModalWindow from '../../components/ModalWindow'
import StakeBlock from '../../components/StakeBlock'
import StakeLsdWindow from '../../components/StakeLsdWindow'
import './stake.css'
import { showBalance } from '../../utils/helper'
import { useStakeEthInfo } from '../../hooks/useStakeEthInfo'

const Stake = () => {
  const { totalEth } = useStakeEthInfo()

  const leftData = {
    img: ['img/coins/lseth.png'],
    coinName: 'LSD',
    coinAbbr: 'LSD',
    totalStaked: '25,204.129',
    totalRewards: '2.0046',
    yourStakedAmount: '25,204.129',
    yourStakedBtn: 'Stake',
    lsdEarned: '0.000',
    footer: {
      earning: '5,805,140 ETH',
      bonus: '12.32 %',
      apr: '10.85%'
    }
  }

  const rightData = {
    img: ['img/coins/lseth.png', 'img/coins/eth.png'],
    coinName: 'ETH',
    coinAbbr: 'LP',
    totalStaked: '105.006',
    totalRewards: '1.345',
    yourStakedAmount: '2.026',
    yourStakedBtn: 'Add Liquidity',
    lsdEarned: '0.000',
    footer: {
      earning: '0,0064 ETH',
      bonus: '8.08 %',
      apr: '14.23%'
    }
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentWindow, setCurrentWindow] = useState('stake');



  return (
    <>
      <main className='dapp'>
        <section className='dapp-section'>
          <h1 className="dapp-section__title">
            <span>Stake coins</span>
            {showBalance(totalEth)}
          </h1>
          <p className="dapp-section__about">ETH staked</p>
        </section>
        <div className='stake'>
          <StakeBlock data={leftData} setIsModalVisible={setIsModalVisible} setCurrentWindow={setCurrentWindow} />
          <StakeBlock data={rightData} setIsModalVisible={setIsModalVisible} setCurrentWindow={setCurrentWindow} />
        </div>
      </main>
      <DappFooter />
      {
        isModalVisible &&
        <ModalWindow>
          {
            currentWindow === 'stake' ?
            <StakeLsdWindow setIsModalVisible={setIsModalVisible} />
            :
            <StakeUnstakeLiquidityWindow setIsModalVisible={setIsModalVisible} />
          }
        </ModalWindow>
      }
    </>
  )
}

export default Stake;
