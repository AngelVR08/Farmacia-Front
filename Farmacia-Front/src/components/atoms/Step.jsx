import React from 'react';

const Step = ({ icon, title, description }) => {
  return (
    <div className="step">
      <img src={icon} alt={title} className="step-icon" />
      <h4 className="step-title">{title}</h4>
      <p className="step-description">{description}</p>
    </div>
  );
};

export default Step;
