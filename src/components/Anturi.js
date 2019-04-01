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

    getAnturiStyle = () => {
        if (this.props.anturi.id === this.props.selectedAnturi.id) {
            this.setState({
                active: true
            })
        } else {
            this.setState({
                active: false
            })
        }
    }

    handleClick = (event) => {
        console.log(event.target.id);
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
            <AnturiComponent onDragEnd={this.props.onDragStart.bind(this)} style={{backgroundColor: this.state.active ? "#12882c" : "#0a4d19"}} onLoad={this.getAnturiStyle} className="anturiComponent" />      
            )
    }
}

//PropTypes
Anturi.propTypes = {
    anturi: PropTypes.object.isRequired,
    selectedAnturi: PropTypes.object,
    dimensions: PropTypes.object,
    onDragStart: PropTypes.func.isRequired
}
export default Anturi;
