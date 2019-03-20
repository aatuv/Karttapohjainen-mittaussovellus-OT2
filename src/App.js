import React, { Component } from 'react';
import Kartat from './components/Kartat';
import Mittaukset from './components/Mittaukset';
import Headrow from './components/Headrow';
import Valintalaatikko from './components/Valintalaatikko';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  state = {
    kartat: [
      {
        value: "public/kartta1.png",
        label: "eka kerros"
      },
      {
        value: "public/kartta2.png",
        label: "toinen kerros"
      },
      {
        value: "public/kartta3.png",
        label: "kolmas kerros"
      },
      {
        value: "public/kartta4.png",
        label: "neljäs kerros"
      }
    ],
    mittaukset: [],
    anturit: [
      {
        value: "public/kartta1.png",
        label: "eka kerros"
      },
      {
        value: "public/kartta2.png",
        label: "toinen kerros"
      },
      {
        value: "public/kartta3.png",
        label: "kolmas kerros"
      },
      {
        value: "public/kartta4.png",
        label: "neljäs kerros"
      }
    ]
  }

  addKartta = (newValue) => {
    this.state.kartat.push(
      {
        value: newValue.value,
        label: newValue.label
      }
    );
  }
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Mittarointi</h1>
        </header>
        <div className="container">
          <div className="main-content-kartta">
            <Valintalaatikko kartat={this.state.kartat} anturit={this.state.anturit} addKartta={this.addKartta} />
            <Kartat kartat={this.state.kartat} />
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
