import React, { Component } from 'react';
import Kartta from './components/Kartta';
import Valintalaatikko from './components/Valintalaatikko';
import Mittaukset from './components/Mittaukset';
import Graafit from './components/Graafit';
import Table from 'react-bootstrap/Table';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
class App extends Component {
  state = {
    kartat: [],
    mittaukset: [],
    anturit: [],
    anturiSijainnit: [],
    selectedKartta: null,
    selectedAnturi: null
  }

  // haetaan kartat, kun pääkomponentti kiinnittyy
  componentDidMount() {
    this.getKartat();
    this.getAnturit();
    this.getAnturiSijainnit();
    this.getMittaukset();
  }

  // componentWillMount() {
  //   setInterval(this.getMittaukset.bind(this), 10000);
  // }

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
  getMittaukset() {
    Axios.get('http://localhost:3001/measurements')
      .then(res => this.setState({
        mittaukset: res.data
      }));
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
    this.setState({ selectedAnturi: inputValue });
  }
  // sijainti anturille: jos sijainti kys. kartalle on jo, muokataan olemassa olevan rivin koordinaatteja
  // muutoin lisätään uusi rivi
  setSijainti = (x, y, kartta_id, anturi_id) => {
    Axios.get(`http://localhost:3001/findlocation?kartta_id=${kartta_id}&anturi_id=${anturi_id}`)
      .then(res => {
        console.log(res);
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

  returnSelectedAnturi() {
    if (this.state.selectedAnturi === null) {
      return "";
    } else {
      return this.state.selectedAnturi.value
    }
  }

  returnLampotilaData() {
    var data = [];
    if (this.state.selectedAnturi !== null) {
      data = this.state.mittaukset.filter(mittaus => mittaus.deviceId === this.state.selectedAnturi.value);
    }
    return data;
  }

  // renderöidään komponentti
  render() {
    let valittuAnturi = this.returnSelectedAnturi();
    return (
      <div className="App">
        <header className="header">
          <h1>Mittarointi</h1>
        </header>
        <div className="container">
          <div className="main-content-kartta">
            <Valintalaatikko
              kartat={this.state.kartat}
              anturit={this.state.anturit}
              setSelectedKartta={this.setSelectedKartta}
              setSelectedAnturi={this.setSelectedAnturi}
              addKartta={this.addKartta}
            />
            <Kartta
              selectedKartta={this.state.selectedKartta}
              anturit={this.state.anturit}
              selectedAnturi={this.state.selectedAnturi}
              anturiSijainnit={this.state.anturiSijainnit}
              setSijainti={this.setSijainti}
              setDefaultSijainti={this.setDefaultSijainti}
            />
          </div>
          <div className="main-content-mittaukset">
            <h2>Valittu anturi: {valittuAnturi}</h2>
            <Table striped bordered hover size="sm" style={{ width: '100%', height: '300px', overflowY: 'scroll', display: 'block' }}>
              <thead>
                <tr>
                  <th className="mittaus-thead">Aika</th>
                  <th className="mittaus-thead">Lämpötila</th>
                  <th className="mittaus-thead">Ilmanpaine</th>
                  <th className="mittaus-thead">Ilmankosteus</th>
                </tr>
              </thead>
              <tbody>
                <Mittaukset selectedAnturi={this.state.selectedAnturi} mittaukset={this.state.mittaukset} />
              </tbody>
            </Table>
          </div>
          <div className="main-content-charts">
            <Graafit mittaukset={this.returnLampotilaData()} />
          </div>
        </div>
        <footer className="footer">
          <h3>footer</h3>
        </footer>
      </div>
    );
  }
}

export default App;
