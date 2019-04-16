import React, { Component } from 'react';
import Kartta from './components/Kartta';
import Valintalaatikko from './components/Valintalaatikko';
import Graafit from './components/Graafit';
import Mittaustaulu from './components/Mittaustaulu';
import AnturiOnline from './components/AnturiOnline';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';

class App extends Component {

  state = {
    kartat: [],
    mittaukset: [],
    anturit: [],
    anturiSijainnit: [],
    selectedKartta: null,
    selectedAnturi: null,
    anturiOnline: false,
    deleteSuccess: false
  }

  // haetaan kartat, kun pääkomponentti kiinnittyy
  componentDidMount() {
    this.getMittaukset();
    this.getKartat();
    this.getAnturit();
    this.getAnturiSijainnit();
  }

  // aletaan seurata mittausten päivityksiä tietokannassa
  componentWillMount() {
    setInterval(this.getMittaukset.bind(this), 5000);
  }

  // palauttaa listan tietokannassa olevista kartoista
  getKartat() {
    Axios.get('http://localhost:3001/maps')
      .then(res => this.setState({
        kartat: this.returnKartat(res.data)
      }));
  }

  // palauttaa listan tietokannassa olevista antureista
  getAnturit() {
    Axios.get('http://localhost:3001/sensors')
      .then(res => this.setState({
        anturit: this.returnAnturit(res.data)
      }));
  }

  // palauttaa listan tietokannassa olevista anturien sijainneista
  getAnturiSijainnit() {
    Axios.get('http://localhost:3001/locations')
      .then(res => this.setState({
        anturiSijainnit: this.returnAnturiSijainnit(res.data)
      }));
  }

  // haetaan mittaukset tietokannasta
  getMittaukset() {
    if (this.state.selectedAnturi !== null) {
      Axios.get(`http://localhost:3001/measurement?deviceId=${this.state.selectedAnturi.value}`)
        .then(res => this.setState({
          mittaukset: res.data
        }));

      if (typeof this.state.mittaukset[this.state.mittaukset.length - 1] !== 'undefined') {
        if (this.state.mittaukset[this.state.mittaukset.length - 1].pressure !== 0) {
          this.setState({
            anturiOnline: true
          })
        } else {
          this.setState({
            anturiOnline: false
          })
        }
      }
    }
  }

  // tietokannasta haettu karttalista muotoon, jossa projektissa käytettävä kirjasto react-select pystyy käsittelemään sitä
  returnKartat = (kartat) => {
    let tmp = [];
    kartat.map((kartta) => {
      tmp.push({
        id: kartta.ID,
        label: kartta.NAME,
        value: kartta.PATH
      })
      return 0;
    })
    return tmp;
  }

  // tietokannasta haettu karttalista muotoon, jossa projektissa käytettävä kirjasto react-select pystyy käsittelemään sitä
  returnAnturit = (anturit) => {
    let tmp = [];
    anturit.map((anturi) => {
      tmp.push({
        id: anturi.ID,
        label: anturi.NAME,
        value: anturi.DESCRIPTION,
        selected: false
      })
      return 0;
    })
    return tmp;
  }

  // anturiSijainnit stateen
  returnAnturiSijainnit = (sijainnit) => {
    let tmp = [];
    sijainnit.map((sijainti) => {
      tmp.push({
        kartta_id: sijainti.KARTTA_ID,
        anturi_id: sijainti.ANTURI_ID,
        x: sijainti.X,
        y: sijainti.Y,
      })
      return 0;
    })
    return tmp;
  }

  // lisätään kartan tiedot (nimi, osoite) tietokantaan
  addKartta = (newKartta) => {
    Axios.post('http://localhost:3001/maps', newKartta)
      .then(res => {
        this.getKartat();
      });
  }
  // asetetaan valittu kartta
  setSelectedKartta = (inputValue) => {
    this.setState({ selectedKartta: inputValue });
  }
  // asetetaan valittu anturi
  setSelectedAnturi = (inputValue) => {
    if (this.state.selectedAnturi !== null && this.state.selectedAnturi.id !== inputValue.id) {
      this.setState({ selectedAnturi: inputValue });
    }
    if (this.state.selectedAnturi === null) {
      this.setState({ selectedAnturi: inputValue });
    }
  }
  // sijainti anturille: jos sijainti kys. kartalle on jo, muokataan olemassa olevan rivin koordinaatteja
  // muutoin lisätään uusi rivi
  setSijainti = (x, y, kartta_id, anturi_id) => {
    Axios.get(`http://localhost:3001/findlocation?kartta_id=${kartta_id}&anturi_id=${anturi_id}`)
      .then(res => {
        if (res.data.result === true) {
          Axios.post('http://localhost:3001/updatelocation', { kartta_id: kartta_id, anturi_id: anturi_id, x: x, y: y })
            .then(res => {
              this.getAnturiSijainnit();
              return;
            });
        } else {
          Axios.post('http://localhost:3001/locations', { kartta_id: kartta_id, anturi_id: anturi_id, x: x, y: y })
            .then(res => {
              this.getAnturiSijainnit();
              return;
            });
        }
      });
  }
  // oletussijainti antureille: tarvitaan määrittäessä dragBounds-ehdot Anturi.js:ssä
  setDefaultSijainti = (kartta_id, anturi_id) => {
    this.setState({
      anturiSijainnit: this.state.anturiSijainnit.push({
        kartta_id: kartta_id,
        anturi_id: anturi_id,
        x: 0,
        y: 0
      })
    })
    return;
  }

