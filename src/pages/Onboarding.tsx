import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonSlides, IonSlide, IonIcon, useIonViewWillEnter, IonTitle } from '@ionic/react';
import './Onboarding.scss';
import babyAvocado from '../theme/baby_avocado.png'
import BudgetInput from '../components/BudgetInput';


const slideOpts = {
  initialSlide: 0,
  loop: false,
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
      <IonHeader>
        <IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSlides onIonSlideWillChange={handleSlideChangeStart} options={slideOpts} pager={true}>
          <IonSlide className='first-onboarding-slide' style={{ marginTop: '10%' }}>
            <img src={babyAvocado} alt="" className="slide-image" />
            <h2 className="slide-title" style={{ marginTop: '30%' }}>
              Simply Track Expenses
            </h2>
            <p>
              <b>Avocado Toast</b> helps you to track discretionary expenses in a fun and simple way.
            </p>
          </IonSlide>
          <IonSlide>
            <img src="assets/img/ica-slidebox-img-2.png" alt="" className="slide-image" />
            <BudgetInput onboarding={true} />
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;