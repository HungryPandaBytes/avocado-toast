import moment from 'moment';
import { Transaction } from '../models/Transaction';
import { currentMonthsTransactions, currentDaysTransactions, currentWeeksTransactions } from '../Helpers/transactionsHelper'

const expenseHelpers = {

  getTodayTotalExpenses: function (transactions: Transaction[]) {
    let todayTotalExpenses = 0
    let today = moment();
    transactions = currentDaysTransactions(transactions);
    transactions.map((transaction: Transaction) => {
      if (moment(transaction.transaction_time).isSame(today, 'day')) {
        todayTotalExpenses += transaction.amount;
      }
    });
    return todayTotalExpenses;
  },
  getThisWeekTotalExpenses: function (transactions: Transaction[]) {
    let thisWeekTotalExpenses = 0;
    let today = moment();
    let lastMonday = moment().startOf('week');
    transactions = currentWeeksTransactions(transactions);
    transactions.map((transaction: Transaction) => {
      if (today.diff(lastMonday, 'day') <= 7) {
        thisWeekTotalExpenses += transaction.amount;
      }
    });
    return thisWeekTotalExpenses;
  },
  getThisMonthTotalExpenses: function (transactions: Transaction[]) {
    let thisMonthTotalExpenses = 0;
    transactions = currentMonthsTransactions(transactions);
    const today = moment();
    const firstDayofMonth = moment().startOf('month');
    const daysInMonth = moment().daysInMonth()

    transactions.map((transaction: Transaction) => {
      if (today.diff(firstDayofMonth, 'day') <= daysInMonth) {
        thisMonthTotalExpenses += transaction.amount;
      }
    });
    return thisMonthTotalExpenses;
  }
}

export default expenseHelpers;

