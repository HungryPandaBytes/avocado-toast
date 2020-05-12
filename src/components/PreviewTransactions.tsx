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
    <IonList ref={transactionListRef} lines="full">
      <IonListHeader
        ref={headerRef}
        id="transactionListHeader"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <h4 style={{ width: "85%" }}>Today</h4>
        <span style={{ width: "15%" }}>
          <IonIcon
            icon={chevronUpOutline}
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