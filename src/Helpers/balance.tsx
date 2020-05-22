import moment from 'moment';
import expenseUtils from './expense';

const balanceHelpers = {
  getTodayBalance: function (transactions: any, budgetPerDay: any) {
    let todayDailyBalance = budgetPerDay
    todayDailyBalance -= expenseUtils.getTodayTotalExpenses(transactions)
    return todayDailyBalance;
  },
  getThisWeekBalance: function (transactions: any, budgetPerDay: any) {
    let thisWeekBalance = budgetPerDay * 7;
    thisWeekBalance -= expenseUtils.getThisWeekTotalExpenses(transactions);
    return thisWeekBalance;
  },
  getThisMonthBalance: function (transactions: any, budgetPerDay: any) {
    const daysInMonth = moment().daysInMonth()
    let thisMonthBalance = budgetPerDay * daysInMonth;
    thisMonthBalance -= expenseUtils.getThisMonthTotalExpenses(transactions);
    return thisMonthBalance;
  }
}

export default balanceHelpers;

