import React from 'react';
import './MainDisplayContainer.css';

interface MainDisplayContainerProps {
  period: string;
  balance: number;

}
const MainDisplayContainer: React.FC<MainDisplayContainerProps> = ({ period, balance }) => {
  const mainDisplayView = balance < 0 ? "display-container--positive" : "display-container--negative"

  return (
    <>
      <h1>{period}</h1>
      <p>ionic conference</p>
      <div className="display-container">sdjfhsdjkfhksjdfssjdfh</div>
    </>
  )
}

export default MainDisplayContainer;