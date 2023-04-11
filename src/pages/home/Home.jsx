import React from 'react'
import Ecosystem from '../../components/Ecosystem';
import Faq from '../../components/Faq';
import HomeFooter from '../../components/HomeFooter';
import HomeHero from '../../components/HomeHero';
import Rewards from '../../components/Rewards';
import SocialMedia from '../../components/SocialMedia';
import './style.css'

const Home = () => {
  return (
    <>
      <HomeHero />
      <div className='dark-section'>
        <SocialMedia />
        <Ecosystem />
        <Rewards />
        <Faq />
        <HomeFooter />
      </div>
    </>
  )
}

export default Home;
