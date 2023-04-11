import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import ConnectWallet from './components/ConnectWallet'
import ModalWindow from './components/ModalWindow'
import PageHeader from './components/PageHeader'
import Home from './pages/home/Home'
import Stake from './pages/stake/Stake'
import { Toaster } from 'react-hot-toast'
import StakeEthPage from './pages/stakeEthPage/StakeEthPage';
import StakeLsdPage from './pages/stakeLsdPage/StakeLsdPage';
import StakeLpPage from './pages/stakeLpPage/StakeLpPage';

function App() {

  useEffect(() => {
    require('./styles/normalize.css');
    require('./styles/reset.css');
    require('./styles/fonts.css');
  }, []);

  const [isWalletWindowVisible, setIsWalletWindowVisible] = useState(false);
  const location = useLocation();

  return (
    <div className={`app ${location.pathname === '/' ? '' : 'app--black'}`}>
      <PageHeader setIsWalletWindowVisible={setIsWalletWindowVisible} />
      <Routes>
        <Route index element={<Home />} />
        <Route path='dapp/stake-eth' element={<StakeEthPage />} />
        <Route path='dapp/stake-lsd' element={<StakeLsdPage />} />
        <Route path='dapp/stake-lp' element={<StakeLpPage />} />
        <Route path='/stake' element={<Stake />} />
      </Routes>

      {
        isWalletWindowVisible &&
        <ModalWindow>
          <ConnectWallet setIsWalletWindowVisible={setIsWalletWindowVisible} />
        </ModalWindow>
      }

      <Toaster toastOptions={{
        className: '',
        style: {
          borderRadius: '10px',
          background: '#6761D7',
          color: '#fff',
        }
      }} />
    </div>
  );
}

export default App;
