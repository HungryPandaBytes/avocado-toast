import React from 'react';
import avocado from '../theme/ketnip.png'
import { StoreContext } from '../store'
import './AnalysisHero.scss';

interface AnalysisHeroProps {

}

const AnalysisHero: React.FC<AnalysisHeroProps> = () => {

  const store = React.useContext(StoreContext);


  return (
    <div id="analysis-hero">
      <div className='hero--wrapper'>
        <img className='image--wrapper' src={avocado} alt="Logo" />
      </div>

    </div>
  )
}

export default AnalysisHero;