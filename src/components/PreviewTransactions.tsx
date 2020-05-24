import React, { useRef } from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import TransactionItem from "./TransactionItem";

interface PreviewTransactionsProps {
  transactions: any;
  ignoreTransaction: any;
}

const maxCountForTransactions = 5;

const PreviewTransactions: React.FC<PreviewTransactionsProps> = ({
  transactions, ignoreTransaction
}) => {

  const headerRef = useRef<HTMLIonListHeaderElement>(null);
  const transactionListRef = useRef<HTMLIonListElement>(null);
  const sortedTransactions = transactions.slice().sort((a: any, b: any) => Date.parse(b.transaction_time) - Date.parse(a.transaction_time));
  return (
    <IonList ref={transactionListRef} lines="full" style={{ marginTop: '5%' }}>
      <IonListHeader
        ref={headerRef}
        id="transactionListHeader"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <h4 style={{ width: '90%', textAlign: "center", color: 'var(--ion-color-primary)' }}>Today </h4>

      </IonListHeader>

      {sortedTransactions.length > 0 &&
        sortedTransactions
          .slice(0, maxCountForTransactions)
          .map((transaction: any, index: number) => (
            <TransactionItem
              transaction={transaction}
              ignoreTransaction={ignoreTransaction}
              key={index}
            />
          ))}

      {sortedTransactions.length === 0 && (
        <IonItem>
          <IonLabel>Add a transaction</IonLabel>
        </IonItem>
      )}
    </IonList>

  );
};

export default PreviewTransactions;