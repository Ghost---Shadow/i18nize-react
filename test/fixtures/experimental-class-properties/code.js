import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={classes}>
        Some text
      </div>
    );
  }
}

export default Checkbox;
