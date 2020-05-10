import React from 'react';
import { IonContent, IonPage, IonSlides, IonSlide } from '@ionic/react';
import './HomePage.scss';

const slideOpts = {
  initialSlide: 1,
  loop: true,
  speed: 200
};

const HomePage: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonContent>
        <IonSlides pager={true} options={slideOpts} style={{height: "100%", marginLeft: "10px"}}>
          <IonSlide>
            <div style={{textAlign: "left", alignSelf: "flex-start"}}>
              <h2>Monthly</h2>
              <p>The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.</p>
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{textAlign: "left", alignSelf: "flex-start"}}>
              <h2>Daily</h2>
              <p>The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.</p>
            </div>
          </IonSlide>
          <IonSlide>
            <div style={{textAlign: "left", alignSelf: "flex-start"}}>
              <h2>Weekly</h2>
              <p>The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.</p>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
