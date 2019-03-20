import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ASyncCreatableSelect from 'react-select/lib/AsyncCreatable';

export class Valintalaatikko extends Component {

    handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        this.props.addKartta(newValue);
        console.table(this.props.kartat);
    };

    karttaOptions = inputValue => {

        return this.props.kartat.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(this.karttaOptions(inputValue));
            }, 1000);
        });

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <ASyncCreatableSelect
                        placeholder="Valitse kartta"
                        loadOptions={this.promiseOptions}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <Select
                        options={this.props.anturit}
                        placeholder="Anturit"
                    />
                </div>
            </div>
        )
    }
}

Valintalaatikko.propTypes = {
    kartat: PropTypes.array.isRequired,
    anturit: PropTypes.array.isRequired,
    addKartta: PropTypes.func.isRequired
}

export default Valintalaatikko