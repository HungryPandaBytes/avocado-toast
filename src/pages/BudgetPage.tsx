import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import BudgetHero from '../components/BudgetHero';
import './BudgetPage.scss';

const BudgetPage: React.FC = () => {
  return (
    <IonPage id="budget-page">
      <IonHeader className="ion-no-border">
        <IonToolbar >
          <IonTitle>Set Budget</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense" className="ion-no-border">
          <IonToolbar >
            <h1>Set Budget</h1>
          </IonToolbar>
        </IonHeader>
        <BudgetHero />
      </IonContent>
    </IonPage>
  );
};

export default BudgetPage;
