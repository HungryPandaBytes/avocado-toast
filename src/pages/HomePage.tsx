import React from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonList, IonButton, IonListHeader, IonIcon, IonItem, IonLabel, IonFabButton, IonFab } from '@ionic/react';
import './HomePage.scss';
import { StoreContext } from '../store'
import MainDisplayContainer from '../components/HomePageHero'
import PreviewTransactions from '../components/PreviewTransactions';
import { add } from 'ionicons/icons';

const transactions = [{ id: 1, amount: 125, description: "Omakase", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 2500, description: "Gigantic Pea", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 2, description: "Supreme", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 210, description: "Grocery", iconName: "logo-amazon", transaction_time: new Date() }, { id: 1, amount: 4, description: "Silly String", iconName: "logo-amazon", transaction_time: new Date() }]

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
            <div style={{ width: "100%", height: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Daily" balance={123} spent={233} />
              <PreviewTransactions transactions={transactions} />
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color="primary"><IonIcon icon={add} /></IonFabButton>
              </IonFab>
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", height: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Weekly" balance={-234} spent={233} />
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", height: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Monthly" balance={234} spent={233} />
            </div>
          </IonSlide>
        </IonSlides>

      </IonContent>
    </IonPage >
  );
};

export default HomePage;
