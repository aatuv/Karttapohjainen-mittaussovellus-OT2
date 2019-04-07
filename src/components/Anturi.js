import React, { Component } from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';


class Anturi extends Component {

    // metodi käsittelee anturielementin paikan muutokset kartan päällä

    /*anturiStyle = () => {
        return {
            backgroundColor: this.state.active ? "#12882c" : "#0a4d19", 
            left: (this.props.anturiSijainti.x !== undefined) ? this.props.anturiSijainti.x : '0',
             top: (this.props.anturiSijainti.y !== undefined) ? this.props.anturiSijainti.y : '0'
        }
    }*/
    anturiStyle = () => {
        let onkoSijainti = false;
        let onkoValittu = false;
        if (this.props.anturiSijainti !== undefined) {
            onkoSijainti = true;
        }
        if (this.props.selectedAnturi !== null) {
             if (this.props.selectedAnturi.id === this.props.anturi.id) {
            onkoValittu = true;
             }
        }
        return {
            backgroundColor: onkoValittu ? "#0e5f20" : "#1ac940", 
            left: onkoSijainti ? `${this.props.anturiSijainti.x}px` : '0px',
             top: onkoSijainti ? `${this.props.anturiSijainti.y}px` : '0px',
             transform: 'translateX(0px) translateY(0px)'
        }
    }

    render() {
        const config = {
            draggable: true,
            pressable: true,
            init: { scale: 1 },
            press: { scale: 0.7 },
            dragBounds: {
                // top: Math.round(-this.props.dimensions.height / 2), left: Math.round(-this.props.dimensions.width / 2),
                // right: Math.round(this.props.dimensions.width / 2), bottom: Math.round(this.props.dimensions.height / 2)
            },
            transition: {
                x: 0,
                y: 0
            }
        }
        const AnturiComponent = posed.div(config);
        return (
            <AnturiComponent 
            flipMove={false}
            id={this.props.anturi.id} 
            onDragEnd={this.props.onDragEnd.bind(this)} 
            style={this.anturiStyle()} 
            className="anturiComponent" 
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
    anturiSijainti: PropTypes.object,
    setSijainti: PropTypes.func.isRequired
}
export default Anturi;
