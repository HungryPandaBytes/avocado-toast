import React from "react";
import { PickerColumn } from "@ionic/core";
import { IonPicker } from "@ionic/react";

interface _Props {
  isOpen : boolean
  onSave : Function
  onCancel : Function
}

const CategoryColumn = {
  name: "category",
  options: [
    { text: "General 🥑", value: "General" },
    { text: "Coffee ☕", value: "Coffee" },
    { text: "Grocery 🛒", value: "Grocery" },
    { text: "Restaurant 🍜", value: "Restaurant" },
    { text: "Household 🏠", value: "Household" },
    { text: "Leisure 🌴", value: "Leisure" },
    { text: "Shopping 🛍️", value: "Shopping" },
    { text: "Transportation 🚌", value: "Transportation" },
  ]
} as PickerColumn;

const CategoryPicker: React.FC<_Props> = ({onSave, onCancel, isOpen}) => { 
  return <div>
    <IonPicker
      isOpen={isOpen}
      columns={[CategoryColumn]}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: value => {
            onCancel()
          }
        },
        {
          text: "Confirm",
          handler: value => {
            onSave(value)
          }
        }
      ]}
    ></IonPicker>
  </div>
}

export default CategoryPicker;