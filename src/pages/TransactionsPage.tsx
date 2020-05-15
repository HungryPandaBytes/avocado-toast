import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './TransactionsPage.scss';

const TransactionsPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <IonPage id="transactions-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader className="ion-no-border" collapse="condense">
          <IonToolbar>
            <IonTitle color='primary' size="large">Transactions</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Transactions" />

      </IonContent>
    </IonPage>
  );
};

export default TransactionsPage;
