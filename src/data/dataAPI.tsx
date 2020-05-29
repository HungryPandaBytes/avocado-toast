import React from 'react';
import { Transaction } from '../models/Transaction';
import { StoreContext } from '../store';
import { DBService } from '../services/DBService';
import { v4 as uuidv4 } from 'uuid';


// get all transactions from db  
export const loadTransactions = async () => {
  const DBstore = new DBService();
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast', table: 'transactions' });
  if (result) {
    // get all transactions
    const allTransactions = await DBstore.getAllValues();
    let parsedResult = await allTransactions.map((transaction: string) => JSON.parse(transaction));
    console.log('fetching all transactions from db', parsedResult)
    return parsedResult;
  }
}

// add a new transaction to db
export const addNewTransactionToDB = async (newTransaction: Transaction) => {
  const DBstore = new DBService();
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast', table: 'transactions' });
  if (result) {
    await DBstore.setItem(newTransaction.id, JSON.stringify(newTransaction));
    console.log(`Added a new transaction of $${newTransaction.amount} ${newTransaction.category_name} to Avocado-Toast DB`)
  }
}

// seed database 
export const seedDatabase = async () => {
  const DBstore = new DBService();
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast' });
  await DBstore.clear();
  if (result) {
    /***************************************
     * Open "avocado-toast" and table "transactions" *
     ***************************************/
    await DBstore.setTable("transactions");
    /***************************************
     * Seed table "transactions" *
     ***************************************/
    const mockTransaction = [
      {
        id: uuidv4(),
        amount: 300,
        description: "Apple Watch",
        category_name: "Grocery",
        iconName: "logo-amazon",
        transaction_time: 'may 29 2020 11:00',
      },
      {
        id: uuidv4(),
        amount: 25,
        description: "Gigantic Pea",
        category_name: "Grocery",
        iconName: "logo-amazon",
        transaction_time: 'may 18 2020 11:00',
      },
      {
        id: uuidv4(),
        amount: 2,
        category_name: "Grocery",
        description: "Supreme",
        iconName: "logo-amazon",
        transaction_time: 'may 18 2020 11:00',
      },
      {
        id: uuidv4(),
        amount: 110,
        description: "Grocery",
        category_name: "Grocery",
        iconName: "logo-amazon",
        transaction_time: 'may 15 2020 11:00',
      },
      {
        id: uuidv4(),
        amount: 110,
        description: "Leisure",
        category_name: "Grocery",
        iconName: "logo-amazon",
        transaction_time: 'may 15 2020 11:00',
      },
    ]
    mockTransaction.map(transaction => DBstore.setItem(transaction.id, JSON.stringify(transaction)));
  }
}