import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AnalysisPage.scss';

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
            <IonTitle size="large">May</IonTitle>
          </IonToolbar>
        </IonHeader>

      </IonContent>
    </IonPage>
  );
};

export default AnalysisPage;
