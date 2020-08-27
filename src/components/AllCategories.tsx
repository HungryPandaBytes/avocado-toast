import React from "react";
import { IonList, IonItem, IonLabel, IonIcon, IonNote, IonItemGroup, IonListHeader } from "@ionic/react";
import { Transaction } from "../models/Transaction";
import { basketOutline as GroceryIcon, busOutline as TransportationIcon, bodyOutline as GeneralIcon, restaurantOutline as RestaurantIcon, airplaneOutline as LeisureIcon, homeOutline as HouseholdIcon, giftOutline as ShoppingIcon } from "ionicons/icons";
import './AllCategories.scss';

const loadCategories = (transactions: Transaction[]): [string, number][] => {
  const categories: { [key: string]: number } = { total: 0 };

  transactions.forEach((transaction: Transaction) => {
    if (categories.hasOwnProperty(transaction.category_name)) {
      categories[transaction.category_name] += transaction.amount;
    } else {
      categories[transaction.category_name] = transaction.amount;
    }
    categories.total += transaction.amount;
  });

  const sortedCategories: [string, number][] = []
  for (let category in categories) {
    sortedCategories.push([category, categories[category]]);
  }
  sortedCategories.slice().sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
  return sortedCategories;
};

interface AllCategoriesProps {
  transactions: Transaction[]
  period: string
}
export type IconSet = {
  [key: string]: string
}

export const iconsHashMap: IconSet = {
  Grocery: GroceryIcon,
  Transportation: TransportationIcon,
  General: GeneralIcon,
  Restaurant: RestaurantIcon,
  Leisure: LeisureIcon,
  Household: HouseholdIcon,
  Shopping: ShoppingIcon
}

const AllCategories: React.FC<AllCategoriesProps> = ({ period, transactions }) => {
  const sortedCategories: [string, number][] = loadCategories(transactions);
  let categoryTotal = 0;
  let allCategoryTotal = 0;
  let maxWidth = 90;


  return (
    <IonList lines="none" id="all_categories">
      <IonListHeader
        id="transactionListHeader"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <h4 style={{ width: '100%', textAlign: "center", color: 'var(--ion-color-primary)' }}>This {period}</h4>

      </IonListHeader>
      {sortedCategories.map((category: [string, number]) => {
        const categoryName = category[0];
        categoryTotal = category[1];
        if (category[0] === "total") {
          allCategoryTotal = category[1];
          return;
        };

        return (
          <div key={categoryName} className="categories__container">
            <IonItem class="category__item" style={{ height: '35px' }}>
              <IonIcon icon={iconsHashMap[categoryName]} slot="start" color="primary" style={{ margin: '0 3% 1% 0' }}></IonIcon>
              <IonLabel >{categoryName}</IonLabel>
              <IonLabel slot="end" style={{ textAlign: "right" }}>
                -${categoryTotal}
              </IonLabel>
            </IonItem>
            <div className="categories__progress-bar" style={{ width: maxWidth + "%" }}>
              <div
                className="categories__progress-bar--inner"
                style={{
                  width: (((categoryTotal / allCategoryTotal) * maxWidth) / maxWidth) * 100 + "%",
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </IonList>
  );
};

export default AllCategories;