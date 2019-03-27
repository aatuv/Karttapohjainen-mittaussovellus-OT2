import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Anturit from './Anturit';
import PropTypes from 'prop-types';

class Kartta extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
    }
    state = {
        dimensions: {}
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
        if (this.props.kartta != null) {
            return (
                <div onLoad={this.onLoad} className="kartta">
                    <Image className="img-kartta" src={this.props.kartta.value} fluid />
                    <Anturit anturit={this.props.anturit} dimensions={this.state.dimensions}/>
                </div>
            )
        } else {
            return null;
        }
    }
}

//PropTypes
Kartta.propTypes = {
    kartta: PropTypes.object,
    anturit: PropTypes.array.isRequired
}


export default Kartta;
