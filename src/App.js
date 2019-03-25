import React, { Component } from 'react';
import Kartta from './components/Kartta';
import Mittaukset from './components/Mittaukset';
import Headrow from './components/Headrow';
import Valintalaatikko from './components/Valintalaatikko';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  state = {
    kartat: [],
    mittaukset: [],
    anturit: [],
    selectedMap: null
  }

  addKartta = (newKartta) => {
    const { kartat } = this.state;
    this.setState({ kartat: [...kartat, newKartta] });
    console.table(this.state.kartat);
 
  }
  setSelected = (inputValue) => {
    this.setState({ selectedMap: inputValue });
  }
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Mittarointi</h1>
        </header>
        <div className="container">
          <div className="main-content-kartta">
            <Valintalaatikko kartat={this.state.kartat} setSelected={this.setSelected} anturit={this.state.anturit} addKartta={this.addKartta} />
            <Kartta kartta={this.state.selectedMap} />
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
