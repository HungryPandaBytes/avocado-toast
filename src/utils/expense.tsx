import moment from 'moment';

const expenseUtils = {

  getTodayTotalExpenses: function (transactions: any) {
    let todayTotalExpenses = 0
    let today = moment();
    transactions.map((transaction: any) => {
      if (moment(transaction.transaction_time).isSame(today, 'day')) {
        todayTotalExpenses += parseInt(transaction.amount)
      }
    });
    return todayTotalExpenses;
  },
  getThisWeekTotalExpenses: function (transactions: any) {
    let thisWeekTotalExpenses = 0;
    let today = moment();
    let lastMonday = moment().startOf('isoWeek');

    transactions.map((transaction: any) => {
      if (today.diff(lastMonday, 'day') <= 7) {
        thisWeekTotalExpenses += parseInt(transaction.amount)
      }
    });
    return thisWeekTotalExpenses;
  },
  getThisMonthTotalExpenses: function (transactions: any) {
    let thisMonthTotalExpenses = 0;
    const today = moment();
    const firstDayofMonth = moment().startOf('month');
    const daysInMonth = moment().daysInMonth()

    transactions.map((transaction: any) => {
      if (today.diff(firstDayofMonth, 'day') <= daysInMonth) {
        thisMonthTotalExpenses += parseInt(transaction.amount)
      }
    });
    return thisMonthTotalExpenses;
  }
}

export default expenseUtils;