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


  const budgetPerDay = Math.ceil((income - ((income * savingPercentage / 100)) / 30))
  const savingsPerDay = Math.floor((income - recurringExpenses) * savingPercentage / 100 / 30)

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
    <div id="budget-input" style={{ position: 'relative', width: '100%' }}>

      <IonItem lines='none'>
        <IonLabel color='medium' slot='start'>Income</IonLabel>
        <IonLabel color='primary' slot='end'>${Math.ceil(income / 30).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/day</IonLabel>
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


      <IonItem lines='none'>
        <IonLabel color='medium' slot='start'>Recurring Expenses</IonLabel>
        <IonLabel color='primary' slot='end'>${Math.ceil(recurringExpenses / 30)}/day</IonLabel>
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
        <IonLabel color='medium' slot='start'>Savings {savingPercentage}%</IonLabel>
        <IonLabel color='primary' slot='end'>${savingsPerDay}/day</IonLabel>
      </IonItem>
      <IonItem color='light' lines='none' style={{ width: '90%', marginLeft: '5%' }}>
        <IonRange style={{ maxWidth: '50%', marginLeft: '0%' }} color='primary' pin={true} value={savingPercentage} onIonChange={e => {
          setSavingPercentage(e.detail.value as number)
        }} />
        <div style={{ marginRight: '10%', maxWidth: '25%', color: 'grey' }}>/month</div>
      </IonItem >


      <IonItem lines='none'>
        <IonLabel color='medium' slot='start'>Daily Budget </IonLabel>
        <IonLabel color='primary' slot='end'>${budgetPerDay}/day</IonLabel>
      </IonItem>

      <div className="ion-text-center">
        <IonButton style={{ margin: '5%' }} expand='block' fill='solid' onClick={saveBudgetClickHandler} className="expense-button" >SET BUDGET</IonButton>
      </div>
    </div >
  )
}
export default BudgetInput;