  // palauttaa listan valitun anturin mittausten lämpötila-arvoista
  returnLampotilaData() {
    var temps = [];
    let len = this.state.mittaukset.length;
    if (this.state.selectedAnturi !== null) {
      if (len <= 300) {
        this.state.mittaukset.map((mittaus) => {
          temps.push(mittaus.temperature);
        })
      } else {
        this.state.mittaukset.map((mittaus) => {
          temps.push(mittaus.temperature);
        })
        temps.splice(0, len - 300);
      }
    }
    return temps;
  }

  // palauttaa listan valitun anturin mittausten ilmankosteusarvoista
  returnKosteusData() {
    var hums = [];
    let len = this.state.mittaukset.length;
    if (this.state.selectedAnturi !== null) {
      if (len <= 300) {
        this.state.mittaukset.map((mittaus) => {
          hums.push(mittaus.humidity);
        })
      } else {
        this.state.mittaukset.map((mittaus) => {
          hums.push(mittaus.humidity);
        })
        hums.splice(0, len - 300);
      }
    }
    return hums;
  }

  // palauttaa listan valitun anturin mittausten ilmanpainearvoista
  returnPaineData() {
    var pres = [];
    let len = this.state.mittaukset.length;
    if (this.state.selectedAnturi !== null) {
      if (len <= 300) {
        this.state.mittaukset.map((mittaus) => {
          pres.push(mittaus.pressure);
        })
      } else {
        this.state.mittaukset.map((mittaus) => {
          pres.push(mittaus.pressure);
        })
        pres.splice(0, len - 300);
      }
    }
    return pres;
  }

  // palauttaa listan valitun anturin mittausten aikaleimoista
  returnTimeData() {
    var tims = [];
    let len = this.state.mittaukset.length;
    if (this.state.selectedAnturi !== null) {
      if (len <= 300) {
        this.state.mittaukset.map((mittaus) => {
          tims.push(mittaus.Time);
        })
      } else {
        this.state.mittaukset.map((mittaus) => {
          tims.push(mittaus.Time);
        })
        tims.splice(0, len - 300);
      }
    }
    return tims;
  }

  // onko kartta valittuna
  isKarttaSelected() {
    if (this.state.selectedKartta !== null) {
      return false;
    }
    return true;
  }

  // kartan poisto
  deleteKartta() {
    if (this.state.selectedKartta !== null) {
      Axios.delete('http://localhost:3001/locations', {
        params: {
          id: this.state.selectedKartta.id
        }
      })
        .then(res => {
          Axios.delete('http://localhost:3001/maps', {
            params: {
              id: this.state.selectedKartta.id
            }
          })
            .then(res => {
              console.log(res.data);
              this.setState({
                selectedKartta: null
              })
              this.handleDeleteSuccess();
              this.getKartat();
              return;
            })
          return;
        })
    }
  }

  handleDeleteSuccess = () => {
    new Promise(resolve => {
        setTimeout(
            resolve(this.setState({
                deleteSuccess: true
            }), 1000))
    }).then(() => {
        setTimeout(() => {
            this.setState({
                deleteSuccess: false
            })
        }, 1000);
    })
}

  // renderöidään komponentti
  render() {
    return (
      <div className="App">
        <div>
          <Modal show={this.state.deleteSuccess}>
            <Modal.Body>
              <Alert variant="success">
                <p>Kartta poistettu onnistuneesti!</p>
              </Alert>
            </Modal.Body>
          </Modal>
          <header className="header">
            <h1 className="pageHeadline">Mittaussovellus</h1>
          </header>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="main-content-kartta">
                  <Valintalaatikko
                    kartat={this.state.kartat}
                    anturit={this.state.anturit}
                    setSelectedKartta={this.setSelectedKartta}
                    setSelectedAnturi={this.setSelectedAnturi}
                    addKartta={this.addKartta}
                  />
                  <Button
                    variant="danger"
                    disabled={this.isKarttaSelected()}
                    onClick={this.deleteKartta.bind(this)}
                    style={{ margin: '5px' }}>
                    Poista kartta
                  </Button>
                  <Kartta
                    selectedKartta={this.state.selectedKartta}
                    anturit={this.state.anturit}
                    selectedAnturi={this.state.selectedAnturi}
                    anturiSijainnit={this.state.anturiSijainnit}
                    setSijainti={this.setSijainti}
                    setDefaultSijainti={this.setDefaultSijainti}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="main-content-mittaukset">
                  <AnturiOnline
                    online={this.state.anturiOnline}
                    selectedAnturi={this.state.selectedAnturi}
                    mittaukset={this.state.mittaukset}
                  />
                  <Mittaustaulu
                    mittaukset={this.state.mittaukset}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="graafit">
                  <Graafit
                    getMittaukset={this.getMittaukset}
                    lampotilat={this.returnLampotilaData()}
                    kosteudet={this.returnKosteusData()}
                    paineet={this.returnPaineData()}
                    ajat={this.returnTimeData()}
                  />
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <h4>Karttapohjainen mittaussovellus</h4>
            Ohjelmistotuotanto 2, Ryhmä T
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
