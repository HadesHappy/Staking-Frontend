import React from 'react'

const SelectToken = ({setIsModalVisible}) => {
  return (
    <div className="modal-window__wrapper modal-window__wrapper--select-token">
      <header className="modal-window__header">
        <h2>Select token</h2>
        <button className="modal-window__close" onClick={() => setIsModalVisible(false)}></button>
      </header>
      <form className="select-token__search">
        <input type="text" placeholder="Search token" />
        <ul className="select-token__related">
          <li className="select-token__related-item">
            <img src="/img/coins/eth.png" />
            eth
          </li>
          <li className="select-token__related-item">
            <img src="/img/coins/dai.png" />
            dai
          </li>
          <li className="select-token__related-item">
            <img src="/img/coins/usdc.png" />
            usdc
          </li>
          <li className="select-token__related-item">
            <img src="/img/coins/usdt.png" />
            usdt
          </li>
          <li className="select-token__related-item">
            <img src="/img/coins/wbtc.png" />
            wbtc
          </li>
          <li className="select-token__related-item">
            <img src="/img/coins/weth.png" />
            weth
          </li>
        </ul>
      </form>
      <ul className="select-token__search-result">
        <li className="select-token__search-result-item">
          <img src="/img/coins/eth.png" />
          <p className="token__info">
            <b className="token__info-name">Ethereum</b>
            <span className="token__info-abbr">ETH</span>
          </p>
          <b className="token__info-amount">1,250.70</b>
        </li>
        <li className="select-token__search-result-item">
          <img src="/img/coins/weth.png" />
          <p className="token__info">
            <b className="token__info-name">Wrapped Ether</b>
            <span className="token__info-abbr">WETH</span>
          </p>
          <b className="token__info-amount">300.0015</b>
        </li>
        <li className="select-token__search-result-item">
          <img src="/img/coins/inch.png" />
          <p className="token__info">
            <b className="token__info-name">1Inch</b>
            <span className="token__info-abbr">INCH</span>
          </p>
          <b className="token__info-amount">25,865.0</b>
        </li>
        <li className="select-token__search-result-item">
          <img src="/img/coins/abt.png" />
          <p className="token__info">
            <b className="token__info-name">Arcblock</b>
            <span className="token__info-abbr">ABT</span>
          </p>
          <b className="token__info-amount">0.0</b>
        </li>
        <li className="select-token__search-result-item">
          <img src="/img/coins/usdt.png" />
          <p className="token__info">
            <b className="token__info-name">Tether USD</b>
            <span className="token__info-abbr">USDT</span>
          </p>
          <b className="token__info-amount">0.0</b>
        </li>
      </ul>
    </div>
  )
}

export default SelectToken;
