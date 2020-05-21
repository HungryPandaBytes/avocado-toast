import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList, IonListHeader, IonItem, IonLabel, IonItemGroup, IonItemDivider } from '@ionic/react';
import './TransactionsPage.scss';
import TransactionList from '../components/TransactionList';
import { StoreContext } from '../store';


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
        <TransactionList searchText={searchText} />
      </IonContent>
    </IonPage >
  );
};

export default TransactionsPage;

