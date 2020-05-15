import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonButton, IonModal } from '@ionic/react';
import './HomePage.scss';
import { StoreContext } from '../store'
import HomePageHero from '../components/HomePageHero'
import PreviewTransactions from '../components/PreviewTransactions';
import AddTransactionModal from './AddTransactionModal';
import { useObserver } from 'mobx-react';

const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

  function getTodayBalance(transactions: any) {
    let todayDailyBalance = store.budget.budgetPerDay
    transactions.map((transaction: any) => todayDailyBalance -= parseInt(transaction.amount));
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
        <IonSlides pager={true} options={slideOpts} style={{ height: "100%", marginTop: "5%" }}>
          <IonSlide>
            <div style={{ width: "100%", height: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <HomePageHero period="Daily" balance={getTodayBalance(store.transactions)} spent={getTodayTotalExpenses(store.transactions)} />
              <PreviewTransactions transactions={store.transactions} />
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", height: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <HomePageHero period="Weekly" balance={-234} spent={233} />
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", height: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <HomePageHero period="Monthly" balance={234} spent={233} />
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
      <IonModal
        isOpen={showAddTransactionModal}
        onDidDismiss={() => setShowAddTransactionModal(false)}
        swipeToClose={true}
        presentingElement={pageRef.current!}
      >
        <AddTransactionModal onClose={() => setShowAddTransactionModal(false)} />
      </IonModal>
      <IonButton fill='outline' color='medium' style={{ margin: '0 5% 0 5%' }} onClick={() => setShowAddTransactionModal(true)}>Add Transaction</IonButton>
    </IonPage >
  ));
};

export default HomePage;
