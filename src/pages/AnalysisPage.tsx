import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import moment from 'moment'
import './AnalysisPage.scss'
import AnalysisHero from '../components/AnalysisHero'
import AnalysisCalendar from '../components/AnalysisCalendar';

const AnalysisPage: React.FC = () => {
  const currentMonth = "May";

  return (
    <IonPage id="analysis-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{currentMonth}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader className="ion-no-border" collapse="condense">
          <IonToolbar>
            <IonTitle color='tertiary' size="large">{currentMonth}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AnalysisHero />
        <AnalysisCalendar />
      </IonContent>
    </IonPage>
  );
};

export default AnalysisPage;
