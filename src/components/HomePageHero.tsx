import React from 'react';
import './HomePageHero.scss';
import avocadoLogo from '../theme/teen_avocado.png'
import burntToastLogo from '../theme/Burnt_toast.png'
import { StoreContext } from '../store';
import moment from 'moment';

interface HomePageHeroProps {
  period: string;
  balance: number;
  spent: number;
}

const HomePageHero: React.FC<HomePageHeroProps> = ({ period, balance, spent }) => {
  const store = React.useContext(StoreContext);

  const displayStyling = balance > 0 ? "display-container display-container--positive" : "display-container display-container--negative"
  const progressbarStyling = balance > 0 ? "progress-bar-green" : "progress-bar-red"
  const progressBarPercentage = Math.ceil(spent / (balance + spent) * 100)
  const mascot = balance > 0 ? avocadoLogo : burntToastLogo
  const today = moment();
  const timeLeftToday = moment().endOf('day').to(today, true);
  const daysLeftThisWeek = moment().endOf('isoWeek').to(today, true);
  const daysLeftThisMonth = moment().endOf('month').to(today, true);

  return (
    <div id="main-display-container" style={{ textAlign: "left" }}>
      <h1>{period}</h1>
      <div className={displayStyling}>
        <div className='mascot-wrapper'>
          <img src={mascot} alt="Logo" />
        </div>
        <div className='progress-bar-wrapper'>
          {<h1>${balance.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>}
          {(period === 'Daily') && <p style={{ display: "inline" }}> in my pocket</p>}
          {(period === 'Weekly' || period === 'Monthly') && <p style={{ display: "inline" }}> left</p>}
          <div className='progress-bar-light-grey'>
            <div className={progressbarStyling} style={{ width: `${progressBarPercentage}%` }}></div>
          </div>
          <div className='bottom-display-wrapper'>
            {(period === 'Daily') && <div>{timeLeftToday} left</div>}
            {(period === 'Weekly') && <div>{daysLeftThisWeek} left</div>}
            {(period === 'Monthly') && <div>{daysLeftThisMonth} left</div>}
            <div>${spent} spent</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageHero;