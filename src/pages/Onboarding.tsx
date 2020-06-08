import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonSlides, IonSlide, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import './Onboarding.scss';
import BudgetInput from '../components/BudgetInput';


const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200,
  spaceBetween: 40
};

const Onboarding: React.FC = () => {
  const [showSkip, setShowSkip] = useState(true);
  const slideRef = useRef<HTMLIonSlidesElement>(null);

  useIonViewWillEnter(() => {
  });

  const startApp = async () => {
    // await setHasSeenTutorial(true);
    // await setMenuEnabled(true);
  };

  const handleSlideChangeStart = () => {

  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && <IonButton color='primary' onClick={startApp}>Skip</IonButton>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonSlides onIonSlideWillChange={handleSlideChangeStart} options={slideOpts} pager={true}>
          <IonSlide>
            <img src="assets/img/ica-slidebox-img-1.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              Simply Track Expenses
            </h2>
            <p>
              <b>Avocado Toast</b> helps you to track your discretionary expenses in a fun and simple way.
            </p>
          </IonSlide>

          <IonSlide>
            <img src="assets/img/ica-slidebox-img-2.png" alt="" className="slide-image" />
            <h2 className="slide-title">Let's find out your daily budget.</h2>
            <BudgetInput onboarding={true} />
            <IonButton fill="clear" onClick={startApp}>
              Continue
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>

        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;