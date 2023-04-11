import React, { useState } from 'react'

const StakeWindowTabs = ({setCurrentMode}) => {

  const tabsText = ['Stake', 'Unstake'];

  const [currentTab, setCurrentTab] = useState('Stake');

  return (
    <ul className={`stake-window__tabs ${currentTab === 'Unstake' && 'stake-window__tabs--unstake'}`}>
      {
        tabsText.map((tab) => {
          return (
            <li
              className={`stake-window__tab ${tab === currentTab && 'active'}`}
              key={tab}
              onClick={() => {
                setCurrentTab(tab)
                setCurrentMode(tab)
              }}
            >
              {tab}
            </li>
          )
        })
      }
    </ul>
  )
}

export default StakeWindowTabs;
