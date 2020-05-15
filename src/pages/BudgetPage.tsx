import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import BudgetHero from '../components/BudgetHero';
import './BudgetPage.scss';
import BudgetInput from '../components/BudgetInput';

const BudgetPage: React.FC = () => {

  return (
    <IonPage id="budget-page">
      <IonHeader className="ion-no-border">
        <IonToolbar >
          <IonTitle>Budget</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader className="ion-no-border" collapse="condense">
          <IonToolbar>
            <IonTitle color='primary' size="large">Budget</IonTitle>
          </IonToolbar>
        </IonHeader>
        <BudgetHero />
        <BudgetInput />
      </IonContent>
    </IonPage>
  );
};

export default BudgetPage;
