import React from 'react';
import { Transaction } from '../models/Transaction';
import { StoreContext } from '../store';
import { DBService } from '../services/DBService';


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

// get transactions from db and populate global state with fetched data 
export const addNewTransactionToDB = async (allTransactions: Transaction[]) => {
  const DBstore = new DBService();
  console.log(DBstore);
  await DBstore.initPlugin();
  let result = await DBstore.openStore({ database: 'avocado-toast', table: 'transactions' });

  if (result) {
    console.log('Transactions table of Avocado-Toast DB', result);
    // persist the updated transactions along with the new transaction
    const compareTransactions =
      (a: any, b: any) => Date.parse(a.transaction_time) - Date.parse(b.transaction_time);
    const updatedTransactions = allTransactions.sort(compareTransactions);
    await DBstore.setItem('TransactionsJSON', JSON.stringify(updatedTransactions));
  }
}

// seed database one time 
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
    // Clear the table "transactions" in case of multiple runs
    await DBstore.setTable("transactions");
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
    const compareTransactions =
      (a: any, b: any) => Date.parse(a.transaction_time) - Date.parse(b.transaction_time);
    const updatedTransactions = mockTransaction.sort(compareTransactions);
    await DBstore.setItem('TransactionsJSON', JSON.stringify(updatedTransactions)).then(result => console.log('done seeding'))
  }
}