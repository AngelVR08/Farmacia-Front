// src/components/molecules/FormRow.jsx
import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';

const FormRow = ({ label, inputType, value, onChange, placeholder }) => {
  return (
    <div className="form-row">
      <Label text={label} htmlFor={label} />
      {inputType === 'textarea' ? (
        <Textarea value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <Input type={inputType} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  );
};

export default FormRow;
