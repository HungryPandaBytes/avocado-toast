import React, { useState, MouseEvent } from 'react';
import {
  IonHeader, IonToolbar, IonButtons, IonDatetime, IonButton, IonIcon, IonChip, IonContent, IonLabel, IonSelect, IonItem, IonToggle, IonSelectOption, IonSegment, IonSegmentButton
} from '@ionic/react';
import './AddTransactionModal.scss';
import moment from 'moment'
import { calendar } from 'ionicons/icons';
import { StoreContext } from '../store';
import { CategoryName } from '../models/CategoryName';
import { Transaction } from '../models/Transaction';
import { addNewTransactionToDB } from '../data/dataAPI'

interface AddTransactionModalProps {
  onClose: any
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose }) => {
  const store = React.useContext(StoreContext);

  const [displayBalance, setDisplayBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [distributionAmt, setdistributionAmt] = useState("");
  const [category, setCategory] = useState(CategoryName.General);

  const cuurentTimeStamp = moment();
  const oneMonthFromNow = moment().add(1, 'month');
  const [selectedDate, setSelectedDate] = useState<string>(`${cuurentTimeStamp}`);
  const [splitStartDate, setSplitStartDate] = useState<string>(`${cuurentTimeStamp}`);
  const [splitEndDate, setSplitEndDate] = useState<string>(`${oneMonthFromNow}`);

  const [split, setSplit] = useState(false);
  const [transactionType, setTransactionType] = useState("Expense");

  const today = new Date().toISOString().split('T')[0];

  function setTransactionTypeHandler(transactionOption: any) {
    if (transactionOption === 'Expense') {
      setTransactionType(transactionOption);
      setCategory(category)
    } else {
      setTransactionType(transactionOption);
      setCategory(category)
      setdistributionAmt("")
      setSplit(false)
    }
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
    let numberOfSplitDays = moment(splitEndDate).diff(moment(splitStartDate), 'days');

    if (numberOfSplitDays >= 1) {
      var distributionPerDay = (Math.ceil(parseInt(amount) / numberOfSplitDays)) + ""
      setdistributionAmt(distributionPerDay)
    } else {
      setdistributionAmt(amount)
    }
  }

  function deleteClickHandler() {
    const lastIdx = amount.length - 1
    const tempAmount = amount.slice(0, lastIdx)
    setSplit(false)
    setdistributionAmt("")
    setAmount(tempAmount)
    setDisplayBalance(parseInt(tempAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + "")
  }

  function saveClickHandler(event: MouseEvent<HTMLIonButtonElement>, callback: any) {
    event.preventDefault();
    const date = new Date(selectedDate)

    const newTransaction: Transaction = {
      id: 1,
      amount: parseInt(amount),
      transaction_time: date,
      description: category,
      category_name: category,
      category_id: '2',
      ignore: false,
      split: split,
      iconName: 'test',
      transaction_type: transactionType,
    }

    if (parseInt(amount) > 0) {
      store.addTransaction(newTransaction)
      setAmount("");
      setDisplayBalance("");
      setdistributionAmt("")
      callback();
      let allTransaction = store.transactions;
      addNewTransactionToDB(allTransaction);
    }

  }

  const categorySelectOptions = Object.keys(CategoryName).map((categoryName) => {
    if (isNaN(parseInt(categoryName))) {
      return <IonSelectOption value={categoryName} key={categoryName}>{categoryName}</IonSelectOption>;
    }
  });

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
              max={today}
              displayFormat="MMM DD YYYY"
              monthShortNames="Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec"
              value={selectedDate} onIonChange={e => {
                setSelectedDate(e.detail.value!);
              }}
            > </IonDatetime>
          </IonChip>
        </IonToolbar>
        <IonSegment value={transactionType} onIonChange={e => {
          setTransactionTypeHandler(e.detail.value!);
        }}>
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
            {(amount && split) && <div className='distribution-amount'>
              <h5>${parseInt(distributionAmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/day   </h5></div>}
          </div>

          {transactionType === 'Expense' && <div className='distribution-toggle'>
            <IonItem lines="none">
              <IonLabel slot="end" className="ion-text-end ion-no-margin ">Split</IonLabel>
              <IonToggle slot="end" name="apple" color="primary" checked={split} onIonChange={e => {
                e.preventDefault();
                setSplit(e.detail.checked)
                distributionHandler();
              }} />
            </IonItem>
          </div>}
        </div>

        <div className='input-container'>
          <div className='expense-typepad-wrapper'>
            {(transactionType === 'Expense' && split) &&
              <div className='split-date-picker-wrapper'>
                <IonItem lines="none" color='primary'>
                  <IonLabel >Split Start Date</IonLabel>
                  <IonDatetime
                    min="2019-02"
                    max="2025"
                    displayFormat="MMM DD YYYY"
                    monthShortNames="Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec"
                    value={splitStartDate} onIonChange={e => {
                      setSplitStartDate(e.detail.value!);
                      distributionHandler();
                    }}
                  > </IonDatetime>
                </IonItem>
                <IonItem lines="none" color='primary'>
                  <IonLabel>Split End Date</IonLabel>
                  <IonDatetime
                    min="2019-02"
                    max="2025"
                    displayFormat="MMM DD YYYY"
                    monthShortNames="Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec"
                    value={splitEndDate} onIonChange={e => {
                      setSplitEndDate(e.detail.value!);
                      distributionHandler();
                    }
                    }
                  > </IonDatetime>
                </IonItem>
              </div>}

            {transactionType === 'Expense' && <IonItem color="none" lines="none" class='category-picker-container'>
              <IonLabel class="cateory-picker" position='fixed'>Category:</IonLabel>
              <IonSelect class="cateory-picker" value={category} interface="popover" onIonChange={e => setCategory(e.detail.value)}>
                {categorySelectOptions}
              </IonSelect>
            </IonItem>}

            {[1, 4, 7].map((i) => {
              return (
                <div className='expense-typepad-container ' key={i}>
                  <div >
                    <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">{i}</IonButton>
                  </div>
                  <div>
                    <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">{i + 1} </IonButton>
                  </div>
                  <div>
                    <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">{i + 2}</IonButton>
                  </div>
                </div>
              )
            })}
            <div className='expense-typepad-container '>
              <div >
                <IonButton size="large" fill="clear" onClick={deleteClickHandler} className="expense-button">delete</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" onClick={numpadClickHandler} className="expense-button">0</IonButton>
              </div>
              <div>
                <IonButton size="large" fill="clear" onClick={(e) => saveClickHandler(e, onClose)} className="expense-button">save</IonButton>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </>
  )
};


export default AddTransactionModal;