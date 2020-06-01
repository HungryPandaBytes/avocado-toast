import moment from "moment";
import { Transaction } from "../models/Transaction";
import Moment from "react-moment";

export enum sortOrderType {
  newestFirst,
  oldestFirst,
}


export function currentWeeksTransactions(transactions: Transaction[], sortOrder?: sortOrderType) {
  const startMoment = moment().startOf("isoWeek");
  return currentTransactions(transactions, startMoment, sortOrder);
}

export function currentMonthsTransactions(transactions: Transaction[], sortOrder?: sortOrderType) {
  const startMoment = moment().startOf("month");
  return currentTransactions(transactions, startMoment, sortOrder);
}

export function currentDaysTransactions(transactions: Transaction[], sortOrder?: sortOrderType) {
  const startMoment = moment().startOf("day");
  return currentTransactions(transactions, startMoment, sortOrder);
}

function currentTransactions(transactions: Transaction[], startMoment: moment.Moment, sortOrder?: sortOrderType) {
  let currentTransactions: Transaction[] = [];
  const sortedTransactions = transactions.sort((a: any, b: any) => Date.parse(a.transaction_time) - Date.parse(b.transaction_time));
  for (let i = sortedTransactions.length - 1; i >= 0; i--) {
    if (moment(sortedTransactions[i].transaction_time) >= startMoment) {
      console.log((moment(sortedTransactions[i].transaction_time) >= startMoment), 'transaction_time')
      currentTransactions.push(sortedTransactions[i]);
    } else {
      break;
    }
  }
  console.log({ startMoment }, { sortedTransactions }, { currentTransactions });

  return sortOrder === sortOrderType.newestFirst ? currentTransactions : currentTransactions.reverse();
}