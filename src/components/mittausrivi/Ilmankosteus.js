import React, { Component } from 'react'

export class Ilmankosteus extends Component {
  render() {
    return (
        <td className="mittaus-td">
        {this.props.mittausrivi.humidity}
        </td> 
      )
  }
}

export default Ilmankosteus