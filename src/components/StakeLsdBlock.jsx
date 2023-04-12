import React, { useEffect, useState } from 'react'
import { useAddress } from '@thirdweb-dev/react'
import { toast } from 'react-hot-toast'
import { claimByLsd } from '../contracts/lsdStaking'
import { showBalance } from '../utils/helper'
import { stakeLsdInfo, getPersonalLsdInfo } from '../contracts/info'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLoader from './ButtonLoader'

const StakeLsdBlock = ({ setIsModalVisible, setCurrentWindow }) => {
  const address = useAddress()
  const dispatch = useDispatch()
  const lsdInfo = useSelector(state => state.stakeLsdReducer.lsdInfo)
  const lsdInfoLoading = useSelector(state => state.stakeLsdReducer.lsdInfoLoading)
  const personalInfo = useSelector(state => state.stakeLsdReducer.personalInfo)
  const personalInfoLoading = useSelector(state => state.stakeLsdReducer.personalInfoLoading)
  const [loading, setLoading] = useState(false)

  const ONE_DAY_IN_SECS = 24 * 60 * 60

  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [mins, setMins] = useState(0)
  const [secs, setSecs] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    dispatch(stakeLsdInfo())
  }, [])

  useEffect(() => {
    if (address)
      dispatch(getPersonalLsdInfo(address))
  }, [address])

  const calculateTimeLeft = () => {
    let endTime = lsdInfo.isBonusPeriod + lsdInfo.bonusPeriod * ONE_DAY_IN_SECS
    const difference = Math.floor(endTime - new Date().getTime() / 1000);
    if (difference > 0) {
      setDays(Math.floor(difference / ONE_DAY_IN_SECS))
      setHours(Math.floor(((difference % ONE_DAY_IN_SECS) / (60 * 60))))
      setMins(Math.floor(((((difference % ONE_DAY_IN_SECS)) % (60 * 60)) / 60)))
      setSecs(Math.floor(((((difference % ONE_DAY_IN_SECS)) % (60 * 60)) % 60)))
      setWidth(Math.floor(difference * 100 / (lsdInfo.bonusPeriod * ONE_DAY_IN_SECS)))
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft()
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleClaimClick = async () => {
    if (address) {
      if (personalInfo.lsdEarned === 0) {
        toast.error('There is no LSD to claim.')
      } else {
        setLoading(true)
        const response = await claimByLsd()
        setLoading(false)
        if (response.status === 'Success') {
          toast.success('Succeed.')
          dispatch(stakeLsdInfo())
          dispatch(getPersonalLsdInfo())
        } else {
          if (response.status === 'Error')
            toast.error(`${response.status}: ${response.error}.`)
          else
            toast.error('Transaction failed by unknown reason.')
        }

      }
    } else {
      toast.error('Connect your wallet.')
    }
  }

  return (
    <div className='stake-block'>
      <span className='stake-block__coin'>
        <img src='/img/coins/lseth.png' alt='data' />
        <i>LSD</i>
      </span>
      <ul className='stake-block__total'>
        <li className='stake-block__total-item'>
          <span>Total Staked LSD</span>
          {
            lsdInfoLoading ?
              <b>0</b>
              :
              <b>{showBalance(lsdInfo.totalStaked)}</b>
          }
        </li>
        <li className='stake-block__total-item'>
          <span>Total Rewards LSD</span>
          {
            lsdInfoLoading ?
              <b>0</b>
              :
              <b>{showBalance(lsdInfo.totalRewards)}</b>
          }
        </li>
      </ul>
      <ul className='stake-block__your'>
        <li className='stake-block__your-item'>
          <p>
            <span>Your Staked LSD</span>
          </p>
          {
            personalInfoLoading ?
              <b>0</b>
              :
              <b>{showBalance(personalInfo.stakedAmount)}</b>
          }
          <button
            onClick={() => {
              if (address) {
                setIsModalVisible(true);
                setCurrentWindow('stake')
              } else {
                toast.error('Connect your wallet.')
              }
            }
            }
          >
            Stake
          </button>
        </li>
        <li className='stake-block__your-item'>
          <p>
            <span>LSD Earned</span>
          </p>
          {
            personalInfoLoading ?
              <b>0</b>
              :
              <b>{showBalance(personalInfo.lsdEarned)}</b>
          }
          <button type='button' className='turquoise' onClick={handleClaimClick}>
            {loading === true && <ButtonLoader />}
            Claim</button>
        </li>
      </ul>
      <ul className='stake-block__info'>
        <li className='stake-block__info-item'>
          <span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.2808 13.7815C16.133 13.3996 18.3327 10.9567 18.3327 8.00002C18.3327 4.77836 15.721 2.16669 12.4993 2.16669C9.54267 2.16669 7.09976 4.36641 6.71791 7.21858M13.3327 13C13.3327 16.2217 10.721 18.8334 7.49935 18.8334C4.27769 18.8334 1.66602 16.2217 1.66602 13C1.66602 9.77836 4.27769 7.16669 7.49935 7.16669C10.721 7.16669 13.3327 9.77836 13.3327 13Z" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Your earning
          </span>
          {
            personalInfoLoading ?
              <b>0</b>
              :
              <b>{showBalance(personalInfo.earning)}</b>
          }
        </li>
        <li className='stake-block__info-item'>
          <span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_370_370)">
                <path d="M8.41686 3.33335C9.46898 2.30236 10.9099 1.66669 12.4993 1.66669C15.721 1.66669 18.3327 4.27836 18.3327 7.50002C18.3327 9.08947 17.697 10.5304 16.666 11.5826M6.24935 10.8334L7.49935 10V14.5834M6.24935 14.5834H8.74935M13.3327 12.5C13.3327 15.7217 10.721 18.3334 7.49935 18.3334C4.27769 18.3334 1.66602 15.7217 1.66602 12.5C1.66602 9.27836 4.27769 6.66669 7.49935 6.66669C10.721 6.66669 13.3327 9.27836 13.3327 12.5Z" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_370_370">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            APR(LSD)
          </span>
          {
            lsdInfoLoading ?
              <b>20</b>
              :
              <b>{lsdInfo.mainApr}</b>
          }
        </li>
        <li className='stake-block__info-item'>
          <span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_370_386)">
                <path d="M8.41686 3.33335C9.46898 2.30236 10.9099 1.66669 12.4993 1.66669C15.721 1.66669 18.3327 4.27836 18.3327 7.50002C18.3327 9.08947 17.697 10.5304 16.666 11.5826M6.24935 10.8334L7.49935 10V14.5834M6.24935 14.5834H8.74935M13.3327 12.5C13.3327 15.7217 10.721 18.3334 7.49935 18.3334C4.27769 18.3334 1.66602 15.7217 1.66602 12.5C1.66602 9.27836 4.27769 6.66669 7.49935 6.66669C10.721 6.66669 13.3327 9.27836 13.3327 12.5Z" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_370_386">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Bonus APR(LSD)
          </span>
          {
            lsdInfoLoading ?
              <b>50</b>
              :
              <b>{lsdInfo.bonusApr}</b>
          }
        </li>
        {
          lsdInfo.isBonusPeriod ?
            <li className='stake-block__info-item'>
              <span>Bonus is Active now</span>
              <b>{days} day {hours} hours {mins} minutes {secs} secs left</b>
              <p className='stake-block__info-item-progress' style={{ width: `${width}%` }}></p>
            </li>
            :
            <></>
        }
      </ul>
    </div>
  )
}

export default StakeLsdBlock
