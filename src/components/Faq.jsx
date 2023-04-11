import React from 'react'

const Faq = () => {

  const faqList = [
    {
      question: 'What is Liquid Staking Derivatives?',
      answer: '$LSD is a liquid staking aggregator protocol based on algorithms that detect and calculate the best possible solution for the highest APY. $LSD uses a proprietary smart contract to manage and automatically rebalance the portfolio to generate the best APY’s for its investors.'
    },
    {
      question: 'What are the Tokenomics?',
      answer: 'There is a 3% buy and sell tax. This will generate a project treasury that can be implemented in different ways through governance decisions made by the community. Decisions on how this treasury is implemented will be determined by vote by the DAO using the $LSD governance token $veLSD.'
    },
    {
      question: 'What makes $LSD unique?',
      answer: '$LSD will be the first liquid staking aggregator to utilize existing protocols to generate the highest APY’s possible in the most efficient and cost-effective way. An all-in-one solution for liquid staking protocols.'
    },
    {
      question: 'What is veLSD and LS-ETH?',
      answer: 'veLSD is a reward token for providing $LSD to the staking pool. $veLSD is needed for governance purposes to vote on protocol changes and implementation. For example: rebalancing staking providers or adding new providers. LS- ETH is the liquid token rewarded to investors providing ETH to the protocol to be staked.This $lsETH can then be used in any other DEFI application the investor wishes, increasing the leverage they have over their ETH.'
    },
    {
      question: 'How does the protocol work?',
      answer: 'Users deposit $ETH and are given $lsETH in return.The $LSD aggregator protocol stakes this ETH among the existing protocols available (LIDO, RPL, Manifold, SWISE etc.)$LSD protocol pays out yield from these protocols via a proprietary smart contract mechanism. In addition, the $LSD also pays out veLSD tokens which are not sellable for a lockup period.Users can add a multiplier on their APY yield by locking their $LSD to $veLSD.$veLSD is utilized in governance decisions by the community and those that voluntarily lock their $LSD tokens for a higher APY.'
    }
  ]

  return (
    <section className="faq">
        <h2 className="dark-section__title">
          <sup>*</sup>
          Frequently asked questions
        </h2>
        <p className="dark-section__about">Answers here</p>
        <ul className="faq__list">
          {
            faqList.map((item) => {
              return (
                <li className="faq__item" key={item.question}>
                  <button
                    className="faq__item-question"
                    onClick={(e) => e.target.classList.toggle('active')}
                  >
                    {item.question}
                  </button>
                  <p className="faq__item-answer">{item.answer}</p>
                </li>
              )
            })
          }
        </ul>
    </section>
  )
}

export default Faq;
