import React from 'react';
import avocado from '../theme/ketnip.png'
import { StoreContext } from '../store'
import { IonIcon } from '@ionic/react';
import './AnalysisCalendar.scss'
import { waterOutline, water, waterSharp } from 'ionicons/icons';

interface AnalysisCalendarProps {

}

const AnalysisCalendar: React.FC<AnalysisCalendarProps> = () => {

  const store = React.useContext(StoreContext);

  const may = ["overbudget", 'underbudget', 'underbudget', 'underbudget', 'underbudget', 'underbudget', 'underbudget', "overbudget", "overbudget", "overbudget", 'underbudget', 'underbudget', 'underbudget', 'underbudget', 'underbudget', "overbudget", 'underbudget', 'underbudget', 'underbudget', 'overbudget', 'overbudget', 'overbudget', "overbudget", "overbudget", "overbudget", 'overbudget', 'overbudget', 'overbudget', 'overbudget', 'overbudget']

  return (

    <div id="analysis-calendar">
      <div className="calendar--wrapper">
        {may.map(day => {
          if (day === 'underbudget') {
            return (
              <span style={{ margin: '0 2% 0 2%' }}>
                <IonIcon
                  size="large"
                  icon={water}
                  color="tertiary"
                />
              </span>
            )
          } else {
            return (
              <span style={{ margin: '0 2% 0 2%' }}>
                <IonIcon
                  size="large"
                  icon={waterOutline}
                  color="tertiary"
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