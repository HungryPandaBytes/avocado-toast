import React, { useState } from 'react';
import avocado from '../theme/avocado.png'
import { StoreContext } from '../store'
import './BudgetInput.scss';
import { IonItem, IonLabel, IonInput, IonRange, IonButton } from '@ionic/react';
import { findByLabelText } from '@testing-library/dom';

interface BudgetInputProps {

}

const BudgetInput: React.FC<BudgetInputProps> = () => {

  const store = React.useContext(StoreContext);
  const [savingPercentage, setSavingPercentage] = useState(0);
  const [income, setIncome] = useState(0);
  const [recurringExpenses, setRecurringExpenses] = useState(0);


  const budgetPerDay = Math.ceil((income - (income * savingPercentage / 100)) / 365)
  const savingsPerDay = Math.floor((income * savingPercentage / 100) / 365)

  function saveBudgetClickHandler() {
    const budget = {
      daily: budgetPerDay,
      yearly: {
        yearlyIncome: income,
        yearlySaving: income * savingPercentage
      },
      balance: budgetPerDay
    }
    console.log("save budget", { income }, { budgetPerDay })
  }

  return (
    <div id="budget-input" style={{ position: 'relative' }}>

      <IonItem lines='none'>
        <IonLabel color='medium'>Monthly Income</IonLabel>
      </IonItem >
      <IonItem color='light' lines='none' style={{ width: '40%', marginLeft: '5%' }}>
        <IonInput color='medium' type="number" value={income} placeholder="Income" onIonChange={e => {
          if (e.detail.value! === "") {
            setIncome(0)
          } else {
            setIncome(parseInt(e.detail.value!, 10))
          }
        }} clearInput></IonInput>
      </IonItem>
      <div style={{ textAlign: 'right' }}>{Math.ceil(income / 30)}/day</div>


      <IonItem lines='none'>
        <IonLabel color='medium'>Recurring Expenses</IonLabel>
      </IonItem >
      <IonItem color='light' lines='none' style={{ width: '40%', marginLeft: '5%' }}>
        <IonInput color='medium' className="ion-no-border" type="number" value={recurringExpenses} placeholder="Rent, Utilities etc." onIonChange={e => {
          if (e.detail.value! === "") {
            setRecurringExpenses(0)
          } else {
            setRecurringExpenses(parseInt(e.detail.value!, 10))
          }
        }} clearInput></IonInput>
      </IonItem>
      <div style={{ textAlign: 'right' }}>{Math.ceil(recurringExpenses / 30)}/day</div>

      <IonItem lines='none'>
        <IonLabel color='medium'>Savings: {savingPercentage}%</IonLabel>
      </IonItem>
      <IonItem color='light' lines='none' style={{ width: '60%', marginLeft: '5%' }}>
        <IonRange color='primary' pin={true} value={savingPercentage} onIonChange={e => {
          setSavingPercentage(e.detail.value as number)
        }} />
      </IonItem>
      <div style={{ textAlign: 'right' }}>{Math.ceil(savingsPerDay)}/day</div>

      <div className="ion-text-center">
        <IonButton style={{ margin: '5%' }} expand='block' fill='solid' onClick={saveBudgetClickHandler} className="expense-button" >SAVE</IonButton>
      </div>
    </div >
  )
}

export default BudgetInput;