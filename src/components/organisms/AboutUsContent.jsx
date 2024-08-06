import React from 'react';
import InfoSection from '../molecules/InfoSection';

const AboutUsContent = () => {
  return (
    <div className="about-us-content">
      <InfoSection 
        title="NUESTRA HISTORIA" 
        subtitle="Comprometidos con la Salud desde 2011" 
        text="Alcanzar nuestros primeros 13 años de historia ha requerido voluntad, esfuerzo, mucho trabajo e innovación, cualidades que nos han ayudado a superar diversos retos." 
      />
      <InfoSection 
        title="PRIMERA SUCURSAL" 
        subtitle="Nuestro comienzo" 
        text="En 2011, inauguramos nuestra primera sucursal en Valle Morelos, Mpio. Villa Corzo, Chiapas, para satisfacer la necesidad de una farmacia bien surtida en la comunidad." 
      />
      <InfoSection 
        title="SEGUNDA SUCURSAL" 
        subtitle="Primera expanción" 
        text="En 2015, abrimos nuestra segunda sucursal en una nueva ubicación dentro del mismo pueblo, respondiendo a la necesidad de contar con un acceso más cercano a medicamentos, especialmente para las personas mayores y las comunidades vecinas." 
      />      
      <InfoSection 
        title="TERCERA SUCURSAL" 
        subtitle="Expandiendo nuestro horizontes" 
        text="En 2021, inauguramos nuestra tercera sucursal, con el objetivo de expandir nuestra presencia en la región y servir mejor a nuestra comunidad,mejorando el alcance a nuestros clientes." 
      />
    </div>
  );
};

export default AboutUsContent;
