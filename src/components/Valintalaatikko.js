import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ASyncSelect from 'react-select/lib/Async';
import ASyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import KartanLisays from './KartanLisays';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';



// luodaan alasvetovalikkoon uusi pohja
const createOption = (label) => ({
    label: label,
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
        kartta: null,
        anturi: null,
        modalOpen: false,
        showSuccess: false,
        showError: false,
        errorMsg: null,
        maxInputLenght: 30
    };

    // kartan lisäysikkunan sulkeminen
    modalCloseHandler() {
        this.setState({
            isLoading: false,
            modalOpen: false
        })
    }
    // näytetään ilmoitus, kun kartan lisäys onnistuu
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
    // näytetään virheilmoitus, jos kartan lisäys epäonnistuu
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

    // käsitellään kartan valinnan muutokset alasvetovalikossa
    handleKChange = (newValue) => {
        this.setState({ kartta: newValue });
        this.props.setSelected(newValue);
    };

    // käsitellään anturin valinnan muutokset alasvetovalikossa
    handleAChange = (newValue) => {
        this.setState({ anturi: newValue });
    };

    // uuden kartan luonnin käsittely
    handleCreate = (inputValue) => {
        this.setState({ isLoading: true, modalOpen: true });
        this.newKartta = createOption(inputValue);
    };

    // palauttaa karttavaihtoehdot hakusyötteen mukaan
    karttaOptions = (inputValue) => {
        return this.props.kartat.filter(kartta =>
            kartta.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    // palauttaa anturivaihtoehdot hakusyötteen mukaan
    anturiOptions = (inputValue) => {
        return this.props.anturit.filter(anturi =>
            anturi.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    // karttavaihtoehdot
    promiseKartat = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(this.karttaOptions(inputValue));
            }, 1000);
        });

    // anturivaihtoehdot
    promiseAnturit = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(this.anturiOptions(inputValue));
            }, 1000);
        });

        // asetetaan uusi kartta
    setNewKartta = (newKartta) => {
        this.newKartta = newKartta;
    }


    render() {
        // kartan lisäysikkuna näytetään vain, jos käyttäjä painaa lisäysnappia alasvetovalikossa
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
                <div className="row valinnat">
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
                            loadOptions={this.promiseKartat}
                            isLoading={this.state.isLoading}
                            onChange={this.handleKChange}
                            onCreateOption={this.handleCreate}
                            value={this.state.kartta}
                        />
                    </div>
                    <div className="col-md-5">
                        <ASyncSelect
                            placeholder="Selaa antureita"
                            cacheOptions
                            defaultOptions
                            loadOptions={this.promiseAnturit}
                            onChange={this.handleAChange}
                            value={this.state.anturi}
                            onInputChange={inputValue => (
                                inputValue.length <= this.state.maxInputLenght ? inputValue : inputValue.substr(0, this.state.maxInputLenght))
                            }
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

//PropTypes
Valintalaatikko.propTypes = {
    kartat: PropTypes.array.isRequired,
    anturit: PropTypes.array.isRequired,
    addKartta: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired
}

export default Valintalaatikko