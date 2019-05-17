import i18n from 'i18next';import k from '~/i18n/keys';import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired };


  render() {
    return (
      <div className={classes}>
        {i18n.t(k.SOME_TEXT)}
      </div>);

  }}


export default Checkbox;
