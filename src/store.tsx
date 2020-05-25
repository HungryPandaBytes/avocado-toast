import React from 'react';
/* mobx global state */
import { useLocalStore } from 'mobx-react'
import { Budget } from './models/Budget'
import { Transaction } from './models/Transaction'
import AddTransactionModal from './pages/AddTransactionModal';


interface stateInterface {
  transactions: Transaction[],
  budget: Budget
}

interface dispatchInterface {
  addTransaction(transaction: Transaction): void
  ignoreTransaction(transactionId: number): void
  deleteTransaction(transactionId: number): void
  setBudget(newBudget: Budget): void

}

interface contextInterface extends stateInterface, dispatchInterface { };

const defaultContext: contextInterface = {
  transactions: [],
  budget: { income: 10000, reoccuringExpenses: 2000, savingPercentage: 0.20, budgetPerDay: 700 },
  addTransaction: (transaction: Transaction) => defaultContext.transactions.push(transaction),
  ignoreTransaction: (id: any) => {
    const updatedTransactions = defaultContext.transactions.map((transaction: any) => {
      if (transaction.id === id) {
        transaction.ignore = !transaction.ignore;
        return transaction;
      } else {
        return transaction;
      }
    })
    return { ...defaultContext, transactions: [...updatedTransactions] };
  },
  deleteTransaction: (id: any) => {
    const updatedTransactions = defaultContext.transactions.filter((transaction: any) => {
      if (transaction.id !== id) {
        return transaction;
      }
    })

    return { ...defaultContext, transactions: updatedTransactions };
  },
  setBudget: (newBudget: Budget) => defaultContext.budget = newBudget
}

export const StoreContext = React.createContext(defaultContext);
let transactions: Transaction[] = [];
transactions = [
  {
    id: 5,
    amount: 125,
    description: "Omakase",
    category_name: "food",
    iconName: "logo-amazon",
    ignore: false,
    transaction_time: new Date(),
  },
  {
    id: 4,
    amount: 25,
    description: "Gigantic Pea",
    category_name: "shopping",
    iconName: "logo-amazon",
    ignore: false,
    transaction_time: 'may 18 2020 11:00',
  },
  {
    id: 3,
    amount: 2,
    category_name: "shopping",
    description: "Supreme",
    iconName: "logo-amazon",
    ignore: false,
    transaction_time: 'may 18 2020',
  },
  {
    id: 2,
    amount: 110,
    description: "Grocery",
    category_name: "grocery",
    iconName: "logo-amazon",
    ignore: false,
    transaction_time: 'may 17 2020',
  },
  {
    id: 3,
    amount: 110,
    description: "leisure",
    category_name: "grocery",
    iconName: "logo-amazon",
    ignore: false,
    transaction_time: 'may 17 2020',
  },
];

const compareTransactions =
  (a: any, b: any) => Date.parse(a.transaction_time) - Date.parse(b.transaction_time);

export const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(() => ({
    transactions: transactions.sort(compareTransactions),
    budget: { income: 10000, reoccuringExpenses: 2000, savingPercentage: 0.20, budgetPerDay: 420 },
    addTransaction: (transaction: Transaction) => {
      store.transactions.push(transaction);
      const transactionsCount = store.transactions.length;

      // only sort transaction if the newly added transaction is older than the previous transaction
      if (transactionsCount > 1 && store.transactions[transactionsCount - 2].transaction_time > transaction.transaction_time) {
        store.transactions = store.transactions.sort(compareTransactions)
      }
    },
    ignoreTransaction: (id: any) => {
      const updatedTransactions = store.transactions.map((transaction: any) => {
        if (transaction.id === id) {
          transaction.ignore = !transaction.ignore;
          return transaction;
        } else {
          return transaction;
        }
      })
      store.transactions = updatedTransactions;
    },
    deleteTransaction: (id: any) => {
      const updatedTransactions = store.transactions.filter((transaction: any) => {
        if (transaction.id !== id) {
          return transaction;
        }
      })
      store.transactions = updatedTransactions
    },
    setBudget: (newBudget: Budget) => store.budget = newBudget
  }));

  return (
    <StoreContext.Provider value={store}> {children}</StoreContext.Provider >
  )
}


