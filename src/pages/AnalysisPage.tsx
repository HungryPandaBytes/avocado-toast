import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AnalysisPage.scss'
import AnalysisHero from '../components/AnalysisHero'
import AnalysisCalendar from '../components/AnalysisCalendar';

const AnalysisPage: React.FC = () => {
  return (
    <IonPage id="analysis-page">
      <IonHeader className="ion-no-border">
        <IonToolbar >
          <IonTitle>Analysis</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense" className="ion-no-border">
          <IonToolbar >
            <h1>May</h1>
          </IonToolbar>
        </IonHeader>
        <AnalysisHero />
        <AnalysisCalendar />
        <div className='notification-wrapper'>
          <p style={{
            margin: '0 2% 0 2%',
            alignSelf: "center",
            textAlign: 'center'
          }}>You're growing your avocado! You spent $543 and saved $245 so far this month.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AnalysisPage;
