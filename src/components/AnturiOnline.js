import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

export class AnturiOnline extends Component {
    render() {

        /*
         * Seuraavissa if-ehdoissa tarkistetaan, onko viimeisimmästä mittauksesta mennyt yli 30 sekuntia (30000ms)
         * Jos on, näytetään yhteysvirheilmoitus
         * Muutoin näytetään anturien tila: aktiivinen tai ei päällä (jos (Ruuvitag) anturit lähettävät dataa, jossa kaikki mittausarvot ovat 0, anturi on silloin kiinni)
         */
        let dateString = "";
        let split1 = [];
        let split2 = [];
        let mit = 0;
        if (typeof this.props.mittaukset[this.props.mittaukset.length - 1] !== 'undefined') {
            // muutetaan aika-string muotoon, jossa Date-objekti tunnistaa sen
            dateString = this.props.mittaukset[this.props.mittaukset.length - 1].Time;
            dateString = dateString.replace(/\./g, '-').replace(/ /, 'T');
            split1 = dateString.split('-');
            split2 = split1[2].split('T');

            // millisekunnit (nykyhetki - 01.01.1970) - (mittausajankohta - 01.01.1970)
            mit = new Date() - new Date(split2[0] + "-" + split1[1] + "-" + split1[0] + "T" + [split2[1]]);
        }
        // erotus alle 30000 ms, odotetaan uutta mittausta. Anturi aktiivinen
        if (this.props.selectedAnturi !== null && this.props.online === true && mit < 30000) {
            return (
                <Alert show={this.props.online} variant={"success"} >
                    <Alert.Heading>{this.props.selectedAnturi.label} {this.props.selectedAnturi.value}</Alert.Heading>
                    <p>Anturi aktiivinen!</p>
                </Alert>
            )
        }
        // erotus alle 30000 ms, odotetaan uutta mittausta. Anturi ei päällä
        if (this.props.selectedAnturi !== null && this.props.online === false && mit < 30000) {
            return (
                <Alert show={!this.props.online} variant={"danger"} >
                    <Alert.Heading>{this.props.selectedAnturi.label} {this.props.selectedAnturi.value}</Alert.Heading>
                    <p>Anturi ei ole päällä!</p>
                </Alert>
            )
        }
        // erotus yli 30000 ms, näytetään virhe
        if (this.props.selectedAnturi !== null && (this.props.online === false || this.props.online === true) && mit > 30000) {
            return (
                <Alert show={true} variant={"danger"} >
                    <Alert.Heading>Yhteysvirhe</Alert.Heading>
                    <p>Ei uusia mittauksia 30 sekuntiin, yhteys katkennut!</p>
                </Alert>
            )
        }
        else return null;
    }
}

AnturiOnline.propTypes = {
    mittaukset: PropTypes.array.isRequired,
    online: PropTypes.bool,
    selectedAnturi: PropTypes.object
}
export default AnturiOnline;
