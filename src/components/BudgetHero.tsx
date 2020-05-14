import React from 'react';
import avocado from '../theme/ketnip.png'
import { StoreContext } from '../store'
import './BudgetHero.scss';

interface BudgetHeroProps {
}

const BudgetHero: React.FC<BudgetHeroProps> = () => {

  const store = React.useContext(StoreContext);

  return (
    <div id="budget-hero">
      <div className='hero--wrapper'>
        <p>OK to spend</p>
        <h3>$189/day</h3>
      </div>
      <img className='image--wrapper' src={avocado} alt="Logo" />
    </div>
  )
}

export default BudgetHero;