import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import posed from 'react-pose';
import PropTypes from 'prop-types';

export class Kartta extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
    }
    state = {
        dimensions: {}
    }
    updateLocation(e) {
        console.log(e.target);
        let bounds = e.target.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;
        console.log({x, y});
    }
        
    onLoad({target:div}) {
        this.setState({
            dimensions: {
            height: div.offsetHeight,
            width: div.offsetWidth
            }
        })
    }
    
    render() {
        const Circle = posed.div({
            draggable: true,
            pressable: true,
            init: { scale: 1 },
            press: { scale: 0.7 },
            dragBounds: { top: Math.round(-this.state.dimensions.height/2 + 15), left: Math.round(-this.state.dimensions.width/2 + 15), right: Math.round(this.state.dimensions.width/2 - 15), bottom: Math.round(this.state.dimensions.height/2 - 15) }
        })
        if (this.props.kartta != null) {
            return (
                <div onLoad={this.onLoad} className="kartta">
                    <Image className="img-kartta" src={this.props.kartta.value} fluid />
                    <Circle onValueChange={{x: (e) => this.updateLocation(e)}} className="circle" />
                </div>
            )
        } else {
            return null;
        }
    }
}

//PropTypes
Kartta.propTypes = {
    kartta: PropTypes.object
}


export default Kartta;
