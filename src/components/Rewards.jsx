import React from 'react'

const Rewards = () => {
  return (
    <section className="rewards">
        <h2 className="dark-section__title">
          <sup>*</sup>
          rewards
        </h2>
        <p className="dark-section__about">Treasury and Asset Backing</p>
        <ul className="rewards__list">
          <li className="rewards__item">
            <img src="img/rewards-icon1.svg" className="rewards__item-img" />
            <p className="rewards__item-title">Yield Generation</p>
            <p className="rewards__item-description">
              The highest possible APY is generated
              through passive staking income via
              automated liquid staking protocol allocation
              and rebasing via smart contract. The most
              cost efficient and highest yield generating
              allocation is implemented utilizing existing
              liquid staking protocols such as LIDO and
              RPL. This portfolio is automatically
              rebalanced over time.</p>
          </li>
          <li className="rewards__item">
            <img src="img/rewards-icon2.svg" className="rewards__item-img" />
            <p className="rewards__item-title">veLSD and LS-ETH</p>
            <p className="rewards__item-description">
              Reward tokens for staking both $LSD
              and $ETH respectively. $veLSD is
              attainable by locking $LSD, our native
              token. In doing this, more and more of the
              $LSD supply will be locked, reducing
              circulating supply.
            </p>
          </li>
          <li className="rewards__item">
            <img src="img/rewards-icon3.svg" className="rewards__item-img" />
            <p className="rewards__item-title">Aggregation</p>
            <p className="rewards__item-description">
              The concept of implementing liquid
              staking via multiple existing protocols
              and incorporating the benefits of each
              to generate higher yields. Let the $LSD
              aggregator protocol automatically
              allocate your staked funds into safest
              and most efficient liquid staking
              protocols to generate a higher APY.
            </p>
          </li>
        </ul>
      </section>
  )
}

export default Rewards;
