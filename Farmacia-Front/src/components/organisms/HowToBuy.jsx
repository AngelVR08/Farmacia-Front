import React from 'react';
import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';
import Step from '../atoms/Step';
import ElegirIcon from '../../assets/Images/icon-path-1.png';
import CompletarIcon from '../../assets/Images/icon-path-2.png';
import RecogerIcon from '../../assets/Images/icon-path-3.png';

const HowToBuy = () => {
  return (
    <div className="how-to-buy">
      <div className="how-to-buy-header">
        <Title>TE LO PONEMOS FÁCIL</Title>
        <Subtitle>¿Cómo comprar?</Subtitle>
      </div>
      <div className="steps">
        <Step
          icon={ElegirIcon}
          title="Elegir"
          description="Selecciona tus medicamentos de entre todas nuestras opciones."
        />
        <Step
          icon={CompletarIcon}
          title="Completar"
          description="Selecciona la farmacia de tu elección y descarga tu váucher."
        />
        <Step
          icon={RecogerIcon}
          title="Recoger"
          description="Recoge y paga en tienda, es rápido y fácil."
        />
      </div>
    </div>
  );
};

export default HowToBuy;
