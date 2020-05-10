import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './BudgetPage.scss';

const BudgetPage: React.FC = () => {
  return (
    <IonPage id="budget-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Set Budget</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Set Budget</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Set Budget page" />
      </IonContent>
    </IonPage>
  );
};

export default BudgetPage;
