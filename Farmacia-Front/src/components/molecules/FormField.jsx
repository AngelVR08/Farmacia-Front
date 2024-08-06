import React from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';

const FormField = ({ label, type = 'text', value = '', onChange, placeholder = '' }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default FormField;
