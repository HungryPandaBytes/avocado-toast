import React, { useRef, useState } from 'react';
import { StoreContext } from '../store'
import { IonIcon, IonModal } from '@ionic/react';
import moment from 'moment'
import babySeed from '../theme/baby_seed.png'
import babyAvocado from '../theme/baby_avocado.png'
import teenAvocado from '../theme/geeky_avocado.png'
import adultAvocado from '../theme/avocado_teen_cap.png'
import avocadoToast from '../theme/avo_slice_toast.png'
import { informationCircle } from 'ionicons/icons';
import { currentWeeksTransactions } from '../Helpers/transactionsHelper';
import AnalysisInfoModal from './AnalysisInfoModal';
import './AnalysisHero.scss';

interface AnalysisHeroProps {

}

const AnalysisHero: React.FC<AnalysisHeroProps> = () => {

  const store = React.useContext(StoreContext);
  const today = moment()
  const daysInCurrentMonth = moment().daysInMonth();
  const dayOfTheMonth = moment().date()
  const daysLeftThisMonth = parseInt(moment().endOf('month').to(today, true));
  const daysLeftThisMonthStr = moment().endOf('month').to(today, true);

  const [showAnalysisInfoModal, setShowAnalysisInfoModal] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

  function underBudgetPercentThisMonth() {
    // TODO replace overbudgetThisMonth with global state
    const overbudgetThisMonth = [2, 3, 4, 8, 10];
    const numberOfUnderbudgetDays = daysInCurrentMonth - daysLeftThisMonth - overbudgetThisMonth.length;
    return numberOfUnderbudgetDays / daysInCurrentMonth;
  }

  function getAvocadoIconBasedOnSavings(underBudgetPercentThisMonth: number) {
    let avocado = babySeed;
    if (underBudgetPercentThisMonth <= 20) {
      avocado = babySeed;
    } else if (underBudgetPercentThisMonth > 20 && underBudgetPercentThisMonth < 40) {
      avocado = babyAvocado;
    } else if (underBudgetPercentThisMonth >= 40 && underBudgetPercentThisMonth < 60) {
      avocado = teenAvocado;
    } else if (underBudgetPercentThisMonth >= 60 && underBudgetPercentThisMonth < 80) {
      avocado = adultAvocado;
    } else if (underBudgetPercentThisMonth >= 80 && underBudgetPercentThisMonth <= 100) {
      avocado = avocadoToast;
    }
    return avocado;
  }

  function savingsThisMonth() {
    // ToDo: aggregate all the expenses for the current Month and make totalExpenseThisMonth dynamic
    let totalExpenseThisMonth = 1000
    let budgetPerMonth = store.budget.budgetPerDay * dayOfTheMonth;
    budgetPerMonth -= totalExpenseThisMonth
    return budgetPerMonth
  }

  const underBudgetPercentage = underBudgetPercentThisMonth() * 100;
  const savingsSoFar = savingsThisMonth();
  const avocadoHero = getAvocadoIconBasedOnSavings(underBudgetPercentage);

  return (
    <>
      <div id="analysis-hero">
        <div className='hero--wrapper'>
          <img className='image--wrapper' src={avocadoHero} alt="Logo" />
        </div>
        <span style={{ right: '20%', position: 'absolute' }}>
          <IonIcon
            size="large"
            icon={informationCircle}
            color="medium"
            onClick={() => setShowAnalysisInfoModal(true)}
          />
        </span>
        <div className='progress-bar-wrapper'>
          <h1 style={{ display: "inline" }}>${savingsSoFar.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1><p style={{ display: "inline", color: 'var(--ion-color-tertiary)' }}> saved this month</p>
          <div className='progress-bar-light-grey'>
            <div className='progress-bar-green' style={{ width: `${dayOfTheMonth / daysInCurrentMonth * 100}%`, color: 'white', textAlign: 'right', padding: '1% 3% 0 0' }}>{daysLeftThisMonthStr} left</div>

          </div>
        </div>
      </div>
      <IonModal
        isOpen={showAnalysisInfoModal}
        onDidDismiss={() => setShowAnalysisInfoModal(false)}
        swipeToClose={true}
        presentingElement={pageRef.current!}
      >
        <AnalysisInfoModal
          onClose={() => setShowAnalysisInfoModal(false)}
        />
      </IonModal>
    </>
  )
}

export default AnalysisHero;