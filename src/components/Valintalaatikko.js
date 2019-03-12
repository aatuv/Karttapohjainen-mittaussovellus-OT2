import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Valintalaatikko extends Component {

    render() {
        return (
            <div className="selite-div">
                <button id="kerros1" className="kerros-btn" disabled={this.props.painikkeet[0].disable} onClick={(event) => { this.props.setActive(); this.props.setDisabled() }}>1. kerros</button>
                <button id="kerros2" className="kerros-btn" disabled={this.props.painikkeet[1].disable} onClick={(event) => { this.props.setActive(); this.props.setDisabled() }}>2. kerros</button>
                <div className="ul-div">
                    <ul className="selite-ul">
                        <li className="valk">= Tilassa ei anturia</li>
                        <li className="kelt">= Virhe yhdistäessä anturiin!</li>
                        <li className="vihr">= Anturi aktiivinen</li>
                        <li className="tumv">= Valittu anturi</li>
                    </ul>
                </div>
            </div>
        )
    }
}

Valintalaatikko.propTypes = {
    painikkeet: PropTypes.array.isRequired,
    setActive: PropTypes.func.isRequired,
    setDisabled: PropTypes.func.isRequired
}

export default Valintalaatikko