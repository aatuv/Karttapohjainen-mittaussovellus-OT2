import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Aikaleima extends Component {
  render() {
    return (
        <td className="mittaus-td">
        {this.props.mittausrivi.timestamp}
        </td> 
      )
  }
}

Aikaleima.propTypes = {
    aikaleima: PropTypes.number.isRequired
}
export default Aikaleima