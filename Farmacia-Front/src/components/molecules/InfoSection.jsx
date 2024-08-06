import React from 'react';
import PropTypes from 'prop-types';

const InfoSection = ({ title, subtitle, text }) => {
  return (
    <div className="info-section">
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <p>{text}</p>
    </div>
  );
};

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default InfoSection;
