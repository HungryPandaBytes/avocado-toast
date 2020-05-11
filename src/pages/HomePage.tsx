import React from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonList, IonButton } from '@ionic/react';
import './HomePage.scss';
import { StoreContext } from '../store'
import MainDisplayContainer from '../components/MainDisplayContainer'


const slideOpts = {
  initialSlide: 1,
  loop: true,
  speed: 200
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);

  return (
    <IonPage id="home-page">
      <IonContent>
        <IonSlides pager={true} options={slideOpts} style={{ height: "100%", margin: "6%" }}>
          <IonSlide>
            <div style={{ textAlign: "left", alignSelf: "flex-start" }}>
              <h2>Monthly</h2>
              <p>The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.</p>
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Weekly" balance={234} />
            </div>

          </IonSlide>
          <IonSlide>
            <div style={{ textAlign: "left", alignSelf: "flex-start" }}>
              <h2>Daily</h2>
              <p>The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.</p>
              <IonList>
                {store.transactions.map(transaction => <li>{transaction}</li>)}
              </IonList>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage >
  );
};

export default HomePage;
