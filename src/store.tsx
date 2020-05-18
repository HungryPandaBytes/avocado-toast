import React from 'react';
/* mobx global state */
import { useLocalStore } from 'mobx-react'
import { Budget } from './models/Budget'
import { Transaction } from './models/Transaction'


interface stateInterface {
  transactions: object[],
  budget: Budget
}

interface dispatchInterface {
  addTransaction(transaction: Transaction): void
  setBudget(newBudget: Budget): void

}

interface contextInterface extends stateInterface, dispatchInterface { };


const defaultContext: contextInterface = {
  transactions: [],
  budget: { income: 10000, reoccuringExpenses: 2000, savingPercentage: 0.20, budgetPerDay: 700 },
  addTransaction: (transaction: Transaction) => defaultContext.transactions.push(transaction),
  setBudget: (newBudget: Budget) => defaultContext.budget = newBudget
}

export const StoreContext = React.createContext(defaultContext);
let transactions: Transaction[] = [];
transactions = [
  {
    id: 1,
    amount: 125,
    description: "Omakase",
    iconName: "logo-amazon",
    transaction_time: new Date(),
  },
  {
    id: 1,
    amount: 25,
    description: "Gigantic Pea",
    iconName: "logo-amazon",
    transaction_time: 'may 18 2020 11:00',
  },
  {
    id: 1,
    amount: 2,
    description: "Supreme",
    iconName: "logo-amazon",
    transaction_time: 'may 18 2020',
  },
  {
    id: 1,
    amount: 110,
    description: "Grocery",
    iconName: "logo-amazon",
    transaction_time: 'may 17 2020',
  },
  {
    id: 1,
    amount: 4,
    description: "Silly String",
    iconName: "logo-amazon",
    transaction_time: 'may 16 2020',
  },
];

export const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(() => ({
    transactions: transactions,
    budget: { income: 10000, reoccuringExpenses: 2000, savingPercentage: 0.20, budgetPerDay: 420 },
    addTransaction: (transaction: Transaction) => store.transactions.push(transaction),
    setBudget: (newBudget: Budget) => store.budget = newBudget
  }));

  return (
    <StoreContext.Provider value={store}> {children}</StoreContext.Provider >
  )
}


