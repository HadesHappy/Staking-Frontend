import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAddress } from '@thirdweb-dev/react'
import { showAddress } from '../utils/helper'

const PageHeader = ({ setIsWalletWindowVisible, isAuth }) => {

  const pageHeaderRef = useRef(null)
  const address = useAddress()

  return (
    <header className="page-header" ref={pageHeaderRef}>
      <Link to="/" className="page-header__logo">
        <img src="/img/logo.svg" alt="Liquid Staking Derivatives logo" />
      </Link>
      <nav className="page-header__nav">
        <ul className="page-header__nav-list">
          <li className="page-header__nav-item">
            <Link to={'/'}>Home</Link>
          </li>
          <li className="page-header__nav-item">
            <a href="https://www.dextools.io/app/en/ether/pair-explorer/0xb92fe026bd8f5539079c06f4e44f88515e7304c9" target="_blank">Chart</a>
          </li>
          <li className="page-header__nav-item">
            <a href="https://etherscan.io/token/0x97d4f49eeb0e2c96d5ebaa71ab8418e563ecd9fd" target="_blank">Contract</a>
          </li>
          <li className='page-header__nav-item'>
            <Link to='/dapp/stake-eth'>Dapp</Link>
          </li>
          <li className="page-header__nav-item">
            <a href="">LSD OTC</a>
          </li>
        </ul>
      </nav>
      <nav className="page-header__nav-right">
        <a href="https://app.uniswap.org/#/swap?outputCurrency=0x97d4f49eeb0e2c96d5ebaa71ab8418e563ecd9fd" target="_blank">Buy LSD</a>
        {
          address ?
            <button
              className="address-button"
              onClick={() => setIsWalletWindowVisible(true)}
            >
              {showAddress(address)}
            </button>
            :
            <button type='menu' className='page-header__nav-connect' onClick={() => setIsWalletWindowVisible(true)}>Connect</button>
        }
      </nav>
      <button
        className="page-header__menu-button"
        onClick={(e) => {
          e.target.classList.toggle('opened');
          pageHeaderRef.current.classList.toggle('opened');
        }}
      ></button>
    </header>
  )
}

export default PageHeader;
