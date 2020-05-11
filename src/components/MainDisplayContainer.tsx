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
    <>
      <div id="main-display-container">
        <h1>{period}</h1>
        <div className={mainDisplayView}>
          <div className='mascot-wrapper'>
            <img src={avocadoLogo} alt="Logo" />
          </div>
          <div className='chart-wrapper'>sdfsdfs</div>
        </div>
      </div>

    </>
  )
}

export default MainDisplayContainer;