import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList, IonListHeader, IonItem, IonLabel, IonItemGroup, IonItemDivider } from '@ionic/react';
import './TransactionsPage.scss';
import TransactionItem from '../components/TransactionItem';
import { StoreContext } from '../store';


const TransactionsPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const store = React.useContext(StoreContext);
  const groupedTransactions = groupTransactionsByDate(store.transactions);

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

        <IonList lines="full">
          {store.transactions.length > 0 &&
            Object.keys(groupedTransactions).map((date: string, index: number) => (
              <IonItemGroup key={`group-${index}`}>
                <IonItemDivider sticky>
                  <IonLabel>{date}</IonLabel>
                </IonItemDivider>
                {groupedTransactions[date].map((transaction: any, index: number) => (
                  <TransactionItem transaction={transaction} key={index} />
                ))}
              </IonItemGroup>
            ))}
          {store.transactions.length === 0 && (
            <IonItem>
              <IonLabel>Add a transaction</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TransactionsPage;

const groupTransactionsByDate = (transactions: any) => {
  let groups: any = {};

  transactions.map((transaction: any) => {
    var date = new Date(transaction.transaction_time)
    var dateString = date.toDateString().slice(4);
    if (groups.hasOwnProperty(dateString)) {
      groups[dateString].push(transaction)
    } else {
      groups[dateString] = [transaction]
    }
  })
  transactions.sort((a: any, b: any) => Date.parse(b.transaction_time) - Date.parse(a.transaction_time))

  return groups;
}