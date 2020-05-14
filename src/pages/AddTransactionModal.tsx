import React, { useState, MouseEvent } from 'react';
import {
  IonHeader, IonToolbar, IonButtons, IonDatetime, IonButton, IonIcon, IonChip, IonContent, IonLabel, IonSelect, IonItem, IonToggle, IonSelectOption, IonSegment, IonSegmentButton, IonRippleEffect, IonPage
} from '@ionic/react';
import './AddTransactionModal.scss';
import { calendar } from 'ionicons/icons';

interface AddTransactionModalProps {
  onClose: any
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose }) => {

  const todayTimeStamp = new Date().toISOString();

  const [displayBalance, setDisplayBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [distributionAmt, setdistributionAmt] = useState("");
  const [category, setCategory] = useState("General");
  const [selectedDate, setSelectedDate] = useState<string>(`${todayTimeStamp}`);
  const [checked, setChecked] = useState(false);

  let transactionType = "Expense"
  function setTransactionTypeHandler(event: any) {
    transactionType = event.detail.value
    console.log(transactionType)
  }

  function numpadClickHandler(event: MouseEvent<HTMLIonButtonElement>) {
    const numStr: string = event.currentTarget.innerText
    displayAmount(numStr)
  }

  function displayAmount(numStr: string) {

    let tempAmount: string;
    if (amount.length < 12 && !(amount.length === 0 && numStr === "0")) {
      tempAmount = amount + numStr
    } else {
      tempAmount = amount
    }
    setAmount(tempAmount)
    setDisplayBalance(parseInt(tempAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + "")
  }

  function distributionHandler() {
    var distributionPerDay = (Math.ceil(parseInt(amount) / 30)) + ""
    setdistributionAmt(distributionPerDay)
  }

  function deleteClickHandler() {
    const lastIdx = amount.length - 1
    const tempAmount = amount.slice(0, lastIdx)
    setChecked(false)
    setdistributionAmt("")
    setAmount(tempAmount)
    setDisplayBalance(parseInt(tempAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + "")
  }

  function saveClickHandler(event: MouseEvent<HTMLIonButtonElement>, callback: any) {
    const date = new Date(selectedDate)

    const newTransaction = {
      id: 1,
      amount: amount,
      transaction_time: date,
      description: category,
      category_name: "shopping",
      ignore: false,
      category_id: "1",
      transaction_type: transactionType,
      iconName: "basket-outline"
    }
    event.preventDefault();
    setAmount("");
    setDisplayBalance("");
    setdistributionAmt("")
    callback();
  }



  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>Cancel</IonButton>
          </IonButtons>
          <IonChip slot="end">
            <IonIcon icon={calendar} color="primary" />
            <IonDatetime
              min="2018-02"
              max="2025"
              displayFormat="MMM DD YYYY"
              monthShortNames="Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec"
              value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}
            > </IonDatetime>
          </IonChip>
        </IonToolbar>
        <IonSegment value="Expense" onIonChange={setTransactionTypeHandler}>
          <IonSegmentButton value="Expense">
            <IonLabel>Expense</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Income">
            <IonLabel>Income</IonLabel>
          </IonSegmentButton>
        </IonSegment>

      </IonHeader>


      <IonContent className='expense-view'>
        <div className='expense-view'>
          <div className='expense-amount'>{amount && <h2>{displayBalance}</h2>}
            {(amount && checked) && <div className='distribution-amount'>
              <h5>${parseInt(distributionAmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/day over 30 days</h5></div>}
          </div>

          <div className='distribution-toggle'>
            <IonItem lines="none">
              <IonLabel slot="end" className="ion-text-end ion-no-margin ">Split</IonLabel>
              <IonToggle slot="end" name="apple" color="primary" checked={checked} onIonChange={e => {
                setChecked(e.detail.checked)
                distributionHandler();
              }} />
            </IonItem>
          </div>
        </div>
        <div className='input-container'>

          <div className='expense-typepad-wrapper'>
            <IonItem color="none" lines="none" class='category-picker-container'>
              <IonLabel class="cateory-picker" position='fixed'>Cateogry:</IonLabel>
              <IonSelect class="cateory-picker" value={category} interface="popover" onIonChange={e => setCategory(e.detail.value)}>
                <IonSelectOption value="General">General</IonSelectOption>
                <IonSelectOption value="Restaurant">Restaurant</IonSelectOption>
                <IonSelectOption value="Grocery">Grocery</IonSelectOption>
                <IonSelectOption value="Shopping">Shopping</IonSelectOption>
                <IonSelectOption value="Household">Household</IonSelectOption>
                <IonSelectOption value="Transportation">Transportation</IonSelectOption>
                <IonSelectOption value="Leisure">Leisure</IonSelectOption>
              </IonSelect>
            </IonItem>
            <div className='expense-typepad-container '>
              <div >
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">1</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">2</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">3</IonButton>
              </div>
            </div>
            <div className='expense-typepad-container'>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">4</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">5</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">6</IonButton>
              </div>
            </div>
            <div className='expense-typepad-container'>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">7</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button" >8</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">9</IonButton>
              </div>
            </div>
            <div className='expense-typepad-container'>
              <div>
                <IonButton size="large" fill="clear" onClick={deleteClickHandler} className="expense-button">Del</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">0</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" className="expense-button">Save</IonButton>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </>
  )
};


export default AddTransactionModal;