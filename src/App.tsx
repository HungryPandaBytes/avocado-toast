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

import { StoreContext } from '../src/store'

/* Access SQLiteService */
import { SQLiteService } from './services/SQLiteService';
import { concatAll } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';

// class App extends React.Component {
//   sqliteService: SQLiteService;
//   store: any;

//   constructor(props: any) {
//     super(props);
//     this.sqliteService = new SQLiteService();
//     this.store = React.useContext(StoreContext);
//   }


//   async componentDidMount() {
//     await this.sqliteService.initalizePlugin();
//     await this.seedSQLiteDB();
//   }

//   async seedSQLiteDB(): Promise<void> {
//     console.log('its running fooMethod')
//     console.log(this.sqliteService)
//     if (this.sqliteService.isService) {
//       // open the database
//       this.sqliteService.openDB("test-avocado-toast")
//         .subscribe(result => {
//           if (result.result) {
//             console.log(result)
//           }
//         })
//       // create tables 
//       const sqlcmd: string = `
//         CREATE TABLE IF NOT EXISTS transactions(
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           amount INTEGER, transaction_time DATE,
//           category_name TEXT,
//           description TEXT,
//           category_id INTEGER,
//           split BOOLEAN,
//           ignore BOOLEAN,
//           transaction_type TEXT
//         );
//         CREATE TABLE IF NOT EXISTS budget(
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           income INTEGER,
//           recurringExpenses INTEGER,
//           savingPercentage NUMBER,
//           budgetPerDAY INTEGER
//         );
//       `;
//       this.sqliteService.execute(sqlcmd)
//         .subscribe(result => {
//           if (result.changes === 0 || result.changes === 1) {
//             let TransactionsObservables: Observable<any>[] = [];
//             let BudgetObservables: Observable<any>[] = [];

//             // insert some transactions
//             let sqlcmd: string = `
//             DELETE FROM transactions
//             INSERT INTO transactions VALUES(1, 125, new Date(), 'Restaurant', 'Omakase', false, false, 'expense');
//             INSERT INTO transactions VALUES(2, 225, new Date(), 'Restaurant', 'Supreme', false, false, 'expense');
//             INSERT INTO transactions VALUES(3, 5, new Date(), 'Restaurant', 'Gigantic Pea', false, false, 'expense');
//             `;
//             TransactionsObservables.push(this.sqliteService.execute(sqlcmd));
//             // select all transactions
//             sqlcmd = 'SELECT * FROM transactions';
//             TransactionsObservables.push(this.sqliteService.query(sqlcmd));

//             // Insert the dummy budget
//             sqlcmd = `
//             DELETE FROM budget
//             INSERT INTO budget VALUES (1, 10000, 2000, 0.20, 700);
//             `;
//             BudgetObservables.push(this.sqliteService.execute(sqlcmd));
//             // select the budget
//             sqlcmd = "SELECT * FROM budget";
//             BudgetObservables.push(this.sqliteService.query(sqlcmd));

//             // Close the Database
//             BudgetObservables.push(this.sqliteService.close("test-avocado-toast"));
//           }
//         })

//     } else {
//       console.log('CapacitorSQLite Plugin: Initialization Failed because its web');
//     }
//   }


//   render() {
//     return (
//       <StoreProvider>
//         <IonApp>
//           <IonReactRouter>
//             <IonTabs>
//               <IonRouterOutlet>
//                 <Route path="/addtransaction" component={AddTransaction} exact={true} />
//                 <Route path="/transactions" component={TransactionsPage} exact={true} />
//                 <Route path="/analysis" component={AnalysisPage} exact={true} />
//                 <Route path="/budget" component={BudgetPage} exact={true} />
//                 <Route path="/" component={HomePage} />
//               </IonRouterOutlet>
//               <IonTabBar slot="bottom">
//                 <IonTabButton tab="home" href="/home">
//                   <IonIcon icon={walletOutline} />
//                   <IonLabel>Pocket</IonLabel>
//                 </IonTabButton>
//                 <IonTabButton tab="transactions" href="/transactions">
//                   <IonIcon icon={cardOutline} />
//                   <IonLabel>Transactions</IonLabel>
//                 </IonTabButton>
//                 <IonTabButton tab="budget" href="/budget">
//                   <IonIcon icon={calculatorOutline} />
//                   <IonLabel>Budget</IonLabel>
//                 </IonTabButton>
//                 <IonTabButton tab="analysis" href="/analysis">
//                   <IonIcon icon={statsChartOutline} />
//                   <IonLabel>Analysis</IonLabel>
//                 </IonTabButton>
//               </IonTabBar>
//             </IonTabs>
//           </IonReactRouter>
//         </IonApp>
//       </StoreProvider>
//     )
//   }
// }

const App: React.FC = () => {
  return (
    <StoreProvider>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
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
    </StoreProvider>

  )
};

export default App;
