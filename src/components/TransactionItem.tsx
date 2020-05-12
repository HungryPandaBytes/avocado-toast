import React, { useRef, useState } from "react";
import Moment from 'react-moment';

import {
  IonItem,
  IonLabel,
  IonIcon,
  IonNote,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/react";
import {
  basketOutline,
  logoAmazon,
  carOutline,
  cafeOutline,
} from "ionicons/icons";

interface TransactionItemProps {
  transaction: any;
}
const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction
}) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const transactionColor = transaction.ignore ? "medium" : "default"
  const transactionIconColor = transaction.ignore ? "medium" : getIconColor('basket-outline')

  const ignoreHandler = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  // TODO: need category from backend to map correct icon to the transaction
  transaction = { ...transaction, iconName: "basket-outline" };
  return (

    <IonItemSliding ref={ionItemSlidingRef} key={transaction.id}>
      <IonItem lines="none" style={{ "border-left": "2px", "padding-left": "2%" }}>
        <IonIcon
          color={transactionIconColor}
          icon={getIcon(transaction.iconName)}
          key={transaction.id}
        ></IonIcon>
        <IonLabel style={{ "border-left": "2px", "padding-left": "3%" }} 
        >
          <h2 style={{ color: 'var(--ion-color-primary)' }} >{transaction.description}</h2>
          <IonNote>
            <p>
              <Moment fromNow>{transaction.transaction_time}</Moment>
            </p>
          </IonNote>
        </IonLabel>
        <IonLabel class="ion-text-right" style={{ marginRight: "10%" }} color='medium'
        >
          -$
          {parseInt(transaction.amount).toLocaleString(navigator.language, {
            minimumFractionDigits: 0,
          })}
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption
          onClick={ignoreHandler}
          color="medium"
        >
          Ignore
        </IonItemOption>
        {/* TODO: update user id for deleteTransaction  */}
        <IonItemOption
          color="danger"
        >
          Remove
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding >

  );
};

export default TransactionItem;

const getIcon: any = (iconName: string) => {
  const mapping: any = {
    "basket-outline": basketOutline,
    "logo-amazon": logoAmazon,
    "car-outline": carOutline,
    "cafe-outline": cafeOutline,
  };

  return mapping[iconName];
};

const getIconColor: any = (iconName: string) => {
  const mapping: any = {
    "basket-outline": "danger",
    "logo-amazon": "success",
    "car-outline": "warning",
    "cafe-outline": "tertiary",
  };

  return mapping[iconName];
};