import React from 'react';

/* mobx global state */
import { useLocalStore } from 'mobx-react'

interface contextInterface {
  transactions: string[],
  budget: { income: number, reoccuringExpenses: number, savingPercentage: number }
}

const defaultContext: contextInterface = {
  transactions: [],
  budget: { income: 0, reoccuringExpenses: 0, savingPercentage: 0 }
}

export const StoreContext = React.createContext(defaultContext);

export const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(() => ({
    transactions: ['adsfasdf'],
    budget: { income: 0, reoccuringExpenses: 0, savingPercentage: 0 }
  }))

  return (
    <StoreContext.Provider value={store}> {children}</StoreContext.Provider >
  )
}
