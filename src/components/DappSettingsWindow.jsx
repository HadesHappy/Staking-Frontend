import React from 'react'

const DappSettingsWindow = ({setIsModalVisible}) => {
  return (
    <div className="modal-window__wrapper modal-window__wrapper--settings">
      <header className="modal-window__header">
        <h2>Settings</h2>
        <button className="modal-window__close" onClick={() => setIsModalVisible(false)}></button>
      </header>
      <form className="dapp-section__settings-form">
        <p className="dapp-section__settings-row dapp-section__settings-row--multiplier">
          <span>Multiplier</span>
          <input type="checkbox" name="multiplier-checkbox" id="multiplier-checkbox" />
          <label htmlFor="multiplier-checkbox"></label>
        </p>
        <div className="dapp-section__settings-double">
          <div className="dapp-section__settings-double__half">
            <label htmlFor="multiplier">Multiplier</label>
            <p className="input-wrapper">
              <input type="text" name="multiplier" id="multiplier" placeholder="0" />
              <button type="button" className="input-wrapper__help"></button>
            </p>
          </div>
          <div className="dapp-section__settings-double__half">
            <label htmlFor="multiplier-unit">Multiplier unit</label>
            <p className="input-wrapper">
              <input type="text" name="multiplier-unit" id="multiplier-unit" placeholder="0" />
              <button type="button" className="input-wrapper__help"></button>
            </p>
            </div>
        </div>
        <p className="dapp-section__settings-row dapp-section__settings-row--apr">
          <span>APR %</span>
          <input type="checkbox" name="apr-checkbox" id="apr-checkbox" />
          <label htmlFor="apr-checkbox"></label>
        </p>
        <div className="dapp-section__settings-double">
          <div className="dapp-section__settings-double__half">
            <label htmlFor="apr">Apr</label>
            <p className="input-wrapper">
              <input type="text" name="apr" id="apr" placeholder="0" />
              <button type="button" className="input-wrapper__help"></button>
            </p>
          </div>
          <div className="dapp-section__settings-double__half">
            <label htmlFor="apr-unit">Multiplier unit</label>
            <p className="input-wrapper">
              <input type="text" name="apr-unit" id="apr-unit" placeholder="0" />
              <button type="button" className="input-wrapper__help"></button>
            </p>
          </div>
        </div>
        <p className="dapp-section__settings-row dapp-section__settings-row--slippage">
          <span>Slippage tolerance</span>
          <input type="checkbox" name="slippage-checkbox" id="slippage-checkbox" />
          <label htmlFor="slippage-checkbox"></label>
        </p>
        <div className="dapp-section__settings-slippage">
          <p className="input-wrapper">
            <label htmlFor="enter-slippage">Enter slippage</label>
            <input type="text" name="enter-slippage" id="enter-slippage" placeholder="0%" />
          </p>
          <button type="button" className="dapp-section__settings-slippage-auto">Auto</button>
        </div>
        <p className="dapp-section__settings-row dapp-section__settings-row--manual-apr">
          <span>Manual apr</span>
          <input type="checkbox" name="manual-apr-checkbox" id="manual-apr-checkbox" />
          <label htmlFor="manual-apr-checkbox"></label>
        </p>
        <div className="dapp-section__settings-double">
          <div className="dapp-section__settings-double__half">
            <label htmlFor="lido">Lido</label>
            <p className="input-wrapper">
              <input type="text" name="lido" id="lido" placeholder="0" />
              <button type="button" className="input-wrapper__help"></button>
            </p>
          </div>
          <div className="dapp-section__settings-double__half">
            <label htmlFor="rpl">Rpl</label>
            <p className="input-wrapper">
              <input type="text" name="rpl" id="rpl" placeholder="0" />
              <button type="button" className="input-wrapper__help"></button>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DappSettingsWindow;
