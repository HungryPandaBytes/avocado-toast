import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
    <IonPage id="analysis-page">
      <IonContent>
        <IonHeader className="ion-no-border" collapse="condense">
          <IonToolbar>
            <IonTitle color='tertiary' size="large">Saving Statuses</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h3>Whenever you spend less than you budgeted, you grow your avocado seed. Ultimately, the cute avocado will become a yummy avocado toast.</h3>
        <div>
          <h3>0% - 20% water</h3>
          <p>The Baby Seed</p>
          <img src={babySeed} alt="baby_seed" />
        </div>
        <div>
          <h3>20% - 40% water</h3>
          <p>The Baby Avocado</p>
          <img src={babyAvocado} alt="baby_avocado" />
        </div>
        <div>
          <h3>40% - 65% water</h3>
          <p>The Teen Avocado</p>
          <img src={teenAvocado} alt="teen_avocado" />
        </div>
        <div>
          <h3>65% - 90% water</h3>
          <p>The Adult Avocado</p>
          <img src={adultAvocado} alt="adult_avocado" />
        </div>
        <div>
          <h3>90% - 100% water</h3>
          <p>The Ultimate Avocado Toast</p>
          <img src={avocadoToast} alt="toast" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AnalysisInfoModal;
