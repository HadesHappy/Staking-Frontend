import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const SectionHeadTabs = () => {
  const currentHeadTab = 'Stake ETH';

  const sectionHeadTabs = [
    {
      name: 'Stake ETH',
      route: '../dapp/stake-eth'
    },
    {
      name: 'Stake LSD',
      route: '../dapp/stake-lsd'
    },
    {
      name: 'Stake LP',
      route: '../dapp/stake-lp'
    }
  ];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <menu
      className={`dapp-section__head-tabs ${location.pathname === '/dapp/stake-eth' ? 'dapp-section__head-tabs--eth' : ''} ${location.pathname === '/dapp/stake-lsd' ? 'dapp-section__head-tabs--lsd' : ''} ${location.pathname === '/dapp/stake-lp' ? 'dapp-section__head-tabs--lp' : ''}`}
    >
      {
        sectionHeadTabs.map((tab) => (
          <li className='dapp-section__head-tab-item' key={tab.name}>
            <button
              className={`dapp-section__head-tab-btn ${currentHeadTab === tab ? 'active' : '' }`}
              onClick={() => navigate(tab.route)}
            >
                {tab.name}
            </button>
          </li>
        ))
      }
    </menu>
  )
}

export default SectionHeadTabs;
