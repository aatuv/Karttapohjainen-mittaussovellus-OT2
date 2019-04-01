import React, { Component } from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';


class Anturi extends Component {
    /*
updateLocation(e) {
    console.log(e.target);
    let bounds = e.target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    console.log({x, y});
}
*/
    state = {
        active: false
    }

    // metodi käsittelee anturielementin paikan muutokset kartan päällä

    anturiStyle = () => {
        return {
            backgroundColor: this.state.active ? '#12882c' : '#0a4d19', 
            left: this.props.anturiSijainti.x !== null ? `'${this.props.anturiSijainti.x}'` : '0',
             top: this.props.anturiSijainti.y !== null ? `'${this.props.anturiSijainti.y}'` : '0'
        }
    }

    render() {
        const config = {
            draggable: true,
            pressable: true,
            init: { scale: 1 },
            press: { scale: 0.7 },
            dragBounds: {
                top: Math.round(-this.props.dimensions.height / 2), left: Math.round(-this.props.dimensions.width / 2),
                right: Math.round(this.props.dimensions.width / 2), bottom: Math.round(this.props.dimensions.height / 2)
            }
        }
        const AnturiComponent = posed.div(config);
        return (
            <AnturiComponent 
            id={this.props.anturi.id} 
            onDragEnd={this.props.onDragEnd.bind(this)} 
            style={this.anturiStyle} 
            onLoad={this.getAnturiStyle} className="anturiComponent" 
            />      
            )
    }
}

//PropTypes
Anturi.propTypes = {
    anturi: PropTypes.object.isRequired,
    selectedAnturi: PropTypes.object,
    dimensions: PropTypes.object,
    onDragEnd: PropTypes.func.isRequired,
    anturiSijainti: PropTypes.object
}
export default Anturi;
