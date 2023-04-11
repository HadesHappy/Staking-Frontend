const DisplayEth = () => {
  return (
    <>
      <img src="/img/coins/eth.png" alt='eth' />
      <span>ETH</span>
    </>
  )
}

const DisplayLsEth = () => {
  return (
    <>
      <img src="/img/coins/lseth.png" alt='lseth' />
      <span>LSETH</span>
    </>
  )
}

const DisplayVeLsd = () => {
  return (
    <>
      <img src="/img/coins/velsd.png" alt="velsd" />
      <span>VELSD</span>
    </>
  )
}

const DisplayLsd = () => {
  return (
    <>
      <img src="/img/coins/lsd.png" alt="lsd" />
      <span>LSD</span>
    </>
  )
}

const DappDisplayToken = ({token}) => {
  let string
  if (token === 'ETH')
    string = (<DisplayEth />)
  else if (token === 'LS-ETH')
    string = (<DisplayLsEth />)
  else if (token === 'LSD')
    string = (<DisplayLsd />)
  else
    string = (<DisplayVeLsd />)
  return (
    string
  )
}

export default DappDisplayToken
