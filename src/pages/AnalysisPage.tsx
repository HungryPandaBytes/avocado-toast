import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AnalysisPage.scss'
import AnalysisHero from '../components/AnalysisHero'

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
      </IonContent>
    </IonPage>
  );
};

export default AnalysisPage;
