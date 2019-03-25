import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ASyncSelect from 'react-select/lib/Async';
import ASyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import KartanLisays from './KartanLisays';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';



// luodaan alasvetovalikkoon uusi kartta
const createOption = (label) => ({
    label,
    value: null
});

class Valintalaatikko extends Component {

    constructor(props) {
        super(props)

        this.newKartta = null;
        this.modalCloseHandler = this.modalCloseHandler.bind(this);
        this.handleShowError = this.handleShowError.bind(this);

    }
    state = {
        isLoading: false,
        value: null,
        modalOpen: false,
        showSuccess: false,
        showError: false,
        errorMsg: null,
        maxKarttaInputLenght: 30
    };

    modalCloseHandler() {
        this.setState({
            isLoading: false,
            modalOpen: false
        })
    }
    handleShowSuccess = () => {
        new Promise(resolve => {
            setTimeout(
                resolve(this.setState({
                    showSuccess: true
                }), 1000))
        }).then(() => {
            setTimeout(() => {
                this.setState({
                    showSuccess: false
                })
            }, 1000);
        })
    }
    handleShowError = (message) => {
        console.log("message: " + message)
        new Promise(resolve => {
            setTimeout(
                resolve(this.setState({
                    showError: true,
                    errorMsg: message
                }), 1000))
        }).then(() => {
            setTimeout(() => {
                this.setState({
                    showError: false
                })
            }, 1000);
        })
    }

    handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        console.table(this.props.kartat);
        this.setState({ value: newValue });
        this.props.setSelected(newValue);
    };

    handleCreate = (inputValue) => {
        this.setState({ isLoading: true, modalOpen: true });
        this.newKartta = createOption(inputValue);
    };

    karttaOptions = (inputValue) => {
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

    setNewKartta = (newKartta) => {
        this.newKartta = newKartta;
    }


    render() {
        let LisaysModal;

        if (this.state.modalOpen) {
            LisaysModal =
                <KartanLisays
                    kartat={this.props.kartat}
                    addKartta={this.props.addKartta}
                    newKartta={this.newKartta}
                    setNewKartta={this.setNewKartta}
                    modalOpen={this.state.modalOpen}
                    handleShowSuccess={this.handleShowSuccess}
                    handleShowError={this.handleShowError}
                    action={this.modalCloseHandler}
                />
        } else {
            LisaysModal = null;
        }
        return (
            <div>
                <Modal show={this.state.showSuccess}>
                    <Modal.Body>
                        <Alert variant="success">
                            <p>Kartan lisäys onnistui!</p>
                        </Alert>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showError}>
                    <Modal.Body>
                        <Alert variant="danger">
                            {this.state.errorMsg}
                        </Alert>
                    </Modal.Body>
                </Modal>
                <div className="row">
                    <div className="col-md-5">Etsi, lisää, selaa ja valitse karttoja:</div>
                    <div className="col-md-5">Etsi, selaa ja valitse antureita:</div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <ASyncCreatableSelect
                            key={JSON.stringify(this.state.value)}
                            placeholder="Etsi/lisää karttoja..."
                            isClearable
                            formatCreateLabel={userInput => `Lisää uusi kartta nimellä '${userInput}'...`}
                            defaultOptions={this.props.kartat}
                            isDisabled={this.state.isLoading}
                            onInputChange={inputValue => (
                                inputValue.length <= this.state.maxKarttaInputLenght ? inputValue : inputValue.substr(0, this.state.maxKarttaInputLenght))
                            }
                            loadOptions={this.promiseOptions}
                            isLoading={this.state.isLoading}
                            onChange={this.handleChange}
                            onCreateOption={this.handleCreate}
                            value={this.state.value}
                        />
                    </div>
                    <div className="col-md-5">
                        <ASyncSelect
                            placeholder="Selaa antureita"
                            cacheOptions
                            isSearchable={false}
                            defaultOptions
                            loadOptions={this.promiseOptions}
                        />
                    </div>
                </div>
                <div>
                    {LisaysModal}
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