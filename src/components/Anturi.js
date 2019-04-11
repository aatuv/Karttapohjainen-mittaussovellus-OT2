import React, { Component } from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';


class Anturi extends Component {
    componentDidMount() {
        this.props.setDefaultSijainti(this.props.selectedKarttaId, this.props.anturi.id);
        console.log(this);
    }

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
            left: onkoSijainti ? `${this.props.anturiSijainti.x - 15}px` : '0px',
            top: onkoSijainti ? `${this.props.anturiSijainti.y - 15}px` : '0px',
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
                //top: -this.props.anturiSijainti.y, left: -this.props.anturiSijainti.x,
                //right: this.props.dimensions.width - this.props.anturiSijainti.x, bottom: this.props.dimensions.height - this.props.anturiSijainti.y
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
    selectedKarttaId: PropTypes.number.isRequired,
    dimensions: PropTypes.object,
    onDragEnd: PropTypes.func.isRequired,
    anturiSijainti: PropTypes.object,
    setSijainti: PropTypes.func.isRequired,
    setDefaultSijainti: PropTypes.func.isRequired
}
export default Anturi;
