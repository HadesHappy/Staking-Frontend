import '../pages/dapp/dapp.css';
import { showBalance } from '../utils/helper';

const Tvl = () => {
  return (
    <h1 className="dapp-section__title">
      <span>TVL</span>
      {showBalance(0)}
    </h1>
  )
}

export default Tvl