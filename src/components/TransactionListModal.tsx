import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonTitle,
  IonItemGroup,
  IonItemDivider,
} from "@ionic/react";
import TransactionItem from "./TransactionItem";

const transactions = [{ id: 1, amount: 23, description: "Restaurant" }, { id: 1, amount: 23, description: "Restaurant" }, { id: 1, amount: 23, description: "Restaurant" }]

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

const TransactionListModal = () => {

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton >Cancel</IonButton>
          </IonButtons>

          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines="full">
          {transactions.length > 0 &&
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
          {transactions.length === 0 && (
            <IonItem>
              <IonLabel>Add a transaction</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </>
  );
};

export default TransactionListModal