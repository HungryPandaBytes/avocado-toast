import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonButton, IonModal, IonRouterLink, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './HomePage.scss';
import { StoreContext } from '../store'
import HomePageHero from '../components/HomePageHero'
import PreviewTransactions from '../components/PreviewTransactions';
import AddTransactionModal from './AddTransactionModal';
import { useObserver } from 'mobx-react';
import moment from 'moment';
import { arrowUpCircle, add } from 'ionicons/icons';

const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200,
  spaceBetween: 40,
  on: {
    ionSlideTouchEnd() {
      window.scrollTo(0, 0)
    }
  }
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const maxCountForTransaction = 10;
  const pageRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLIonSlideElement>(null);


  function getTodayBalance(transactions: any, budgetPerDay: any) {
    let todayDailyBalance = budgetPerDay
    todayDailyBalance -= getTodayTotalExpenses(transactions)
    return todayDailyBalance;
  }

  function getThisWeekBalance(transactions: any, budgetPerDay: any) {
    let thisWeekBalance = budgetPerDay * 7;
    thisWeekBalance -= getThisWeekTotalExpenses(transactions);
    return thisWeekBalance;
  }

  function getTodayTotalExpenses(transactions: any) {
    let todayTotalExpenses = 0
    let today = moment();
    transactions.map((transaction: any) => {
      if (moment(transaction.transaction_time).isSame(today, 'day')) {
        todayTotalExpenses += parseInt(transaction.amount)
      }
    });
    return todayTotalExpenses;
  }

  function getThisWeekTotalExpenses(transactions: any) {
    let thisWeekTotalExpenses = 0;
    let today = moment();
    let lastMonday = moment().startOf('isoWeek');

    transactions.map((transaction: any) => {
      if (today.diff(lastMonday, 'day') <= 7) {
        thisWeekTotalExpenses += parseInt(transaction.amount)
      }
    });
    console.log(thisWeekTotalExpenses)
    return thisWeekTotalExpenses;
  }


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
                height: "100%"
              }}
            >
              <HomePageHero
                period="Daily"
                balance={getTodayBalance(store.transactions, store.budget.budgetPerDay)}
                spent={getTodayTotalExpenses(store.transactions)}
              />
              <PreviewTransactions
                transactions={store.transactions.slice(
                  0,
                  maxCountForTransaction
                )}
                ignoreTransaction={store.ignoreTransaction}
              />
              <IonButton
                expand='block'
                fill="outline"
                color="medium"
                href="/transactions"
                style={{ margin: '0 6% 2% 6%' }}
              >
                See All Transactions
              </IonButton>
            </div>
          </IonSlide>
          <IonSlide ref={slideRef}>
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              <HomePageHero period="Weekly" balance={getThisWeekBalance(store.transactions, store.budget.budgetPerDay)} spent={getThisWeekTotalExpenses(store.transactions)} />
            </div>
          </IonSlide>
          <IonSlide ref={slideRef}>
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              <HomePageHero period="Monthly" balance={234} spent={233} />
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
