import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ label, handleCheckboxChange }) => {
  return (
    <div className={classes}>
      Some text
      <label>{label}</label>
      <button onClick={handleCheckboxChange}>
        Toggle checkbox
      </button>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
