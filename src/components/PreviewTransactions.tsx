import React, { useRef, useState } from "react";

import {
  IonItem,
  IonLabel,
  IonIcon,
  IonList,
  IonListHeader,
} from "@ionic/react";
import {
  basketOutline,
  logoAmazon,
  carOutline,
  cafeOutline,
  chevronUpOutline,
  chevronDownOutline,
} from "ionicons/icons";
import TransactionItem from "./TransactionItem";

interface PreviewTransactionsProps {
  transactions: any
}
const PreviewTransactions: React.FC<PreviewTransactionsProps> = ({
  transactions
}) => {

  const headerRef = useRef<HTMLIonListHeaderElement>(null);
  const transactionListRef = useRef<HTMLIonListElement>(null);

  return (
    <IonList ref={transactionListRef} lines="full" style={{ marginTop: '15%' }}>
      <IonListHeader
        ref={headerRef}
        id="transactionListHeader"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <h4 style={{ width: "50%", textAlign: "right", color: 'var(--ion-color-primary)' }}>Today</h4>
        <span style={{ width: "50%", textAlign: "left" }}>
          <IonIcon
            icon={chevronDownOutline}
            style={{ verticalAlign: "super" }}
            color="medium"
          />
        </span>
      </IonListHeader>

      {transactions.length > 0 &&
        transactions
          .slice(0, 3)
          .map((transaction: any, index: number) => (
            <TransactionItem
              transaction={transaction}
              key={index}
            />
          ))}

      {transactions.length === 0 && (
        <IonItem>
          <IonLabel>Add a transaction</IonLabel>
        </IonItem>
      )}
    </IonList>

  );
};

export default PreviewTransactions;