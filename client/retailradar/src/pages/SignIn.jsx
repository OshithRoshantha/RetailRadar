import React from 'react'
import './css/SignIn.css'
import mainLogo from '../assets/icons/siteLogo01.png'

export default function SignIn() {
  return (
    <>
    <div className='main-container'>
      <img src={mainLogo} alt='Retail Radar Logo' className='logo' />
    </div>
    <div className='main-footer text-light fs-6 text-center fw-light'>
    © 2025 RetailRadar. All rights reserved. 🤖 Powered by AI. ❤️ Build by Oshith Roshantha.
    </div>
    </>
  )
}
