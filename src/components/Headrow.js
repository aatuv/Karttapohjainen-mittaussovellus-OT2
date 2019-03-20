import React, { Component } from 'react'

export class Headrow extends Component {
    render() {
        return (
            <tr className="header-row">
                <th className="table-header">Aika</th>
                <th className="table-header">Lämpötila</th>
                <th className="table-header">Ilmanpaine</th>
                <th className="table-header">Ilmankosteus</th>
            </tr>
        )
    }
}

export default Headrow
