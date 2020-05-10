import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AnalysisPage.scss';

const AnalysisPage: React.FC = () => {
  return (
    <IonPage id="analysis-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Set Analysis</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Set Analysis</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Set Analysis page" />
      </IonContent>
    </IonPage>
  );
};

export default AnalysisPage;
