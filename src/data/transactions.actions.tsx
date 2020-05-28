import { Transaction } from '../models/Transaction';
import { StoreContext } from '../store';
import { DBService } from '../services/DBService';

// Function used in Views

export const loadTransactions = () => async () => {
  const store = new DBService();
  await store.initPlugin();
  var result = await store.openStore({});
  const data = await store.getAllKeysValues();
}