import React from 'react';
import './MainDisplayContainer.css';
import avocadoLogo from '../theme/avocadoLogo.png'
interface MainDisplayContainerProps {
  period: string;
  balance: number;

}
const MainDisplayContainer: React.FC<MainDisplayContainerProps> = ({ period, balance }) => {
  const mainDisplayView = balance > 0 ? "display-container--positive" : "display-container--negative"

  return (
    <>
      <h1>{period}</h1>
      <div className={mainDisplayView}>
        <div className='toast-mascot-wrapper'>
          <img src={avocadoLogo} alt="Logo" />
        </div>
        <div className='chart-wrapper'>sdfsdfs</div>
      </div>
    </>
  )
}

export default MainDisplayContainer;