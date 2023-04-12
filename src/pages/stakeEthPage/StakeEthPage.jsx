import React, { useEffect, useState } from 'react'
import SectionHeadTabs from '../../components/SectionHeadTabs';
import { showBalance } from '../../utils/helper';
import DappFooter from '../../components/DappFooter';
import ModalWindow from '../../components/ModalWindow';
import SelectToken from '../../components/SelectToken';
import DappSettingsWindow from '../../components/DappSettingsWindow';
import StakeLP from '../../components/StakeLP';
import LiquidityWindow from '../../components/LiquidityWindow';
import StakeEth from '../../components/StakeEth';
import StakeLsdWindow from '../../components/StakeLsdWindow';
import '../dapp/dapp.css';
import '../stake/stake.css';
import '../stake/notification.css';
import Tvl from '../../components/Tvl';

const StakeEthPage = () => {

  const [currentHeadTab, setCurrentHeadTab] = useState('Stake ETH');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState('select-token');

  return (
    <>
      <main className='dapp'>
        <div className='notification'>
          Staking is paused. We have submitted our smart contracts for a security audit. Once completed, we will enable staking.
        </div>
        <section className='dapp-section'>
          <SectionHeadTabs currentHeadTab={currentHeadTab} setCurrentHeadTab={setCurrentHeadTab} />
          <Tvl />
          <p className="dapp-section__about">Dollar value of total assets staked</p>
        </section>
        <div className='stake-tabs'>
          <StakeEth setIsModalVisible={setIsModalVisible} setCurrentModal={setCurrentModal} />
        </div>

      </main>
      <DappFooter />
      {
        isModalVisible &&
        <ModalWindow>
          {
            currentModal === 'select-token' && <SelectToken setIsModalVisible={setIsModalVisible} />
          }

          {
            currentModal === 'settings' && <DappSettingsWindow setIsModalVisible={setIsModalVisible} />
          }

          {
            currentModal === 'stake' && <StakeLsdWindow setIsModalVisible={setIsModalVisible} />
          }

          {
            currentModal === 'add-liquidity' && <StakeLP setIsModalVisible={setIsModalVisible} />
          }

          {
            currentModal === 'liquidity' && <LiquidityWindow setIsModalVisible={setIsModalVisible} />
          }
        </ModalWindow>
      }
    </>
  )
};

export default StakeEthPage;
