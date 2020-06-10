import React, { useState } from 'react';
import avocado from '../theme/baby_avocado.png';
import { StoreContext } from '../store';
import './BudgetInput.scss';
import { IonItem, IonLabel, IonInput, IonRange, IonButton } from '@ionic/react';
import { addNewBudgetToDB } from '../data/dataAPI';

interface BudgetInputProps {
  onboarding: boolean
}

const BudgetInput: React.FC<BudgetInputProps> = ({ onboarding }) => {

  const store = React.useContext(StoreContext);
  const [savingPercentage, setSavingPercentage] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [income, setIncome] = useState(0);
  const [recurringExpenses, setRecurringExpenses] = useState(0);
  let budgetPerDay = 0;

  if (onboarding) {
    budgetPerDay = Math.ceil((income - recurringExpenses - monthlySavings) / 30)
  } else {
    budgetPerDay = Math.ceil((income - recurringExpenses - ((income - recurringExpenses) * savingPercentage / 100)) / 30)
  }

  const savingsPerDay = Math.floor((income - recurringExpenses) * savingPercentage / 100 / 30)

  function saveBudgetClickHandler() {
    const newBudget = {
      income: income,
      reoccuringExpenses: recurringExpenses,
      savingPercentage: savingPercentage,
      budgetPerDay: budgetPerDay
    }
    store.setBudget(newBudget);
    addNewBudgetToDB(newBudget)
  }

  return (
    <div id="budget-input" style={{ position: 'relative', width: '100%' }}>
      <div id="budget-hero">
        <div className='hero--wrapper'>
          {!onboarding && <p>OK to spend</p>}
          {onboarding && <p>Daily Budget</p>}
          <h3>${budgetPerDay}/day</h3>
        </div>
        <img className='image--wrapper' src={avocado} alt="Logo" />
      </div>
      {onboarding && <IonItem lines='none' style={{ marginTop: '5%' }}>
        <h2 color='medium'>Let's figure out your daily budget.</h2>
      </IonItem>
      }
      <IonItem lines='none'>
        {!onboarding && <IonLabel color='medium' slot='start'>Income</IonLabel>}
        {onboarding && <IonLabel color='medium'>What's your monthly income?</IonLabel>}
        {!onboarding && <IonLabel color='primary' slot='end'>${Math.ceil(income / 30).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/day</IonLabel>}
      </IonItem >
      <IonItem color='light' lines='none' style={{ width: '90%', marginLeft: '5%' }}>
        <IonInput style={{ maxWidth: '50%', color: 'grey' }} color='primary' type="number" value={income} placeholder="Income" max='50000' onIonChange={e => {
          if (e.detail.value! === "") {
            setIncome(0)
          } else {
            setIncome(parseInt(e.detail.value!, 10))
          }
        }} clearInput></IonInput>
        <div style={{ marginRight: '10%', maxWidth: '25%', color: 'grey' }}>/month</div>
      </IonItem>

      {console.count('budgetInput component count')}
      <IonItem lines='none' >
        {!onboarding && <IonLabel color='medium' slot='start'>Recurring Expenses</IonLabel>}
        {onboarding && <IonLabel color='medium' style={{ marginBottom: 0 }}>What're your monthly recurring expenses? </IonLabel>}
        {!onboarding && <IonLabel color='primary' slot='end'>${Math.ceil(recurringExpenses / 30)}/day</IonLabel>
        }
      </IonItem >
      <IonItem color='light' lines='none' style={{ width: '90%', marginLeft: '5%' }}>
        <IonInput color='primary' style={{ maxWidth: '50%', color: 'grey' }} className="ion-no-border" type="number" value={recurringExpenses} placeholder="Rent, Utilities etc." onIonChange={e => {
          if (e.detail.value! === "") {
            setRecurringExpenses(0)
          } else {
            setRecurringExpenses(parseInt(e.detail.value!, 10))
          }
        }} clearInput></IonInput>
        <div style={{ marginRight: '10%', maxWidth: '25%', color: 'grey' }}>/month</div>
      </IonItem>

      <IonItem lines='none'>
        {!onboarding &&
          <>
            <IonLabel color='medium' slot='start'>Savings {savingPercentage}%</IonLabel>
            <IonLabel color='primary' slot='end'>${savingsPerDay}/day</IonLabel>
          </>
        }
        {onboarding && <IonLabel color='medium' >How much do you want to save?</IonLabel>}
      </IonItem>
      {
        !onboarding && <IonItem color='light' lines='none' style={{ width: '90%', marginLeft: '5%' }}>
          <IonRange style={{ maxWidth: '50%', marginLeft: '0%' }} color='primary' pin={true} value={savingPercentage} onIonChange={e => {
            setSavingPercentage(e.detail.value as number)
          }} />
          <div style={{ marginRight: '10%', maxWidth: '25%', color: 'grey' }}>/month</div>
        </IonItem >
      }
      {
        onboarding && <IonItem color='light' lines='none' style={{ width: '90%', marginLeft: '5%' }}>
          <IonInput color='primary' style={{ maxWidth: '50%', color: 'grey' }} className="ion-no-border" type="number" value={monthlySavings} placeholder="monthly savings" onIonChange={e => {
            if (e.detail.value! === "") {
              setMonthlySavings(0)
            } else {
              setMonthlySavings(parseInt(e.detail.value!, 10));
              setSavingPercentage(monthlySavings / income);
            }
          }} clearInput></IonInput>
          <div style={{ marginRight: '10%', maxWidth: '25%', color: 'grey' }}>/month</div>
        </IonItem>
      }


      {
        !onboarding && <IonItem lines='none'>
          <IonLabel color='medium' slot='start'>Daily Budget </IonLabel>
          <IonLabel color='primary' slot='end'>${budgetPerDay}/day</IonLabel>
        </IonItem>
      }

      {
        !onboarding && <div className="ion-text-center">
          <IonButton style={{ margin: '5%' }} expand='block' fill='solid'
            onClick={saveBudgetClickHandler} className="expense-button" routerLink="/homepage">UPDATE BUDGET</IonButton>
        </div>
      }
      {
        onboarding && <div className="ion-text-center">
          <IonButton style={{ margin: '7% 5% 5% 5%' }} expand='block' fill='solid'
            onClick={saveBudgetClickHandler} className="expense-button" routerLink="/homepage">I'M READY TO TRACK AND SAVE!</IonButton>
        </div>
      }
    </div >
  )
}
export default BudgetInput;