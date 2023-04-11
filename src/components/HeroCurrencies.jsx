import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import "swiper/css"
import "swiper/css/autoplay"
import axios from 'axios'
import { showBalance } from '../utils/helper'

const HeroCurrencies = () => {

  const [btcPrice, setBtcPrice] = useState();
  const [ethPrice, setEthPrice] = useState();
  const [bnbPrice, setBnbPrice] = useState();
  const [xrpPrice, setXrpPrice] = useState();
  const [adaPrice, setAdaPrice] = useState();
  const [dogePrice, setDogePrice] = useState();
  const [maticPrice, setMaticPrice] = useState();
  const [solPrice, setSolPrice] = useState();
  const [ltcPrice, setLtcPrice] = useState();
  const [dotPrice, setDotPrice] = useState();

  const getPrices = async () => {
    let response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Cbinance-peg-xrp%2Cbinance-peg-cardano%2Cbinance-peg-dogecoin%2Cmatic-network%2Csol-wormhole%2Cbinance-peg-litecoin%2Cbinance-peg-polkadot&vs_currencies=usd"
    )
    setBtcPrice(showBalance(response.data.bitcoin.usd))
    setEthPrice(showBalance(response.data.ethereum.usd))
    setBnbPrice(showBalance(response.data.binancecoin.usd))
    setXrpPrice(showBalance(response.data["binance-peg-cardano"].usd))
    setAdaPrice(showBalance(response.data["binance-peg-xrp"].usd))
    setDogePrice(showBalance(response.data["binance-peg-dogecoin"].usd))
    setMaticPrice(showBalance(response.data["matic-network"].usd))
    setSolPrice(showBalance(response.data["sol-wormhole"].usd))
    setLtcPrice(showBalance(response.data["binance-peg-litecoin"].usd))
    setDotPrice(showBalance(response.data["binance-peg-polkadot"].usd))
  }

  useEffect(() => {
    getPrices()
  }, [])
  let coins = [`BTC  $${btcPrice}`, `ETH  $${ethPrice}`, `BNB  $${bnbPrice}`, `XRP  $${xrpPrice}`, `ADA  $${adaPrice}`, `Doge  $${dogePrice}`, `MATIC  $${maticPrice}`, `SOL $${solPrice}`, `Dot $${dotPrice}`, `LTC $${ltcPrice}`, `BTC  $${btcPrice}`, `ETH  $${ethPrice}`, `BNB  $${bnbPrice}`, `XRP  $${xrpPrice}`, `ADA  $${adaPrice}`, `Doge  $${dogePrice}`, `MATIC  $${maticPrice}`, `SOL $${solPrice}`, `Dot $${dotPrice}`, `LTC $${ltcPrice}`]

  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={0}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      speed={5000}
      loop={true}
      freeMode={true}
      slideToClickedSlide={true}
      preventClicksPropagation={false}
      preventClicks={false}
      allowTouchMove={false}
      modules={[Autoplay]}
      className="currencies-swiper"
    >
      {
        coins.map((coin, index) => <SwiperSlide className='hero__currencies-item' key={index}>{coin}</SwiperSlide>)
      }
    </Swiper>
  )
}

export default HeroCurrencies;
