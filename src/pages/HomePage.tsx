import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonButton, IonModal, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import './HomePage.scss';
import { StoreContext } from '../store'
import HomePageHero from '../components/HomePageHero'
import PreviewTransactions from '../components/PreviewTransactions';
import AddTransactionModal from '../components/AddTransactionModal';
import { useObserver } from 'mobx-react';
import balanceHelpers from '../Helpers/balanceHelper';
import expenseHelpers from '../Helpers/expenseHelper';
import AllCategories from '../components/AllCategories';
import { currentWeeksTransactions, currentMonthsTransactions } from '../Helpers/transactionsHelper';
import { DBService } from '../services/DBService';
import { cleanup } from '@testing-library/react';


const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200,
  spaceBetween: 40
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);
  const DBstore = new DBService();

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

  const allTransactions = store.transactions;
  const budgetPerDay = store.budget.budgetPerDay;



  useEffect(() => {
    const loadTransactions = async () => {
      console.log(DBstore);
      await DBstore.initPlugin();
      let result = await DBstore.openStore({});

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
    loadTransactions();
  }, [])


  return useObserver(() => (
    <IonPage id="home-page">
      <IonContent>
        <IonSlides
          pager={true}
          options={slideOpts}
          style={{ height: "100%", marginTop: "5%", overflowY: "scroll" }}
        >
          <IonSlide>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <HomePageHero
                period="Daily"
                balance={balanceHelpers.getTodayBalance(
                  allTransactions,
                  budgetPerDay
                )}
                spent={expenseHelpers.getTodayTotalExpenses(allTransactions)}
              />
              <PreviewTransactions
                transactions={store.transactions}
                ignoreTransaction={store.ignoreTransaction}
              />

              <IonButton
                expand="block"
                fill="outline"
                color="medium"
                href="/transactions"
                style={{ margin: "0 6% 2% 6%" }}
              >
                See All Transactions
              </IonButton>
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", height: "100%" }}>
              <HomePageHero
                period="Weekly"
                balance={balanceHelpers.getThisWeekBalance(
                  allTransactions,
                  budgetPerDay
                )}
                spent={expenseHelpers.getThisWeekTotalExpenses(allTransactions)}
              />

              <AllCategories period='Week' transactions={currentWeeksTransactions(store.transactions)} />
            </div>
          </IonSlide>
          <IonSlide>
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              <HomePageHero
                period="Monthly"
                balance={balanceHelpers.getThisMonthBalance(
                  allTransactions,
                  budgetPerDay
                )}
                spent={expenseHelpers.getThisMonthTotalExpenses(
                  allTransactions
                )}
              />
              <AllCategories period='Month' transactions={currentMonthsTransactions(store.transactions)} />
            </div>
          </IonSlide>
        </IonSlides>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddTransactionModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonModal
        isOpen={showAddTransactionModal}
        onDidDismiss={() => setShowAddTransactionModal(false)}
        swipeToClose={true}
        presentingElement={pageRef.current!}
      >
        <AddTransactionModal
          onClose={() => setShowAddTransactionModal(false)}
        />
      </IonModal>
    </IonPage>
  ));
};

export default HomePage;
