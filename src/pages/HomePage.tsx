import React, { useRef, useState } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonList, IonButton, IonListHeader, IonIcon, IonItem, IonLabel } from '@ionic/react';
import './HomePage.scss';
import { StoreContext } from '../store'
import MainDisplayContainer from '../components/MainDisplayContainer'
import { chevronUpOutline } from 'ionicons/icons';
import TransactionItem from '../components/TransactionItem';

const transactions = [{ id: 1, amount: 23, description: "Restaurant", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 23, description: "Restaurant", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 23, description: "Restaurant", iconName: "logo-amazon", transaction_time: new Date() }]


const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);
  const headerRef = useRef<HTMLIonListHeaderElement>(null);
  const transactionListRef = useRef<HTMLIonListElement>(null);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showTransactionListModal, setShowTransactionListModal] = useState(false);

  return (
    <IonPage id="home-page">
      <IonContent>
        <IonSlides pager={true} options={slideOpts} style={{ height: "100%", marginTop: "5%" }}>
          <IonSlide>
            <div style={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Daily" balance={123} spent={233} />
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Weekly" balance={-234} spent={233} />
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Monthly" balance={234} spent={233} />
            </div>
          </IonSlide>

        </IonSlides>
        <IonList ref={transactionListRef} lines="full">
          <IonListHeader
            ref={headerRef}
            onClick={() => setShowTransactionListModal(true)}
            id="transactionListHeader"
            style={{ borderRadius: "10px 10px 0 0" }}
          >
            <h4 style={{ width: "85%" }}>Today</h4>
            <span style={{ width: "15%" }}>
              <IonIcon
                icon={chevronUpOutline}
                style={{ verticalAlign: "super" }}
                color="medium"
              />
            </span>
          </IonListHeader>

          {transactions.length > 0 &&
            transactions
              .slice(0, 3)
              .map((transaction, index) => (
                <TransactionItem
                  transaction={transaction}
                  key={index}
                />
              ))}

          {transactions.length === 0 && (
            <IonItem>
              <IonLabel>Add a transaction</IonLabel>
            </IonItem>
          )}
        </IonList>


      </IonContent>
    </IonPage >
  );
};

export default HomePage;
