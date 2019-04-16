import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import axios from 'axios';


// modal kartan lisäykseen
class KartanLisays extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);


    this.state = {
      show: this.props.modalOpen,
      selectedFile: null,
      imgPreviewURL: '',
      uploadInProgress: false,
      uploadProgress: null
    };
  }

  // käsitellään valittu tiedosto
  fileSelectedHandler(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imgPreviewURL: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  // kuvatiedoston lähettäminen googlen firebase-pilvipalvelimelle
  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.props.newKartta.label);
    this.setState({ uploadInProgress: true });
    axios.post('https://us-central1-mittarointi-sovellus.cloudfunctions.net/onFileUpload', fd, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          uploadProgress: Math.round(ProgressEvent.loaded / ProgressEvent.total * 100)
        });
      }
    })
      .then(res => {
        this.handleClose();
        this.props.handleShowSuccess();
        const newKartta = {
          label: res.data.name,
          value: res.data.path
        }
        this.props.addKartta(newKartta);
      }).catch((error) => {
        let message = error.response.statusText;
        this.setState({
          show: false,
          uploadInProgress: false
        });
          this.props.handleShowError(message);
        this.props.action();
      });
  }


  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({
      show: false,
      uploadInProgress: false
    });
    this.props.action();
  }

  render() {
    const inProgress = this.state.uploadInProgress;
    const imgPreviewURL = this.state.imgPreviewURL;
    let progress;
    let imgPreview = null;
    if (inProgress) {
      progress = <div>Tallennetaan... <ProgressBar animated now={this.state.uploadProgress} /></div>
    } else {
      progress = null;
    }
    if (imgPreviewURL) {
      imgPreview =
        <div className="img-preview-div">
          <Image className="img-preview" src={imgPreviewURL} thumbnail />
        </div>
    }
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Lisää kartta (jpeg/png)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="file" accept="image/*" maxLength="30" onChange={(e) => this.fileSelectedHandler(e)} />
            {progress}
            {imgPreview}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Peruuta
              </Button>
            <Button variant="primary" onClick={this.fileUploadHandler}>
              Tallenna
              </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

// PropTypes
KartanLisays.propTypes = {
  kartat: PropTypes.array.isRequired,
  addKartta: PropTypes.func.isRequired,
  newKartta: PropTypes.object.isRequired,
  setNewKartta: PropTypes.func.isRequired,
  handleShowSuccess: PropTypes.func.isRequired,
  handleShowError: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired
}

export default KartanLisays;
