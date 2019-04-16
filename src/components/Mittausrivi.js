import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Mittausrivi extends Component {
  render() {
    return (
        <tr>
            <td>{this.props.mittaus.Time}</td>
            <td>{this.props.mittaus.temperature}</td>
            <td>{this.props.mittaus.pressure}</td>
            <td>{this.props.mittaus.humidity}%</td>
        </tr>
    )
  }
}

Mittausrivi.propTypes = {
    mittaus: PropTypes.object.isRequired
}
export default Mittausrivi
