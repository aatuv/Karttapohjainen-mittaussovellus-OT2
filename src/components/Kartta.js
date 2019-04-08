import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Anturit from './Anturit';
import PropTypes from 'prop-types';

class Kartta extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.onLoad = this.onLoad.bind(this);
    }
    state = {
        dimensions: {},
        x: 0,
        y: 0
    }

    // päivitetään anturin paikka kartan päällä
    onDragEnd(e) {
        var k = e.target.parentElement;
        if (k === null) {
            k = document.querySelector('div.kartta');
        }
        const kartta = k.getBoundingClientRect();
        const offsetX = Math.round(e.pageX - kartta.left);
        const offsetY = Math.round(e.pageY - kartta.top);
        if (offsetX < 0 || offsetX > kartta.width || offsetY < 0 || offsetY > kartta.height) { // ei tallenneta koordinaatteja, jos kursori viedään yli kartasta
            return;
        }
        console.log(` x: ${offsetX}, y: ${offsetY} `);
        console.log(e.target.style);
        e.target.style.left = offsetX;
        e.target.style.top = offsetY;
        this.props.setSijainti(offsetX, offsetY, this.props.selectedKarttaId, this.props.anturi.id);
    }
    // ladatessa kuvatiedosto, asetetaan komponentin tilaan sen isäelementin (johon kuva sovittuu) mitat
    onLoad({ target: div }) {
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
                <div onLoad={this.onLoad} className="kartta">
                    <Image ref={this.ref} className="img-kartta" src={this.props.selectedKartta.value} fluid />
                    <Anturit
                        anturit={this.props.anturit}
                        dimensions={this.state.dimensions}
                        selectedAnturi={this.props.selectedAnturi}
                        anturiSijainnit={this.props.anturiSijainnit}
                        onDragEnd={this.onDragEnd}
                        selectedKarttaId={this.props.selectedKartta.id}
                        setSijainti={this.props.setSijainti}
                    />
                </div>
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
    selectedAnturi: PropTypes.object,
    anturiSijainnit: PropTypes.array.isRequired,
    setSijainti: PropTypes.func.isRequired
}


export default Kartta;
