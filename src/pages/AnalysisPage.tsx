import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AnalysisPage.scss'
import AnalysisHero from '../components/AnalysisHero'
import AnalysisCalendar from '../components/AnalysisCalendar';

const AnalysisPage: React.FC = () => {
  return (
    <IonPage id="analysis-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Analysis</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader className="ion-no-border" collapse="condense">
          <IonToolbar>
            <IonTitle color='tertiary' size="large">Analysis</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AnalysisHero />
        <AnalysisCalendar />
        <div className='notification-wrapper'>
          <p style={{
            margin: '0 2% 0 2%',
            alignSelf: "center",
            textAlign: 'center'
          }}>Good job on growing your avocado! You spent less than what you budgeted on most days and saved $245 so far this month.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AnalysisPage;
