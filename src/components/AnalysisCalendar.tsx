import React from 'react';
import avocado from '../theme/ketnip.png'
import { StoreContext } from '../store'
import { IonIcon } from '@ionic/react';
import { waterOutline } from 'ionicons/icons';

interface AnalysisCalendarProps {

}

const AnalysisCalendar: React.FC<AnalysisCalendarProps> = () => {

  const store = React.useContext(StoreContext);


  return (
    <div id="analysis-hero">
      <div className='hero--wrapper'>
        <img className='image--wrapper' src={avocado} alt="Logo" />

      </div>
      <span >
        <IonIcon
          size="medium"
          icon={waterOutline}
          color="medium"
        />
      </span>
    </div>
  )
}

export default AnalysisCalendar;