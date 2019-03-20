import React, { Component } from 'react'

export class Lampotila extends Component {
  render() {
    return (
        <td className="mittaus-td">
        {this.props.mittausrivi.temperature}
        </td> 
      )
  }
}

export default Lampotila