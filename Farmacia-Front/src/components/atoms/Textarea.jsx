import React from 'react';

const Textarea = ({ value, onChange, placeholder }) => {
  return (
    <textarea 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className="textarea"
    />
  );
};

export default Textarea;