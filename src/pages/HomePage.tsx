import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonButton, IonModal, IonRouterLink, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import './HomePage.scss';
import { StoreContext } from '../store'
import HomePageHero from '../components/HomePageHero'
import PreviewTransactions from '../components/PreviewTransactions';
import AddTransactionModal from './AddTransactionModal';
import { useObserver } from 'mobx-react';
import { arrowUpCircle, add } from 'ionicons/icons';

const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200,
  spaceBetween: 40
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const maxCountForTransaction = 10;
  const pageRef = useRef<HTMLElement>(null);

  function getTodayBalance(transactions: any, balance: any) {
    let todayDailyBalance = balance
    transactions.map((transaction: any) => {
      if (transaction.transaction_type == 'Income') {
        todayDailyBalance += parseInt(transaction.amount)
      } else {
        todayDailyBalance -= parseInt(transaction.amount)
      }
    });
    return todayDailyBalance;
  }

  function getTodayTotalExpenses(transactions: any) {
    let todayTotalExpenses = 0
    transactions.map((transaction: any) => todayTotalExpenses += parseInt(transaction.amount));
    return todayTotalExpenses;
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
          <IonSlide>
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              <HomePageHero period="Weekly" balance={-234} spent={233} />
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
