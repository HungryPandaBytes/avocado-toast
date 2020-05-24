import React from "react";
import { StoreContext } from "../store";
import { IonList } from "@ionic/react";

const WeeklySlide: React.FC = () => {
  const store = React.useContext(StoreContext);

  return (
      <IonList>

      </IonList>
  );
};

export default WeeklySlide;