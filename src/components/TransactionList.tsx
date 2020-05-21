import React from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
} from "@ionic/react";
import { StoreContext } from '../store';
import TransactionItem from "./TransactionItem";
import { useObserver } from "mobx-react";

interface TransactionListProps {
  searchText: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ searchText }) => {
  const store = React.useContext(StoreContext);

  const groupedTransactions = groupTransactionsByDate(store.transactions);
  const filteredTransactionsBySearch = filteredTransactions(store.transactions, searchText);
  const groupedFilteredTransactions = groupTransactionsByDate(filteredTransactionsBySearch)

  return useObserver(() => (
    <IonList lines="full">
      {(store.transactions.length > 0 && searchText !== "") &&
        Object.keys(groupedFilteredTransactions).map((date: string, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel color='medium'>{date}</IonLabel>
            </IonItemDivider>
            {groupedFilteredTransactions[date].map((transaction: any, index: number) => (
              <TransactionItem transaction={transaction} ignoreTransaction={store.ignoreTransaction} key={index} />
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
              <TransactionItem transaction={transaction} ignoreTransaction={store.ignoreTransaction} key={index} />
            ))}
          </IonItemGroup>
        ))}
      {store.transactions.length === 0 && (
        <IonItem>
          <IonLabel>Add a transaction</IonLabel>
        </IonItem>
      )}
    </IonList>

  ));
};

export default TransactionList;

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