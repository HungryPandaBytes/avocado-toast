import React from 'react';
import { Transaction } from '../models/Transaction';
import { StoreContext } from '../store';
import { DBService } from '../services/DBService';


// get transactions from db and populate global state with fetched data 
export const loadTransactions = async () => {
  const DBstore = new DBService();
  console.log(DBstore);
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast' });

  if (result) {
    console.log('Avocado-Toast DB open', result);
    // get all transactions
    result = await DBstore.getItem("testJSON");
    let parsedResult = await JSON.parse(result);
    return parsedResult;
  }
}

export const seedDatabase = async () => {
  const DBstore = new DBService();
  console.log(DBstore);
  await DBstore.initPlugin();
  let options = { database: 'avocado-toast' }
  let result = await DBstore.openStore(options);

  if (result) {
    console.log('Default DB open', result);
    const mockTransaction = [
      {
        id: 8,
        amount: 300,
        transaction_time: new Date(),
        category_name: "Leisure",
        description: "Apple Watch",
        split: false,
        ignore: false,
        transaction_type: 'expense'
      },
      {
        id: 4,
        amount: 25,
        description: "Gigantic Pea",
        category_name: "Grocery",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 18 2020 11:00',
      },
      {
        id: 3,
        amount: 2,
        category_name: "Grocery",
        description: "Supreme",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 18 2020',
      },
      {
        id: 2,
        amount: 110,
        description: "Grocery",
        category_name: "Grocery",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 17 2020',
      },
      {
        id: 3,
        amount: 110,
        description: "Leisure",
        category_name: "Grocery",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 17 2020',
      },
    ]
    await DBstore.setItem('testJSON', JSON.stringify(mockTransaction));
  }
}