import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aikaleima from './mittausrivi/Aikaleima';
import Lampotila from './mittausrivi/Lampotila';
import Ilmanpaine from './mittausrivi/Ilmanpaine';
import Ilmankosteus from './mittausrivi/Ilmankosteus';
export class Mittausrivi extends Component {

  render() {
    return (
      <tr className="mittausrivi">
        <Aikaleima mittausrivi={this.props.mittausrivi} />
        <Lampotila mittausrivi={this.props.mittausrivi} />
        <Ilmanpaine mittausrivi={this.props.mittausrivi} />
        <Ilmankosteus mittausrivi={this.props.mittausrivi} />
      </tr>
    )
  }
}

//PropTypes
Mittausrivi.propTypes = {
  mittausrivi: PropTypes.object.isRequired
}
export default Mittausrivi;
