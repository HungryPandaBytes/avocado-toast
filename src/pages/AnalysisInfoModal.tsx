import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonChip, IonIcon, IonDatetime } from '@ionic/react';
import babySeed from '../theme/baby_seed.png'
import babyAvocado from '../theme/baby_avocado.png'
import teenAvocado from '../theme/geeky_avocado.png'
import adultAvocado from '../theme/avocado_teen_cap.png'
import avocadoToast from '../theme/avo_slice_toast.png'
import './AnalysisInfoModal.scss'

interface AnalysisInfoModalProps {
  onClose(): any
}

const AnalysisInfoModal: React.FC<AnalysisInfoModalProps> = ({ onClose }) => {

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="analysis-info-page">
          <h1>Saving Statuses</h1>
          <h5>Whenever you spend less than you budgeted, you water and grow your avocado. Ultimately, the cute avocado will become a yummy avocado toast.</h5>
          <div>
            <h4>The Baby Seed</h4>
            <p>0 - 20% water</p>
            <img className='img--wrapper' src={babySeed} alt="baby_seed" />
          </div>
          <div>
            <h4>The Baby Avocado</h4>
            <p>20 - 40% water</p>
            <img className='img--wrapper' src={babyAvocado} alt="baby_avocado" />
          </div>
          <div>
            <h4>The Teen Avocado</h4>
            <p>40 - 65% water</p>
            <img className='img--wrapper' src={teenAvocado} alt="teen_avocado" />
          </div>
          <div>
            <h4>The Adult Avocado</h4>
            <p>65 - 90% water</p>
            <img className='img--wrapper' src={adultAvocado} alt="adult_avocado" />
          </div>
          <div>
            <h4>The Ultimate Avocado Toast</h4>
            <p>90 - 100% water</p>
            <img className='img--wrapper' src={avocadoToast} alt="toast" />
          </div>
        </div>

      </IonContent>
    </ >
  );
};

export default AnalysisInfoModal;
