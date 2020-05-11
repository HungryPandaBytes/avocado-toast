import React from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonList, IonButton } from '@ionic/react';
import './HomePage.scss';
import { StoreContext } from '../store'
import MainDisplayContainer from '../components/MainDisplayContainer'


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
              <MainDisplayContainer period="Daily" balance={234} />
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Weekly" balance={234} />
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{ width: "100%", textAlign: "left", alignSelf: "flex-start" }}>
              <MainDisplayContainer period="Monthly" balance={234} />
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage >
  );
};

export default HomePage;
