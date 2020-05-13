import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import BudgetHero from '../components/BudgetHero';
import './BudgetPage.scss';
import BudgetInput from '../components/BudgetInput';

const BudgetPage: React.FC = () => {
  return (
    <IonPage id="budget-page">
      <IonContent>
        <IonHeader collapse="condense" className="ion-no-border">
          <IonToolbar >
            <h1>Set Budget</h1>
          </IonToolbar>
        </IonHeader>

        <BudgetHero />
        <BudgetInput />

      </IonContent>
    </IonPage>
  );
};

export default BudgetPage;
