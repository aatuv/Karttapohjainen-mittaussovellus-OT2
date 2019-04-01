import React, { Component } from 'react';
import Kartta from './components/Kartta';
import Mittaukset from './components/Mittaukset';
import Headrow from './components/Headrow';
import Valintalaatikko from './components/Valintalaatikko';
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
        value: anturi.DESCRIPTION
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
        console.log(res.data);
      })
  }
  // asetetaan valittu kartta
  setSelectedKartta = (inputValue) => {
    this.setState({ selectedKartta: inputValue });
  }
  setSelectedAnturi = (inputValue) => {
    this.setState({ selectedAnturi: inputValue });
  }
  setSijainti = (offsetX, offsetY, kartta_id, anturi_id) => {
    const newSijainti = {
      kartta_id: kartta_id,
      anturi_id: anturi_id,
      x: offsetX,
      y: offsetY
    }
    this.setState({
      anturiSijainnit: [...this.state.anturiSijainnit, newSijainti]
    });
  }
  // renderöidään komponentti
  render() {
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
            />
          </div>
          <div className="main-content-mittaukset">
            <table className="mittaus-table">
              <caption>valitun anturin nimi tähän</caption>
              <thead align="center">
                <Headrow />
              </thead>
              <tbody className="mittaus-tbody">
                <Mittaukset mittaukset={this.state.mittaukset} />
              </tbody>
            </table>
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