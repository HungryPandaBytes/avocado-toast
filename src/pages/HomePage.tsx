import React, { useRef, useState } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonList, IonButton, IonListHeader, IonIcon, IonItem, IonLabel } from '@ionic/react';
import './HomePage.scss';
import { StoreContext } from '../store'
import MainDisplayContainer from '../components/MainDisplayContainer'
import { chevronUpOutline } from 'ionicons/icons';
import TransactionItem from '../components/TransactionItem';
import PreviewTransactions from '../components/PreviewTransactions';

const transactions = [{ id: 1, amount: 23, description: "Restaurant", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 23, description: "Restaurant", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 23, description: "Restaurant", iconName: "logo-amazon", transaction_time: new Date() }]

const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);

  return (
    <IonPage id="home-page">
      <IonContent>
        <IonSlides pager={true} options={slideOpts} style={{ height: "100%", marginTop: "5%" }}>
          <IonSlide>
            <div style={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Daily" balance={123} spent={233} />
              <PreviewTransactions transactions={transactions} />
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
      </IonContent>
    </IonPage >
  );
};

export default HomePage;
