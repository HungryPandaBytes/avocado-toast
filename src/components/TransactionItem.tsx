import React, { useRef, useState } from "react";
import Moment from 'react-moment';
import { StoreContext } from '../store';
import { iconsHashMap } from './AllCategories';
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonNote,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/react";


interface TransactionItemProps {
  transaction: any
  preview?: boolean
}
const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction, preview
}) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const transactionColor = transaction.ignore ? "grey" : "var(--ion-color-primary)"
  const transactionIconColor = transaction.ignore ? "medium" : getIconColor('basket-outline')
  const store = React.useContext(StoreContext);

  const deleteTransactionHandler = () => {
    store.deleteTransaction(transaction.id)
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  // TODO: need category from backend to map correct icon to the transaction
  transaction = { ...transaction, iconName: "basket-outline" };

  return (
    <IonItemSliding ref={ionItemSlidingRef} key={transaction.id}>
      <IonItem lines="none" style={{
        borderLeft: "2px", paddingLeft: "2%"
      }}>
        < IonIcon
          color={transactionIconColor}
          icon={iconsHashMap[transaction.category_name]}
          key={transaction.id}
        ></IonIcon>
        <IonLabel style={{ color: `${transactionColor}`, borderLeft: "2px", paddingLeft: "4%" }}>
          <h2 style={{ color: `${transactionColor}` }} >{transaction.description}</h2>
          <IonNote>
            <p>
              <Moment fromNow>{transaction.transaction_time}</Moment>
            </p>
          </IonNote>
        </IonLabel>
        {transaction.transaction_type !== 'Income' &&
          <IonLabel class="ion-text-right" style={{ marginRight: "10%" }} color='medium'>
            -${parseInt(transaction.amount).toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
          </IonLabel>}
        {transaction.transaction_type === 'Income' &&
          <IonLabel class="ion-text-right" style={{ marginRight: "10%" }} color='medium'>
            +${parseInt(transaction.amount).toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
          </IonLabel>}
      </IonItem >
      {!preview && <IonItemOptions>
        {/* TODO: update user id for deleteTransaction  */}
        <IonItemOption
          color="danger"
          onClick={deleteTransactionHandler}
        >
          Remove
        </IonItemOption>
      </IonItemOptions>}
    </IonItemSliding >

  );
};

export default TransactionItem;

const getIconColor: any = (iconName: string) => {
  const mapping: any = {
    "basket-outline": "danger",
    "logo-amazon": "danger",
    "car-outline": "danger",
    "cafe-outline": "danger",
  };

  return mapping[iconName];
};