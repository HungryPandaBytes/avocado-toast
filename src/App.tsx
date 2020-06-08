import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { walletOutline, statsChartOutline, cardOutline, calculatorOutline } from 'ionicons/icons';
import { StoreProvider } from './store';
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import BudgetPage from './pages/BudgetPage';
import AnalysisPage from './pages/AnalysisPage';
import AddTransaction from './components/AddTransactionModal'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Global css */
import './theme/global.css';
import Onboarding from './pages/Onboarding';

const App: React.FC = () => {

  return (
    < StoreProvider >
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/onboarding" component={Onboarding} exact={true} />
              <Route path="/addtransaction" component={AddTransaction} exact={true} />
              <Route path="/transactions" component={TransactionsPage} exact={true} />
              <Route path="/analysis" component={AnalysisPage} exact={true} />
              <Route path="/budget" component={BudgetPage} exact={true} />
              <Route path="/" component={HomePage} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={walletOutline} />
                <IonLabel>Pocket</IonLabel>
              </IonTabButton>
              <IonTabButton tab="transactions" href="/transactions">
                <IonIcon icon={cardOutline} />
                <IonLabel>Transactions</IonLabel>
              </IonTabButton>
              <IonTabButton tab="budget" href="/budget">
                <IonIcon icon={calculatorOutline} />
                <IonLabel>Budget</IonLabel>
              </IonTabButton>
              <IonTabButton tab="analysis" href="/analysis">
                <IonIcon icon={statsChartOutline} />
                <IonLabel>Analysis</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </StoreProvider >

  )
};

export default App;
