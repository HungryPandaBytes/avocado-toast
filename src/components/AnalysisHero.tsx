import React from 'react';
import avocado from '../theme/ketnip.png'
import { StoreContext } from '../store'
import './AnalysisHero.scss';
import { IonIcon } from '@ionic/react';
import { waterOutline, informationCircle, information, informationOutline } from 'ionicons/icons';

interface AnalysisHeroProps {

}

const AnalysisHero: React.FC<AnalysisHeroProps> = () => {

  const store = React.useContext(StoreContext);


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
        <h1 style={{ display: "inline" }}>$245</h1><p style={{ display: "inline", color: 'var(--ion-color-tertiary)' }}> saved </p>
        <div className='progress-bar-light-grey'>
          <div className='progress-bar-green' style={{ width: `65%`, color: 'white', textAlign: 'right' }}>10 days left</div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisHero;