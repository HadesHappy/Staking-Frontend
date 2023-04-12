import React from 'react'
import { useAddress, useDisconnect, useBalance } from '@thirdweb-dev/react'
import { showAddress, showBalance } from '../utils/helper'
import { usePrice } from '../hooks/usePrice'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { lsdTokenAddress } from '../utils/constants'

const EthBalance = () => {
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS)
  const { ethPrice } = usePrice()

  return (
    <div className="connect-wallet__balance-item">
      <img src="/img/coins/eth.png" alt='eth' />
      <b>{showBalance(Number(data?.displayValue)) || 0}</b>
      <p>ETH balance</p>
      <span>${showBalance(Number(data?.value) * ethPrice / (10 ** 18)) || 0} USD</span>
    </div>
  )
}

const LsdBalance = () => {
  const { data, isLoading } = useBalance(lsdTokenAddress)
  const { lsdPrice } = usePrice()

  return (
    <div className="connect-wallet__balance-item">
      <img src="/img/coins/lsd.png" alt='lsd' />
      <b>{showBalance(Number(data?.displayValue)) || 0}</b>
      <p>LSD balance</p>
      <span>${showBalance(Number(data?.value) * lsdPrice / (10 ** 9)) || 0} USD</span>
    </div>
  )
}
const MyWallet = ({ setIsWalletWindowVisible }) => {
  const address = useAddress()
  const disconnect = useDisconnect()
  const copyAddress = () => {
    var inp = document.createElement('input');
    document.body.appendChild(inp)
    inp.value = address
    inp.select();
    document.execCommand('copy', false);
    inp.remove();
  }

  return (
    <div className="connect-wallet__my-wallet">
      <div className="connect-wallet__header connect-wallet__header--my-wallet active">
        <h2 className="connect-wallet__title">My wallet</h2>
        <p className="connect-wallet__description">Connected: {showAddress(address)}</p>
      </div>

      <div className="connect-wallet__actions">
        <button type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.66723 1.33334L2.72953 8.45857C2.49699 8.73762 2.38072 8.87714 2.37894 8.99498C2.3774 9.09741 2.42305 9.19487 2.50273 9.25926C2.59439 9.33334 2.77601 9.33334 3.13925 9.33334H8.00056L7.33389 14.6667L13.2716 7.54143C13.5041 7.26239 13.6204 7.12286 13.6222 7.00503C13.6237 6.90259 13.5781 6.80513 13.4984 6.74074C13.4067 6.66667 13.2251 6.66667 12.8619 6.66667H8.00056L8.66723 1.33334Z" stroke="#898D94" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Mainnet network
        </button>
        <button type="button" onClick={copyAddress}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_16_79)">
              <path d="M3.33398 10C2.71273 10 2.4021 10 2.15707 9.89851C1.83037 9.76318 1.5708 9.50362 1.43548 9.17691C1.33398 8.93189 1.33398 8.62126 1.33398 8V3.46667C1.33398 2.71993 1.33398 2.34656 1.47931 2.06135C1.60714 1.81047 1.81111 1.60649 2.062 1.47866C2.34721 1.33334 2.72058 1.33334 3.46732 1.33334H8.00065C8.62191 1.33334 8.93253 1.33334 9.17756 1.43483C9.50427 1.57016 9.76383 1.82972 9.89916 2.15642C10.0007 2.40145 10.0007 2.71208 10.0007 3.33334M8.13398 14.6667H12.534C13.2807 14.6667 13.6541 14.6667 13.9393 14.5213C14.1902 14.3935 14.3942 14.1895 14.522 13.9387C14.6673 13.6534 14.6673 13.2801 14.6673 12.5333V8.13334C14.6673 7.3866 14.6673 7.01323 14.522 6.72802C14.3942 6.47713 14.1902 6.27316 13.9393 6.14533C13.6541 6 13.2807 6 12.534 6H8.13398C7.38725 6 7.01388 6 6.72866 6.14533C6.47778 6.27316 6.27381 6.47713 6.14598 6.72802C6.00065 7.01323 6.00065 7.3866 6.00065 8.13334V12.5333C6.00065 13.2801 6.00065 13.6534 6.14598 13.9387C6.27381 14.1895 6.47778 14.3935 6.72866 14.5213C7.01388 14.6667 7.38725 14.6667 8.13398 14.6667Z" stroke="#898D94" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_16_79">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Copy
        </button>
        <a href={`https://etherscan.io/address/${address}`} target="_blank">
          <button type="button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 6.00001L14 2.00001M14 2.00001H9.99999M14 2.00001L8 8M6.66667 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.07989 14 5.2 14H10.8C11.9201 14 12.4802 14 12.908 13.782C13.2843 13.5903 13.5903 13.2843 13.782 12.908C14 12.4802 14 11.9201 14 10.8V9.33333" stroke="#898D94" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Explore
          </button>
        </a>
      </div>
      <div className="connect-wallet__balance">
        <EthBalance />
        <LsdBalance />
      </div>
      <footer className="connect-wallet__footer">
        <button type="button" className="connect-wallet__disconnect" onClick={disconnect}>Disconnect</button>
        <button type="button" className="connect-wallet__buy-lsd" onClick={() => setIsWalletWindowVisible(false)} >Buy LSD </button>
      </footer>
    </div>
  )
}

export default MyWallet;
