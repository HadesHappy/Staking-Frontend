import React, { useState } from 'react'
import MyWallet from './MyWallet'
import { toast } from 'react-hot-toast'
import { useMetamask, useCoinbaseWallet, useWalletConnect, useAddress, useDisconnect } from '@thirdweb-dev/react'
import { showAddress } from '../utils/helper'
import { useSigner } from '@thirdweb-dev/react'

const ConnectWallet = ({ setIsWalletWindowVisible }) => {
  const connectWithMetamask = useMetamask()
  const connectCoinbase = useCoinbaseWallet()
  const conneectWithWalletConnect = useWalletConnect()
  const address = useAddress()
  const disconnect = useDisconnect()
  const signer = useSigner()

  const [isWalletLoading, setIsWalletLoading] = useState(false)

  const walletList = [
    {
      img: 'metamask',
      name: 'Metamask'
    },
    {
      img: 'coinbase',
      name: 'Coinbase wallet'
    },
    {
      img: 'connect',
      name: 'Wallet connect'
    },
  ];

  const walletButtonHandle = async (name) => {
    setIsWalletLoading(true)
    let response

    if (name === 'Metamask') {
      response = await connectWithMetamask()
    } else if (name === 'Coinbase wallet') {
      response = await connectCoinbase()
    } else {
      response = await conneectWithWalletConnect()
    }

    if (response && response?.data?.account) {
      toast.success(`Wallet connected: ${showAddress(response.data.account)}`)
      setIsWalletLoading(false)
    } else {
      if (response.error) {
        setIsWalletLoading(false)
      }
    }
  }

  return (
    <aside className="connect-wallet">
      <div className="connect-wallet__top-buttons">
        {
          address &&
          <button
            type="button"
            className="connect-wallet__back"
            onClick={disconnect}
          >
            Back
          </button>
        }
        <button
          type="button"
          className="connect-wallet__close"
          onClick={() => {
            setIsWalletWindowVisible(false);
          }}
        >
          Close
        </button>

        {
          address &&
          <div className="connect-wallet__top-pair">
            <img src="/img/wallet-pair1.png" alt='pair1' />
            <img src="/img/wallet-pair2.png" alt='pair2' />
          </div>
        }
      </div>

      {
        !address ?
          <div className="connect-wallet__connect">
            {
              isWalletLoading === false ?
                <div className="connect-wallet__header connect-wallet__header--default active">
                  <h2 className="connect-wallet__title">Connect wallet</h2>
                  <p className="connect-wallet__description">By connecting a wallet, you agree to lsdprotocol Labs’ <a href="">Terms of Service</a> and consent to it’s <a href="">Privacy Poicy.</a></p>
                </div>
                :
                <div className="connect-wallet__header connect-wallet__header--waiting">
                  <h2 className="connect-wallet__title">Waiting to connect</h2>
                  <p className="connect-wallet__description">Confirm this connection in your wallet...</p>
                </div>
            }
            <div className="connect-wallet__list">
              {
                walletList.map((wallet) => {
                  return (
                    <button
                      type="button"
                      className="connect-wallet__button" key={wallet.name}
                      onClick={() => walletButtonHandle(wallet.name)}
                    >
                      <img src={`/img/wallets/${wallet.img}.png`} alt='wallet_image' />
                      {wallet.name}
                    </button>
                  )
                })
              }
              {
                isWalletLoading &&
                <div className="connect-wallet__list-loading">
                  <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="43" cy="43" r="42" stroke="#242526" strokeWidth="2" />
                    <mask id="path-2-inside-1_25_93" fill="white">
                      <path d="M43 0C50.0714 8.43255e-08 57.0336 1.74395 63.2701 5.07738C69.5065 8.41082 74.8245 13.2308 78.7532 19.1105C82.6818 24.9901 85.0998 31.7479 85.7929 38.7853C86.4861 45.8226 85.4329 52.9223 82.7268 59.4554C80.0207 65.9885 75.7452 71.7534 70.2789 76.2394C64.8127 80.7255 58.3244 83.7942 51.3889 85.1738C44.4534 86.5533 37.2847 86.2011 30.5178 84.1484C23.7509 82.0957 17.5946 78.4058 12.5944 73.4056L14.1147 71.8853C18.8649 76.6355 24.7133 80.1409 31.1419 82.091C37.5704 84.0411 44.3807 84.3757 50.9694 83.0651C57.5582 81.7545 63.722 78.8392 68.915 74.5775C74.1079 70.3157 78.1697 64.8391 80.7405 58.6326C83.3113 52.4262 84.3118 45.6815 83.6533 38.996C82.9948 32.3105 80.6978 25.8906 76.9655 20.305C73.2333 14.7193 68.1811 10.1403 62.2566 6.97352C56.332 3.80676 49.7178 2.15 43 2.15V0Z" />
                    </mask>
                    <path d="M43 0C50.0714 8.43255e-08 57.0336 1.74395 63.2701 5.07738C69.5065 8.41082 74.8245 13.2308 78.7532 19.1105C82.6818 24.9901 85.0998 31.7479 85.7929 38.7853C86.4861 45.8226 85.4329 52.9223 82.7268 59.4554C80.0207 65.9885 75.7452 71.7534 70.2789 76.2394C64.8127 80.7255 58.3244 83.7942 51.3889 85.1738C44.4534 86.5533 37.2847 86.2011 30.5178 84.1484C23.7509 82.0957 17.5946 78.4058 12.5944 73.4056L14.1147 71.8853C18.8649 76.6355 24.7133 80.1409 31.1419 82.091C37.5704 84.0411 44.3807 84.3757 50.9694 83.0651C57.5582 81.7545 63.722 78.8392 68.915 74.5775C74.1079 70.3157 78.1697 64.8391 80.7405 58.6326C83.3113 52.4262 84.3118 45.6815 83.6533 38.996C82.9948 32.3105 80.6978 25.8906 76.9655 20.305C73.2333 14.7193 68.1811 10.1403 62.2566 6.97352C56.332 3.80676 49.7178 2.15 43 2.15V0Z" stroke="url(#paint0_linear_25_93)" strokeWidth="4" mask="url(#path-2-inside-1_25_93)" />
                    <defs>
                      <linearGradient id="paint0_linear_25_93" x1="43" y1="0" x2="43" y2="86" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6761D7" />
                        <stop offset="1" stopColor="#5BD5DF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              }
            </div>
          </div>
          :
          <MyWallet setIsWalletWindowVisible={setIsWalletWindowVisible} />
      }
    </aside>
  )
}

export default ConnectWallet;
