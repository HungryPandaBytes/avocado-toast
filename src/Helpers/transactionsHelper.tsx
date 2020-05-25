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

  for (let i = transactions.length - 1; i >= 0; i--) {
    if (moment(transactions[i].transaction_time) >= startMoment) {
      currentTransactions.push(transactions[i]);
    } else {
      break;
    }
  }

  return sortOrder === sortOrderType.newestFirst ? currentTransactions : currentTransactions.reverse();
}