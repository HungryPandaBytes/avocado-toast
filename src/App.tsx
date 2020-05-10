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
import { ellipse, square, triangle } from 'ionicons/icons';
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import BudgetPage from './pages/BudgetPage';
import AnalysisPage from './pages/AnalysisPage';

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

/* mobx global state */
import { useLocalStore, useObserver } from 'mobx-react'


interface contextInterface {
  transactions: string[],
  budget: { income: number, reoccuringExpenses: number, savingPercentage: number }
}

const defaultContext: contextInterface = {
  transactions: ['rest'],
  budget: { income: 0, reoccuringExpenses: 0, savingPercentage: 0 }
}

export const StoreContext = React.createContext(defaultContext);

const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(() => ({
    transactions: ['adsfasdf'],
    budget: { income: 0, reoccuringExpenses: 0, savingPercentage: 0 }
  }))

  return (
    <StoreContext.Provider value={store}> {children}</StoreContext.Provider >
  )
}


const App: React.FC = () => {
  return (
    <StoreProvider>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/transactions" component={TransactionsPage} exact={true} />
              <Route path="/analysis" component={AnalysisPage} exact={true} />
              <Route path="/budget" component={BudgetPage} exact={true} />
              <Route path="/" component={HomePage} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={triangle} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="transactions" href="/transactions">
                <IonIcon icon={ellipse} />
                <IonLabel>Transactions</IonLabel>
              </IonTabButton>
              <IonTabButton tab="analysis" href="/analysis">
                <IonIcon icon={square} />
                <IonLabel>Analysis</IonLabel>
              </IonTabButton>
              <IonTabButton tab="budget" href="/budget">
                <IonIcon icon={square} />
                <IonLabel>Set Budget</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </StoreProvider>

  )
};

export default App;
