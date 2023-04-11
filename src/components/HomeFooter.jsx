import React from 'react'

const HomeFooter = () => {
  return (
    <footer className="page-footer">
        <p className="page-footer__copyright">© 2023 lsdprotocol.io</p>
        <nav className="page-footer__nav">
          <a href="https://twitter.com/lsderivatives/" target="_blank">Twitter</a>
          <a href="https://discord.com/invite/lsderivatives/" target="_blank">Discord</a>
          <a href="https://lsderivatives.medium.com/" target="_blank">Medium</a>
          <a href="https://github.com/lsderivatives/" target="_blank">Github</a>
          <a href="https://coinmarketcap.com/currencies/liquid-staking-derivatives/" target="_blank">Coinmarketcap</a>
          <a href="https://www.coingecko.com/en/coins/liquid-staking-derivative" target="_blank">Coingecko</a>
        </nav>
        <a href="" className="page-footer__logo">
          <img src="img/logo.svg" alt="Liquid Staking Derivatives logo" />
        </a>
    </footer>
  )
}

export default HomeFooter;
