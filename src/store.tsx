import React from 'react';

/* mobx global state */
import { useLocalStore } from 'mobx-react'

interface stateInterface {
  transactions: string[],
  budget: { income: number, reoccuringExpenses: number, savingPercentage: number }
}

interface dispatchInterface {
  addTransaction(transaction: string): void
}

interface contextInterface extends stateInterface, dispatchInterface {};

const defaultContext: contextInterface = {
  transactions: [],
  budget: { income: 0, reoccuringExpenses: 0, savingPercentage: 0 },
  addTransaction: (transaction) => defaultContext.transactions.push(transaction)
}

export const StoreContext = React.createContext(defaultContext);

export const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(() => (Object.assign({}, defaultContext, {transactions: ['tessst']})))

  return (
    <StoreContext.Provider value={store}> {children}</StoreContext.Provider >
  )
}
