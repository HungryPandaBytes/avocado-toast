import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonButton, IonModal, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import './HomePage.scss';
import { StoreContext } from '../store'
import HomePageHero from '../components/HomePageHero'
import PreviewTransactions from '../components/PreviewTransactions';
import AddTransactionModal from './AddTransactionModal';
import { useObserver } from 'mobx-react';
import balanceHelpers from '../Helpers/balance';
import expenseHelpers from '../Helpers/expense';


const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200,
  spaceBetween: 40
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const maxCountForTransaction = 5;
  const pageRef = useRef<HTMLElement>(null);

  const allTransactions = store.transactions;
  const budgetPerDay = store.budget.budgetPerDay;

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
                transactions={store.transactions.slice(
                  0,
                  maxCountForTransaction
                )}
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
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              <HomePageHero
                period="Weekly"
                balance={balanceHelpers.getThisWeekBalance(
                  allTransactions,
                  budgetPerDay
                )}
                spent={expenseHelpers.getThisWeekTotalExpenses(allTransactions)}
              />
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
