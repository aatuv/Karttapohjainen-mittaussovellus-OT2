import React, { Component } from 'react';
import Mittausrivi from './Mittausrivi';
import PropTypes from 'prop-types';

export class Mittaukset extends Component {
    render() {
        return this.props.mittaukset.map((mittaus) => (
            <Mittausrivi mittaus={mittaus} />
        ));
    }
}

Mittaukset.propTypes = {
    mittaukset: PropTypes.array.isRequired
}

export default Mittaukset
