import React from 'react';
import avocado from '../theme/ketnip.png'
import { StoreContext } from '../store'
import './AnalysisHero.scss';
import { IonIcon } from '@ionic/react';
import moment from 'moment'
import { waterOutline, informationCircle, information, informationOutline } from 'ionicons/icons';

interface AnalysisHeroProps {

}

const AnalysisHero: React.FC<AnalysisHeroProps> = () => {

  const store = React.useContext(StoreContext);
  const daysInCurrentMonth = moment().daysInMonth();
  const dayOfTheMonth = moment().date()

  function savingsThisMonth() {
    // ToDo: aggregate all the expenses for the current Month and make totalExpenseThisMonth dynamic
    let totalExpenseThisMonth = 1000
    let budgetPerMonth = store.budget.budgetPerDay * dayOfTheMonth;
    budgetPerMonth -= totalExpenseThisMonth
    return budgetPerMonth
  }

  const savingsSoFar = savingsThisMonth();
  const numberOfDaysLeft = daysInCurrentMonth - dayOfTheMonth;

  return (
    <div id="analysis-hero">
      <div className='hero--wrapper'>
        <img className='image--wrapper' src={avocado} alt="Logo" />
      </div>
      <span >
        <IonIcon
          size="large"
          icon={informationCircle}
          color="medium"
        />
      </span>
      <div className='progress-bar-wrapper'>
        <h1 style={{ display: "inline" }}>${savingsSoFar.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1><p style={{ display: "inline", color: 'var(--ion-color-tertiary)' }}> saved this month</p>
        <div className='progress-bar-light-grey'>
          <div className='progress-bar-green' style={{ width: `${dayOfTheMonth / daysInCurrentMonth * 100}%`, color: 'white', textAlign: 'right' }}>{numberOfDaysLeft} days left</div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisHero;