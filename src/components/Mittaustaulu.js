import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Mittaukset from './Mittaukset';
import PropTypes from 'prop-types';

export class Mittaustaulu extends Component {

    constructor(props) {
        super(props)
        this.alariviRef = React.createRef()
    }

    state = {
        amount: 0
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
            if (this.props.mittaukset.length > this.state.amount) {
                this.scrollToBottom();
                this.setState({
                    amount: this.props.mittaukset.length
                })
            }
        
    }

    scrollToBottom = () => {
        this.alariviRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    render() {
        return (
            <Table striped bordered hover size="sm" style={{ textAlign: 'center', width: '100%', height: '500px', overflowY: 'scroll', display: 'inline-block' }}>
                <thead style={{width: '700px'}}>
                    <tr> 
                        <th className="mittaus-thead">Aika</th>
                        <th className="mittaus-thead">Lämpötila</th>
                        <th className="mittaus-thead">Ilmanpaine</th>
                        <th className="mittaus-thead">Ilmankosteus</th>
                    </tr>
                </thead>
                <tbody style={{width: '100%'}}>
                    <Mittaukset className="mittaukset" mittaukset={this.props.mittaukset} />
                    <tr ref={this.alariviRef} />
                </tbody>
            </Table>
        )
    }
}

Mittaustaulu.propTypes = {
    mittaukset: PropTypes.array.isRequired
}
export default Mittaustaulu
