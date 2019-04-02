import React, { Component } from 'react';
import Anturi from './Anturi';
import PropTypes from 'prop-types';


class Anturit extends Component {

  render() {
    return this.props.anturit.map((anturi) => (
      <Anturi 
      key={anturi.id} 
      dimensions={this.props.dimensions} 
      anturi={anturi} 
      selectedAnturi={this.props.selectedAnturi} 
      onDragEnd={this.props.onDragEnd} 
      anturiSijainti={this.props.anturiSijainnit.find((anturiSijainti) => {
      /* anturin sijainti on uniikki kullakin kartalla 
       * (hypoteettinen tilanne, jossa samaa anturia esim. siirrettäisiin kahteen eri paikkaan tms.)
       */
          if (anturi.id === anturiSijainti.anturi_id && this.props.selectedKarttaId === anturiSijainti.kartta_id) {
            return anturiSijainti
          } 
          return null;
        })} 
      selectedKarttaId={this.props.selectedKarttaId}
      />
  ));
  }
}

//PropTypes
Anturit.propTypes = {
  anturit: PropTypes.array.isRequired,
  dimensions: PropTypes.object.isRequired,
  selectedAnturi: PropTypes.object,
  onDragEnd: PropTypes.func.isRequired,
  anturiSijainnit: PropTypes.array.isRequired,
  selectedAnturiId: PropTypes.number
}

export default Anturit;