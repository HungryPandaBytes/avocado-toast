import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonList, IonButton, IonListHeader, IonIcon, IonItem, IonLabel, IonFabButton, IonFab, IonModal } from '@ionic/react';
import './HomePage.scss';
import { StoreContext } from '../store'
import HomePageHero from '../components/HomePageHero'
import PreviewTransactions from '../components/PreviewTransactions';
import { add } from 'ionicons/icons';
import AddTransactionModal from './AddTransactionModal';

const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

  return (
    <IonPage id="home-page">
      <IonContent>
        <IonSlides pager={true} options={slideOpts} style={{ height: "100%", marginTop: "5%" }}>
          <IonSlide>
            <div style={{ width: "100%", height: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <HomePageHero period="Daily" balance={123} spent={233} />
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
  );
};

export default HomePage;
