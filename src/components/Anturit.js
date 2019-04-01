import React, { Component } from 'react';
import Anturi from './Anturi';
import PropTypes from 'prop-types';

class Anturit extends Component {
  render() {
    return this.props.anturit.map((anturi) => (
      <Anturi key={anturi.id} dimensions={this.props.dimensions} anturi={anturi} selectedAnturi={this.props.selectedAnturi} onDragStart={this.props.onDragStart} />
  ));
  }
}

//PropTypes
Anturit.propTypes = {
  anturit: PropTypes.array.isRequired,
  dimensions: PropTypes.object.isRequired,
  selectedAnturi: PropTypes.object,
  onDragStart: PropTypes.func.isRequired
}

export default Anturit;