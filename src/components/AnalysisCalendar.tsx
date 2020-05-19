import React from 'react';
import { StoreContext } from '../store'
import { IonIcon } from '@ionic/react';
import './AnalysisCalendar.scss'
import moment from 'moment'
import { waterOutline, water } from 'ionicons/icons';

interface AnalysisCalendarProps {

}

const AnalysisCalendar: React.FC<AnalysisCalendarProps> = () => {

  const store = React.useContext(StoreContext);

  // To Do: set up overbudgetThisMonth in global state and modify the makeCalendarArray
  const overbudgetThisMonth = [2, 3, 4, 8, 10]

  function makeCalendarArray() {
    const daysInCurrentMonth = moment().daysInMonth();
    const dayOfTheMonth = moment().date()
    const calendarArray = []
    let pointer = 0;
    for (var i = 1; i < daysInCurrentMonth; i++) {
      if (i > dayOfTheMonth) {
        calendarArray.push('future')
      } else if (i === dayOfTheMonth) {
        calendarArray.push('today')
      } else if (i === overbudgetThisMonth[pointer]) {
        calendarArray.push('overbudget')
        pointer++;
      } else {
        calendarArray.push('underbudget')
      }
    }
    return calendarArray;
  }

  const calendarArray = makeCalendarArray();

  return (

    <div id="analysis-calendar">
      <div className="calendar--wrapper">
        {calendarArray.map((day, index) => {
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