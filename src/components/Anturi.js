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
onDrag = () => {
    console.log("päivitetty");
    return;
}
  render() {
    const config = {
        draggable: true,
        pressable: true,
        init: { scale: 1 },
        press: { scale: 0.7 },
        dragBounds: { 
            top: Math.round(-this.props.dimensions.height/2), left: Math.round(-this.props.dimensions.width/2), 
            right: Math.round(this.props.dimensions.width/2), bottom: Math.round(this.props.dimensions.height/2) 
        },
        onChange: {
            x: (x) => console.log(x),
            y: (y) => console.log(y)
        }
    }
    const AnturiComponent = posed.div(config);
    return (
        <AnturiComponent className="anturiComponent" />
    )
  }
}

//PropTypes
Anturi.propTypes = {
    anturi: PropTypes.object.isRequired
  }
export default Anturi;
