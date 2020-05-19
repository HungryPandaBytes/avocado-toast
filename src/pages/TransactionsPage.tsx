import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList, IonListHeader, IonItem, IonLabel, IonItemGroup, IonItemDivider } from '@ionic/react';
import './TransactionsPage.scss';
import TransactionItem from '../components/TransactionItem';
import { StoreContext } from '../store';
import { useObserver } from 'mobx-react';


const TransactionsPage: React.FC = () => {
  const store = React.useContext(StoreContext);

  const [searchText, setSearchText] = useState("");
  const groupedTransactions = groupTransactionsByDate(store.transactions);
  const filteredTransactionsBySearch = filteredTransactions(store.transactions, searchText);
  const groupedFilteredTransactions = groupTransactionsByDate(filteredTransactionsBySearch)

  return useObserver(() => (
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
          {(store.transactions.length > 0 && searchText !== "") &&
            Object.keys(groupedFilteredTransactions).map((date: string, index: number) => (
              <IonItemGroup key={`group-${index}`}>
                <IonItemDivider sticky>
                  <IonLabel color='medium'>{date}</IonLabel>
                </IonItemDivider>
                {groupedFilteredTransactions[date].map((transaction: any, index: number) => (
                  <TransactionItem transaction={transaction} key={index} />
                ))}
              </IonItemGroup>
            ))}

          {(store.transactions.length > 0 && searchText === "") &&
            Object.keys(groupedTransactions).map((date: string, index: number) => (
              <IonItemGroup key={`group-${index}`}>
                <IonItemDivider sticky>
                  <IonLabel color='medium'>{date}</IonLabel>
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
    </IonPage >
  ));
};

export default TransactionsPage;

const groupTransactionsByDate = (transactions: any) => {
  let groups: any = {};

  const sortedTransactions = transactions.slice().sort((a: any, b: any) => Date.parse(b.transaction_time) - Date.parse(a.transaction_time));

  sortedTransactions.map((transaction: any) => {
    var date = new Date(transaction.transaction_time)
    var dateString = date.toDateString().slice(4);
    if (groups.hasOwnProperty(dateString)) {
      groups[dateString].push(transaction)
    } else {
      groups[dateString] = [transaction]
    }
  })


  return groups;
}


const filteredTransactions = (transactions: any, searchText: string) => {
  return transactions.filter((transaction: any) => transaction.description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
}