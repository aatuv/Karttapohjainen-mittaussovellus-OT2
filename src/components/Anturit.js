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
          if (anturi.id === anturiSijainti.anturi_id) {
            return anturiSijainti
          } 
          return null;
        })} 
      setSijainti={this.props.setSijainti}
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
  selectedAnturiId: PropTypes.number,
  setSijainti: PropTypes.func
}

export default Anturit;