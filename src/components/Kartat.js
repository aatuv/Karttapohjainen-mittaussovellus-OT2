import React, { Component } from 'react';
import Kartta from './Kartta';
import PropTypes from 'prop-types';

class Kartat extends Component {
  render() {
    return this.props.kartat.map((kartta) => (
      <Kartta key={kartta.id} kartta={kartta} setActive={this.props.setActive} />
  ));
  }
}

//PropTypes
Kartat.propTypes = {
  kartat: PropTypes.array.isRequired
}

export default Kartat;