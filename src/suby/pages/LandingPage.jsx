import React from 'react'
import TopBar from '../components/TopBar'
import HomePage from './HomePage'

const LandingPage = () => {
  return (
    <div>
        <TopBar />
        <div className="landingSection">
       
        <HomePage/>
        </div>
    </div>
  )
}

export default LandingPage