import React from 'react';
import { Transaction } from '../models/Transaction';
import { StoreContext } from '../store';
import { Budget } from '../models/Budget'
import { DBService } from '../services/DBService';
import { v4 as uuidv4 } from 'uuid';


// get all transactions from db  
export const loadTransactions = async () => {
  const DBstore = new DBService();
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast', table: 'transactions' });
  await DBstore.setTable('transactions');
  if (result) {
    // get all transactions
    const allTransactions = await DBstore.getAllValues();
    let parsedResult = await allTransactions.map((transaction: string) => JSON.parse(transaction));
    console.log('fetching all transactions from db', parsedResult)
    return parsedResult;
  }
}

// check if budget is set 
export const checkIfBudgetExists = async () => {
  const DBstore = new DBService();
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast' });
  await DBstore.setTable('budget');
  if (result) {
    // const data1 = { 'a': 60, 'pi': '3.141516', 'b': 'cool' }
    // let budget = await DBstore.setItem('budget', JSON.stringify(data1));
    let budget = await DBstore.getAllKeys();
    // const parsedResult = await JSON.parse(budget);
    console.log('checking if budget is set', budget);
    return budget;
  }
}

// add a new budget to db
export const addNewBudgetToDB = async (newBudget: Budget) => {
  const DBstore = new DBService();
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast' });
  await DBstore.setTable('budget');
  if (result) {
    await DBstore.setItem("budget", JSON.stringify(newBudget));
    console.log(`Added a new budget ${newBudget.budgetPerDay} to Avocado-Toast DB`)
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

// delete a new transaction to db
export const deleteTransactionInDB = async (transactionId: string) => {
  const DBstore = new DBService();
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast', table: 'transactions' });
  await DBstore.setTable('transactions');
  if (result) {
    await DBstore.removeItem(transactionId);
    console.log(`Deleted a new transaction of $${transactionId} in DB`)
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