import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './TransactionsPage.scss';

const TransactionsPage: React.FC = () => {
  return (
    <IonPage id="transactions-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Transactions</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Transactions" />
      </IonContent>
    </IonPage>
  );
};

export default TransactionsPage;
