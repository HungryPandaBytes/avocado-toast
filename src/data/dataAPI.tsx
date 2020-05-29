import React from 'react';
import { Transaction } from '../models/Transaction';
import { StoreContext } from '../store';
import { DBService } from '../services/DBService';
import { v4 as uuidv4 } from 'uuid';


// get transactions from db and populate global state with fetched data 
export const loadTransactions = async () => {
  const DBstore = new DBService();
  console.log(DBstore);
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast', table: 'transactions' });

  if (result) {
    console.log('Avocado-Toast DB open', result);
    // get all transactions
    result = await DBstore.getItem("TransactionsJSON");
    let parsedResult = await JSON.parse(result);
    return parsedResult;
  }
}

// add new transaction to db
export const addNewTransactionToDB = async (newTransaction: Transaction) => {
  const DBstore = new DBService();
  console.log(DBstore);
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast', table: 'transactions' });
  if (result) {
    await DBstore.setItem(newTransaction.id, JSON.stringify(newTransaction));
    console.log(`Added a new transaction of ${newTransaction.category_name} to Avocado-Toast DB`)
  }
}

// seed database 
export const seedDatabase = async () => {
  const DBstore = new DBService();
  console.log(DBstore);
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast' });
  if (result) {
    console.log('avocado-toast DB open', result);
    /***************************************
     * Open "avocado-toast" and table "transactions" *
     ***************************************/
    await DBstore.setTable("transactions");

    const mockTransaction = [
      {
        id: uuidv4(),
        amount: 300,
        transaction_time: new Date(),
        category_name: "Leisure",
        description: "Apple Watch",
        split: false,
        ignore: false,
        transaction_type: 'expense'
      },
      {
        id: uuidv4(),
        amount: 25,
        description: "Gigantic Pea",
        category_name: "Grocery",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 18 2020 11:00',
      },
      {
        id: uuidv4(),
        amount: 2,
        category_name: "Grocery",
        description: "Supreme",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 18 2020',
      },
      {
        id: uuidv4(),
        amount: 110,
        description: "Grocery",
        category_name: "Grocery",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 17 2020',
      },
      {
        id: uuidv4(),
        amount: 110,
        description: "Leisure",
        category_name: "Grocery",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 17 2020',
      },
    ]
    mockTransaction.map(transaction => DBstore.setItem(transaction.id, JSON.stringify(transaction)));
  }
}