import React, { useEffect, useState } from 'react'
import { useStakeEthInfo } from '../../hooks/useStakeEthInfo';
import SectionHeadTabs from '../../components/SectionHeadTabs';
import { showBalance } from '../../utils/helper';
import DappFooter from '../../components/DappFooter';
import ModalWindow from '../../components/ModalWindow';
import SelectToken from '../../components/SelectToken';
import DappSettingsWindow from '../../components/DappSettingsWindow';
import StakeLsdWindow from '../../components/StakeLsdWindow';
import StakeLP from '../../components/StakeLP';
import LiquidityWindow from '../../components/LiquidityWindow';
import StakeBlock from '../../components/StakeBlock';
import { useStakeLsdInfo } from '../../hooks/useStakeLsdInfo';
import { usePersonalInfo } from '../../hooks/usePersonalInfo';

const StakeLsdPage = () => {

  useEffect(() => {
    import('../dapp/dapp.css');
    import('../stake/stake.css');
  }, []);


  const [currentHeadTab, setCurrentHeadTab] = useState('Stake ETH');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState('select-token');
  const { totalEth } = useStakeEthInfo();
  const { bonusApr, stakeApr, totalStakedLp, totalStakedLsd, totalRewardsByLP, totalRewardsByLSD } = useStakeLsdInfo();
  const { claimAmountByLp, claimAmountByLsd, earnedAmountByLp, earnedAmountByLsd, stakedLp, stakedLsd } = usePersonalInfo();

  let stakeBlockData = {
    img: ['/img/coins/lseth.png'],
    coinName: 'LSD',
    coinAbbr: 'LSD',
    totalStaked: totalStakedLsd || 0,
    totalRewards: totalRewardsByLSD || 0,
    yourStakedAmount: stakedLsd,
    yourStakedBtn: 'Stake',
    isAddLiquidity: false,
    lsdEarned: claimAmountByLsd,
    footer: {
      earning: `${earnedAmountByLsd}`,
      bonus: `${bonusApr}%`,
      apr: `${stakeApr}%`
    }
  }

  return (
    <>
      <main className='dapp'>
        <section className='dapp-section'>
          <SectionHeadTabs currentHeadTab={currentHeadTab} setCurrentHeadTab={setCurrentHeadTab} />
          <h1 className="dapp-section__title">
            <span>TVL</span>
            {showBalance(totalEth)}
          </h1>
          <p className="dapp-section__about">Dollar value of total assets staked</p>
        </section>
        <div className='stake-tabs'>
          <StakeBlock data={stakeBlockData} setIsModalVisible={setIsModalVisible} setCurrentWindow={setCurrentModal} />
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

export default StakeLsdPage;
