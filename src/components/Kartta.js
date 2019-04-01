import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Anturit from './Anturit';
import PropTypes from 'prop-types';

class Kartta extends Component {
    constructor(props) {
        super(props);
        this.moveRef = React.createRef();
        this.onLoad = this.onLoad.bind(this);
    }
    state = {
        dimensions: {},
        x: 0,
        y: 0
    }

    onDragStart(e) {
        e.preventDefault();
        let currTarget = e.currentTarget.getBoundingClientRect();
        const offsetX = e.pageX - currTarget.left;
        const offsetY = e.pageY - currTarget.top;
        console.log(currTarget)
        console.log(` x: ${offsetX}, y: ${offsetY} `);
        this.setState({ x: offsetX, y: offsetY });
      }
    // ladatessa kuvatiedosto, asetetaan komponentin tilaan sen isäelementin (johon kuva sovittuu) mitat
    onLoad({target:div}) {
        this.setState({
            dimensions: {
            height: div.offsetHeight,
            width: div.offsetWidth
            }
        })
    }
    // renderöidään komponentti
    render() {
        if (this.props.selectedKartta != null) {
            return (
                <>
                <h1>{this.state.x} : {this.state.y}</h1>
                <div ref="elem" onLoad={this.onLoad} className="kartta">
                    <Image className="img-kartta" src={this.props.selectedKartta.value} fluid />
                    <Anturit anturit={this.props.anturit} dimensions={this.state.dimensions} selectedAnturi={this.props.selectedAnturi} onDragStart={this.onDragStart} />
                </div>
                </>
            )
        } else {
            return null;
        }
    }
}

//PropTypes
Kartta.propTypes = {
    selectedKartta: PropTypes.object,
    anturit: PropTypes.array.isRequired,
    selectedAnturi: PropTypes.object
}


export default Kartta;
