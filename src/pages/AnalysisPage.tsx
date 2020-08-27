import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import moment from 'moment'
import './AnalysisPage.scss'
import SavingsHero from '../components/SavingsHero'
import AnalysisHero from '../components/AnalysisHero'
import AnalysisCalendar from '../components/AnalysisCalendar';

const AnalysisPage: React.FC = () => {
  const goal = "Nest Egg"

  return (
    <IonPage id="analysis-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{goal} Goal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader className="ion-no-border" collapse="condense">
          <IonToolbar>
            <IonTitle color='tertiary' size="large">{goal} Goal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SavingsHero />
        <AnalysisCalendar />
      </IonContent>
    </IonPage>
  );
};

export default AnalysisPage;
