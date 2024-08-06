import React from 'react';

const Label = ({ text, htmlFor }) => {
  return (
    <label htmlFor={htmlFor}>{text}</label>
  );
};

export default Label;