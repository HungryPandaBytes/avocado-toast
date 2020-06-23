import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonButton, IonModal, IonFab, IonFabButton, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
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
import { currentWeeksTransactions, currentMonthsTransactions, groupTransactionsByDate, currentDaysTransactions } from '../Helpers/transactionsHelper';
import { loadTransactions, seedDatabase, checkIfBudgetExists, deleteTransactionInDB, getBudgetFromDB } from '../data/dataAPI'
import moment from 'moment';
import { Budget } from '../models/Budget';


const slideOpts = {
  initialSlide: 0,
  loop: false,
  speed: 200,
  spaceBetween: 40
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

  const allTransactions = store.transactions;
  const budgetPerDay = store.budget.budgetPerDay;

  const populateAppWithData = async () => {
    await loadTransactions().then(allTransactions => {
      store.transactions = allTransactions;
    });
    await getBudgetFromDB().then((budget: any) => {
      store.setBudget(budget);
    });
  }

  useEffect(() => {
    // seedDatabase();
    populateAppWithData();
  }, [])

  const checkOverSpending = () => {
    const thisMonthTransactions = currentMonthsTransactions(store.transactions);
    const groupTransactionsByDateObject = groupTransactionsByDate(thisMonthTransactions)
    let overbudgetThisMonth: number[] = [];
    for (let date in groupTransactionsByDateObject) {
      let totalExpensesForThatDay: number = 0;
      for (let i = 0; i < groupTransactionsByDateObject[date].length; i++) {
        totalExpensesForThatDay += groupTransactionsByDateObject[date][i].amount;
        const thatDate = moment(date).date();
        if (totalExpensesForThatDay > store.budget.budgetPerDay && !overbudgetThisMonth.includes(thatDate)) {
          overbudgetThisMonth.push(thatDate);
        }
      }
    }
    const sortedOverbudgetThisMonth = overbudgetThisMonth.sort((a: any, b: any) => a - b);
    store.overbudgetThisMonth = sortedOverbudgetThisMonth;
  }
  checkOverSpending();

  return useObserver(() => (

    <IonPage id="home-page">
      <IonHeader className="ion-no-border">
        <IonTitle></IonTitle>
      </IonHeader>
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
                transactions={currentDaysTransactions(store.transactions)}
              />

              <IonButton
                expand="block"
                fill="outline"
                color="medium"
                href="/transactions"
                style={{ margin: "1% 6% 10% 6%" }}
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

