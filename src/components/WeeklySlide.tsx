import React from "react";
import { IonList, IonItem, IonLabel, IonIcon } from "@ionic/react";
import { Transaction } from "../models/Transaction";
import { basketOutline } from "ionicons/icons";

const loadCategories = (transactions: Transaction[]): {[key: string]: number} => {
  const categories: { [key: string]: number } = {};

  transactions.forEach((transaction: Transaction) => {
    if (categories.hasOwnProperty(transaction.category_name)) {
      categories[transaction.category_name] += transaction.amount;
    } else {
      categories[transaction.category_name] = transaction.amount;
    }
  });

  return categories;
};

interface WeeklySlideProps {
  transactions: Transaction[]
}

const WeeklySlide: React.FC<WeeklySlideProps> = ({ transactions }) => {
  const categories: {[key: string]: number} = loadCategories(transactions);

  return (
    <IonList lines="none">
      {Object.keys(categories).map((category_name: string) => {
        return (
          <IonItem key={category_name}>
            <IonIcon icon={basketOutline} slot="start"></IonIcon>
            <IonLabel slot="start">
              {category_name}
            </IonLabel>
            <IonLabel slot="end">
              {categories[category_name]}
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default WeeklySlide;