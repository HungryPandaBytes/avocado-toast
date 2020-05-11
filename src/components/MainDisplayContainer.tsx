import React from 'react';
import './MainDisplayContainer.scss';
import avocadoLogo from '../theme/avocado.png'
import burntToastLogo from '../theme/burnt-toast.png'

interface MainDisplayContainerProps {
  period: string;
  balance: number;
  spent: number;
}

const MainDisplayContainer: React.FC<MainDisplayContainerProps> = ({ period, balance, spent }) => {
  const displayStyling = balance > 0 ? "display-container display-container--positive" : "display-container display-container--negative"
  const progressbarStyling = balance > 0 ? "progress-bar-green" : "progress-bar-brown"
  const mascot = balance > 0 ? avocadoLogo : burntToastLogo
  const progressBarPercentage = spent / (balance + spent)

  console.log(progressBarPercentage)

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
            <div className={progressbarStyling} style={{ width: `${progressBarPercentage * 100}%` }}></div>
          </div>
          <p>${balance} left</p>
        </div>
      </div>
    </div>
  )
}

export default MainDisplayContainer;