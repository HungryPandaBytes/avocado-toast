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
}

interface contextInterface extends stateInterface, dispatchInterface { };


const defaultContext: contextInterface = {
  transactions: [],
  budget: { income: 0, reoccuringExpenses: 0, savingPercentage: 0, budgetPerDay: 0 },
  addTransaction: (transaction: Transaction) => defaultContext.transactions.push(transaction)
}

export const StoreContext = React.createContext(defaultContext);

export const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(() => (Object.assign({}, defaultContext, { transactions: transactions })))

  return (
    <StoreContext.Provider value={store}> {children}</StoreContext.Provider >
  )
}


const transactions = [{ id: 1, amount: 125, description: "Omakase", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 2500, description: "Gigantic Pea", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 2, description: "Supreme", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 210, description: "Grocery", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 4, description: "Silly String", iconName: "logo-amazon", transaction_time: new Date() }]