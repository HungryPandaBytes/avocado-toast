import React from 'react';
import './HomePageHero.scss';
import avocadoLogo from '../theme/ketnip.png'
import burntToastLogo from '../theme/burnt-toast.png'

interface HomePageHeroProps {
  period: string;
  balance: number;
  spent: number;
}

const HomePageHero: React.FC<HomePageHeroProps> = ({ period, balance, spent }) => {
  const displayStyling = balance > 0 ? "display-container display-container--positive" : "display-container display-container--negative"
  const progressbarStyling = balance > 0 ? "progress-bar-green" : "progress-bar-brown"
  const progressBarPercentage = Math.ceil(spent / (balance + spent) * 100)
  const mascot = balance > 0 ? avocadoLogo : burntToastLogo


  return (
    <div id="main-display-container">
      <h1>{period}</h1>
      <div className={displayStyling}>
        <div className='mascot-wrapper'>
          <img src={mascot} alt="Logo" />
        </div>
        <div className='progress-bar-wrapper'>
          <h1>${spent}</h1><p style={{ display: "inline" }}> spent</p>
          <div className='progress-bar-light-grey'>
            <div className={progressbarStyling} style={{ width: `${progressBarPercentage}%` }}></div>
          </div>
          <p>${balance} left</p>
        </div>
      </div>
    </div>
  )
}

export default HomePageHero;