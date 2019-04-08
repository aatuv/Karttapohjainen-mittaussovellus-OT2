import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Mittausrivi extends Component {
  render() {
    return (
        <tr>
            <td>{this.props.mittaus.TIMESTAMP}</td>
            <td>{this.props.mittaus.TEMPERATURE}</td>
            <td>{this.props.mittaus.ATMOSP_PRESSURE}</td>
            <td>{this.props.mittaus.REL_AIR_HUMIDITY}</td>
        </tr>
    )
  }
}

Mittausrivi.propTypes = {
    mittaus: PropTypes.object.isRequired
}
export default Mittausrivi
