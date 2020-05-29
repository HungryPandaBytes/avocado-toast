import { Transaction } from '../models/Transaction';
import { StoreContext } from '../store';
import { DBService } from '../services/DBService';

// get transactions from db and populate global state with fetched data 
export const loadTransactions = async () => {
  const DBstore = new DBService();
  console.log(DBstore);
  await DBstore.initPlugin();
  let options = { database: 'avocado-toast' }
  let result = await DBstore.openStore(options);

  if (result) {
    console.log('Default DB open', result);
    // store a string in the default store
    await DBstore.setItem("session", "Session Opened");
    // read session from the store
    result = await DBstore.getItem("session");
    console.log('Get Session ', result);
    // store a JSON Object in the default store 
    const mockTransaction = [
      {
        id: 5,
        amount: 125,
        transaction_time: new Date(),
        category_name: "Grocery",
        description: "Omakase",
        split: false,
        ignore: false,
        transaction_type: 'expense'
      },
      {
        id: 4,
        amount: 25,
        description: "Gigantic Pea",
        category_name: "Grocery",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 18 2020 11:00',
      },
      {
        id: 3,
        amount: 2,
        category_name: "Grocery",
        description: "Supreme",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 18 2020',
      },
      {
        id: 2,
        amount: 110,
        description: "Grocery",
        category_name: "Grocery",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 17 2020',
      },
      {
        id: 3,
        amount: 110,
        description: "leisure",
        category_name: "Grocery",
        iconName: "logo-amazon",
        ignore: false,
        transaction_time: 'may 17 2020',
      },
    ]
    await DBstore.setItem('testJSON', JSON.stringify(mockTransaction));
    result = await DBstore.getItem("testJSON");
    let parsedResult = await JSON.parse(result);
    console.log("Get Parsed JSON Object : " + parsedResult[1].id);
    // Get All Values
    result = await DBstore.getAllKeysValues();
    console.log("Get values : " + result);
    console.log("Values length " + result.length);
  }
}