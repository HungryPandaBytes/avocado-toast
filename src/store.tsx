import React from 'react';
/* mobx global state */
import { useLocalStore } from 'mobx-react'
import { Budget } from './models/Budget'
import { Transaction } from './models/Transaction'
/* mobx observer inspector */

interface stateInterface {
  transactions: Transaction[],
  budget: Budget,
  newUser: boolean,
  overbudgetThisMonth: number[]
}

interface dispatchInterface {
  addTransaction(transaction: Transaction): void
  deleteTransaction(transactionId: number): void
  setBudget(newBudget: Budget): void
  setReturningUser(): void
  addOverBudgetDate(date: number): void
}

interface contextInterface extends stateInterface, dispatchInterface { };

const defaultContext: contextInterface = {
  newUser: true,
  overbudgetThisMonth: [],
  transactions: [],
  budget: { income: 0, reoccuringExpenses: 0, savingPercentage: 0, budgetPerDay: 0, timestamp: null },
  addOverBudgetDate: (date) => defaultContext.overbudgetThisMonth.push(date),
  addTransaction: (transaction: Transaction) => defaultContext.transactions.push(transaction),
  deleteTransaction: (id: any) => {
    const updatedTransactions = defaultContext.transactions.filter((transaction: any) => {
      if (transaction.id !== id) {
        return transaction;
      }
    })

    return { ...defaultContext, transactions: updatedTransactions };
  },
  setBudget: (newBudget: Budget) => defaultContext.budget = newBudget,
  setReturningUser: () => defaultContext.newUser = false
}

export const StoreContext = React.createContext(defaultContext);

let transactions: Transaction[] = [];
let overbudgetThisMonth: number[] = [];

const compareTransactions =
  (a: any, b: any) => Date.parse(a.transaction_time) - Date.parse(b.transaction_time);

export const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(() => ({
    newUser: true,
    transactions: transactions.sort(compareTransactions),
    overbudgetThisMonth: overbudgetThisMonth,
    budget: { income: 0, reoccuringExpenses: 0, savingPercentage: 0, budgetPerDay: 0, timestamp: null },
    addOverBudgetDate: (date: number) => store.overbudgetThisMonth.push(date),
    addTransaction: (transaction: Transaction) => {
      store.transactions.push(transaction);
      const transactionsCount = store.transactions.length;
      // only sort transaction if the newly added transaction is older than the previous transaction
      if (transactionsCount > 1 && store.transactions[transactionsCount - 2].transaction_time > transaction.transaction_time) {
        store.transactions = store.transactions.sort(compareTransactions)
      }
    },
    deleteTransaction: (id: any) => {
      const updatedTransactions = store.transactions.filter((transaction: any) => {
        if (transaction.id !== id) {
          return transaction;
        }
      })

      store.transactions = updatedTransactions
    },
    setBudget: (newBudget: Budget) => store.budget = newBudget,
    setReturningUser: () => store.newUser = true
  }));
  return (
    <StoreContext.Provider value={store}> {children}</StoreContext.Provider >
  )
}

