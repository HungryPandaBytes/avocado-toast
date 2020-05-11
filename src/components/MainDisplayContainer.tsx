import React from 'react';
import './MainDisplayContainer.scss';
import avocadoLogo from '../theme/avocado.png'

interface MainDisplayContainerProps {
  period: string;
  balance: number;
}

const MainDisplayContainer: React.FC<MainDisplayContainerProps> = ({ period, balance }) => {
  const mainDisplayView = balance > 0 ? "display-container--positive" : "display-container--negative"

  return (
      <div id="main-display-container">
        <h1>{period}</h1>
        <div className={mainDisplayView}>
          <div className='mascot-wrapper'>
            <img src={avocadoLogo} alt="Logo" />
          </div>
          <div className='progress-bar-wrapper'>
            <h1>${balance} </h1><p style={{ display: "inline" }}>spent</p>
            <div className='progress-bar-light-grey'>
              <div className='progress-bar-green'></div>
            </div>
            <p>$34 leftover</p>
          </div>
        </div>
      </div>
  )
}

export default MainDisplayContainer;