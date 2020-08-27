import React, { useRef, useState, useEffect } from 'react';
import { StoreContext } from '../store'
import { IonIcon, IonModal } from '@ionic/react';
import moment from 'moment'
import { informationCircle } from 'ionicons/icons';
import expenseHelpers from '../Helpers/expenseHelper';
import AnalysisInfoModal from './AnalysisInfoModal';
import './AnalysisHero.scss';

interface SavingsHeroProps {

}

const SavingsHero: React.FC<SavingsHeroProps> = () => {

  const store = React.useContext(StoreContext);
  const today = moment()
  const daysInCurrentMonth = moment().daysInMonth();
  const dayOfTheMonth = moment().date()
  const endOfMonth = moment().endOf('month');
  const daysLeftThisMonth = today.diff(endOfMonth, 'days') * -1
  const daysLeftThisMonthStr = moment().endOf('month').to(today, true);

  const [showAnalysisInfoModal, setShowAnalysisInfoModal] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  let savingsSoFar = 344;
  let goalAmountLeft = 100;


  return (
    <>
      <div id="analysis-hero">
        <div className='hero--wrapper'>
          <img className='image--wrapper' alt="Logo" />
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
          {savingsSoFar <= 0 && <h1 style={{ display: "inline" }}>-${(savingsSoFar * -1).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
          }
          {savingsSoFar > 0 && <h1 style={{ display: "inline" }}>${savingsSoFar.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
          }
          <p style={{ display: "inline", color: 'var(--ion-color-tertiary)' }}> saved this month</p>
          <div className='progress-bar-light-grey'>
            {savingsSoFar <= 0 && <div className='progress-bar-green' style={{ width: `0%`, color: 'white', textAlign: 'right', padding: '1% 3% 0 0' }}></div>}
            {savingsSoFar > 0 && <div className='progress-bar-green' style={{ width: `${dayOfTheMonth / daysInCurrentMonth * 100}%`, color: 'white', textAlign: 'right', padding: '1% 3% 0 0' }}></div>}
          </div>
          <div className='bottom-display-wrapper'>
            <p>{daysLeftThisMonthStr} left</p>
            <p>${goalAmountLeft} left</p>
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

export default SavingsHero;