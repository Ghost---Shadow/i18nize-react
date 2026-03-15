import i18n from 'i18next';import k from '~/i18n/keys';import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ label, handleCheckboxChange }) => {
  return (
    <div className={classes}>
      {i18n.t(k.SOME_TEXT)}
      <label>{label}</label>
      <button onClick={handleCheckboxChange}>
        {i18n.t(k.TOGGLE_CHECKBOX)}
      </button>
    </div>);

};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};

export default Checkbox;
