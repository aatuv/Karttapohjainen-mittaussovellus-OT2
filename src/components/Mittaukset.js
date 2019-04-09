import React, { Component } from 'react';
import Mittausrivi from './Mittausrivi';
import PropTypes from 'prop-types';

export class Mittaukset extends Component {

    render() {
        if (this.props.selectedAnturi !== null) {
        var jee = this.props.mittaukset.filter(mittaus => mittaus.deviceId.replace(/\s+/g, '') === this.props.selectedAnturi.value);
        return jee.map((mittaus) => (
            <Mittausrivi mittaus={mittaus} />
        ));
        } else {
            return null;
        }
    }
}

Mittaukset.propTypes = {
    mittaukset: PropTypes.array.isRequired,
    selectedAnturi: PropTypes.object
}

export default Mittaukset
