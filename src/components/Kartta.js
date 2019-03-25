import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

export class Kartta extends Component {

    state = {
        loading: true
    }
    /*
    handleLoading() {
        new Promise(resolve => {
                resolve(this.setState({
                    loading: true
                }))
        }).then(() => {
            setTimeout(() => {
                this.setState({
                    loading: false
                })
            }, 1000);
        })
    }
    */
   componentDidMount() {
       this.setState({ loading: false })
   }
    render() {
        if (this.props.kartta != null) {
            return (
                this.state.loading ? <Spinner animation="border"></Spinner>
                : <div className="kartta">
                    <Image src={this.props.kartta.value} fluid />
                </div>
            )
        } else {
            return null;
        }
    }
}

//PropTypes
Kartta.propTypes = {
    kartta: PropTypes.object
}


export default Kartta;
