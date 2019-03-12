import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Kartta.css';


export class Kartta extends Component {
    getStyle = () => {
        return {
            visibility: this.props.kartta.active ? 'visible' : 'hidden',
            top: this.props.kartta.active ? '0' : '0',
            left: this.props.kartta.active ? '0' : '0'
        }
    }
    render() {
        const { title, content } = this.props.kartta;
        if (this.props.kartta.active) {
        return (
            <div className="kartta" style={this.getStyle()}>
                <h3>{title}</h3>
                {content}
            </div>
        )
        } else {
            return null;
        }
    }
}

//PropTypes
Kartta.propTypes = {
    kartta: PropTypes.object.isRequired
}


export default Kartta;
