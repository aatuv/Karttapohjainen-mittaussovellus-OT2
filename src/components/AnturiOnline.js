import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

export class AnturiOnline extends Component {
    render() {
        if (this.props.selectedAnturi !== null && this.props.online === true) {
            return (
                <Alert show={this.props.online} variant={"success"} >
                    <Alert.Heading>{this.props.selectedAnturi.label} {this.props.selectedAnturi.value}</Alert.Heading>
                    <p>Anturi aktiivinen!</p>
                </Alert>
            )
        }
        if (this.props.selectedAnturi !== null && this.props.online === false) {
            return (
                <Alert show={!this.props.online} variant={"danger"} >
                    <Alert.Heading>{this.props.selectedAnturi.label} {this.props.selectedAnturi.value}</Alert.Heading>
                    <p>Anturi ei ole päällä!</p>
                </Alert>
            )
        } else {
            return null;
        }
    }
}

AnturiOnline.propTypes = {
    online: PropTypes.bool,
    selectedAnturi: PropTypes.object
}
export default AnturiOnline;
