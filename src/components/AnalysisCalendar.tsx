import React from 'react';
import avocado from '../theme/ketnip.png'
import { StoreContext } from '../store'
import { IonIcon } from '@ionic/react';
import './AnalysisCalendar.scss'
import moment from 'moment'
import { waterOutline, water, waterSharp } from 'ionicons/icons';

interface AnalysisCalendarProps {

}

const AnalysisCalendar: React.FC<AnalysisCalendarProps> = () => {

  const store = React.useContext(StoreContext);
  const daysInCurrentMonth = moment().daysInMonth();
  
  console.log(daysInCurrentMonth)
  const may = ["overbudget", 'underbudget', 'underbudget', 'underbudget', 'underbudget', 'underbudget', 'underbudget', "overbudget", "overbudget", "overbudget", 'underbudget', 'underbudget', 'underbudget', 'underbudget', 'underbudget', "overbudget", 'underbudget', 'underbudget', 'today', 'future', 'future', 'future', "future", "future", "future", 'future', 'future', 'future', 'future', 'future']

  return (

    <div id="analysis-calendar">
      <div className="calendar--wrapper">
        {may.map((day, index) => {
          if (day === 'underbudget') {
            return (
              <span key={index} style={{ margin: '0 2% 0 2%' }}>
                <IonIcon
                  size="large"
                  icon={water}
                  color="tertiary"
                />
              </span>
            )
          } else if (day === 'today') {
            return (
              <span key={index} style={{ margin: '0 2% 0 2%' }}>
                <IonIcon
                  size="large"
                  icon={waterOutline}
                  color="tertiary"
                />
              </span>
            )
          } else {
            return (
              <span key={index} style={{ margin: '0 2% 0 2%' }}>
                <IonIcon
                  size="large"
                  icon={waterOutline}
                  style={{ color: 'var(--ion-color-light-shade)' }}
                />
              </span>
            )
          }
        })}
      </div>


    </div>
  )
}

export default AnalysisCalendar;