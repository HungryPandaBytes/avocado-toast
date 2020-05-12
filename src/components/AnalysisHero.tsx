import React from 'react';
import avocadoLogo from '../theme/ketnip.png'

interface AnalysisHeroProps {
  period: string;
  balance: number;
  spent: number;
}

const AnalysisHero: React.FC<AnalysisHeroProps> = ({ period, balance, spent }) => {
  const displayStyling = balance > 0 ? "display-container display-container--positive" : "display-container display-container--negative"
  const progressbarStyling = balance > 0 ? "progress-bar-green" : "progress-bar-brown"
  const progressBarPercentage = Math.ceil(spent / (balance + spent) * 100)


  return (
    <div id="main-display-container">
      <h1>{period}</h1>
      <div className={displayStyling}>
        <div className='mascot-wrapper'>
          <img src={avocadoLogo} alt="Logo" />
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

export default AnalysisHero;