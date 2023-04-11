import React from 'react'

const Ecosystem = () => {
  return (
    <section className="ecosystem">
        <h2 className="dark-section__title">* ecosystem</h2>
        <p className="dark-section__about ecosystem__about">The LSD Vision</p>
        <ul className="ecosystem__description">
          <li>
            Staking has to-date, offered and will likely continue to
            offer themost reliable yields in DeFi. Liquid staking - or
            the ability to stakeETH via swapping for a liquid asset,
            has emerged as the leader inthis DeFi ecosystem.
            However investors must still contend with the difficulty
            of - evaluating yield (both in ETH and native tokens),
            choosing a protocol, and continually re-evaluating this
            over time. Enter $LSD.
          </li>
          <li>
            Simply put - users swap ETH for $LS-ETH, a wrapper
            around the $LSD Aggregator protocol - and our protocol
            will do the rest, ensuring the highest possible staked
            ETH yield across a multitude of liquid staking protocols
            via our proprietary smart contract.Custody of staked
            assets remains always with the user, which will aim to
            allow them to access that liquidity across the entire
            DeFi ecosystem.
          </li>
        </ul>
        <ul className="ecosystem__view">
          <li className="ecosystem__view-item ecosystem__view-item--big">
            <b>How does Ethereum <br/> staking work</b>
            <picture>
              <source srcSet="img/ecosystem-bg1@mobile.png" media="(max-width: 767px)" />
              <source srcSet="img/ecosystem-bg1@tablet.png" media="(min-width: 768px) and (max-width: 1199px)" />
              <img src="img/ecosystem-bg1.png" />
            </picture>
          </li>
          <li className="ecosystem__view-item">
            <picture>
              <source srcSet="img/ecosystem-bg2@mobile.png" media="(max-width: 767px)" />
              <source srcSet="img/ecosystem-bg2@tablet.png" media="(min-width: 768px) and (max-width: 1199px)" />
              <img src="img/ecosystem-bg2.png" />
            </picture>
            <b>How does $LSD <br /> staking work</b>
          </li>
          <li className="ecosystem__view-item">
            <picture>
              <source srcSet="img/ecosystem-bg3@mobile.png" media="(max-width: 767px)" />
              <source srcSet="img/ecosystem-bg3@tablet.png" media="(min-width: 768px) and (max-width: 1199px)" />
              <img src="img/ecosystem-bg3.png" />
            </picture>
            <b>$LSD token <br /> Allocation</b>
          </li>
        </ul>
        <ul className="ecosystem__steps">
          <li className="ecosystem__steps-item">
            <span className="ecosystem__steps-count">Step 1</span>
            <p className="ecosystem__steps-title">Staking your assets</p>
            <p className="ecosystem__steps-description">
              Stake $ETH or $LSD and be rewarded
              with both sustainable APY’s and liquid
              reward tokens for lending your assets
              to the LSD aggregator protocol.
            </p>
            <p className="ecosystem__steps-description">
              Rewards tokens can be used in
              governance decisions with veLSD or
              liquid DEFI ventures with LS-ETH
              giving you flexibility to take advantage
              of other facets of DEFI while earning
              passive income.
            </p>
          </li>
          <li className="ecosystem__steps-item">
            <span className="ecosystem__steps-count">Step 2</span>
            <p className="ecosystem__steps-title">Governance</p>
            <p className="ecosystem__steps-description">
              Protocol decision making will be
              governed via $veLSD, giving power to
              the community and the investors of the
              protocol. This mechanism will ensure
              malicioius actors are unable to exploit
              the protocol and uphold a decentralized
              governance structure.
            </p>
            <p className="ecosystem__steps-description">
              $LSD tokens must be locked to receive
              $veLSD. Additionally, community
              members who volountarily lock their
              $LSD will receive a multiplier on their
              staked ETH rewards.
            </p>
          </li>
          <li className="ecosystem__steps-item">
            <span className="ecosystem__steps-count">Step 3</span>
            <p className="ecosystem__steps-title">Future Proofing</p>
            <p className="ecosystem__steps-description">
              The LSD aggregator protocol not only
              generates passive income but sustainable
              and safe growth of your assets.
            </p>
            <p className="ecosystem__steps-description">
              The APY generated is automatically
              rebased through our smart contract and
              any decisions made will be governed by
              the veLSD governance token to prevent
              the threat of centralized control.
            </p>
            <p className="ecosystem__steps-description">Protocol audits coming soon.</p>
          </li>
        </ul>
      </section>
  )
}

export default Ecosystem;
