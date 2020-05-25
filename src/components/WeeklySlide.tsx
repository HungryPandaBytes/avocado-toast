import React from "react";
import { StoreContext } from "../store";
import { IonList, IonItem, IonLabel } from "@ionic/react";
import { currentWeeksTransactions } from "../Helpers/transactionsHelper";
import { Transaction } from "../models/Transaction";

const loadCategories = (transactions: Transaction[]): {[key: string]: number} => {
  const categories: { [key: string]: number } = {};

  currentWeeksTransactions(transactions).forEach((transaction: Transaction) => {
    if (categories.hasOwnProperty(transaction.category_name)) {
      categories[transaction.category_name] += transaction.amount;
    } else {
      categories[transaction.category_name] = transaction.amount;
    }
  });

  return categories;
};

const WeeklySlide: React.FC = () => {
  const store = React.useContext(StoreContext);
  const categories: {[key: string]: number} = loadCategories(store.transactions);

  return (
    <IonList>
      {Object.keys(categories).map((category_name: string) => {
        return (
          <IonItem key={category_name}>
            <IonLabel>
              {category_name}: {categories[category_name]}
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default WeeklySlide;