import React, { Component } from 'react';
import Kartat from './components/Kartat';
import Mittaukset from './components/Mittaukset';
import Headrow from './components/Headrow';
import Valintalaatikko from './components/Valintalaatikko';
import './App.css';
import { ReactComponent as Kerros1 } from './pohjapiirros.svg';
import { ReactComponent as Kerros2 } from './pohjapiirros2.svg';
class App extends Component {
  state = {
    kartat: [
      {
        id: 1,
        title: "Kerros 1",
        content: <Kerros1 />,
        active: true
      },
      {
        id: 2,
        title: "Kerros 2",
        content: <Kerros2 />,
        active: false
      }
    ],
    painikkeet: [
      {
        id: 1,
        disable: true
      },
      {
        id: 2,
        disable: false
      }
    ],
    mittaukset: [
      {
        id: 1,
        timestamp: new Date().toISOString(),
        temperature: 21.40,
        airpressure: 989.12,
        humidity: 0.321
      },
      {
        id: 2,
        timestamp: new Date().toISOString(),
        temperature: 21.05,
        airpressure: 991.98,
        humidity: 0.443
      },
      {
        id: 3,
        timestamp: new Date().toISOString(),
        temperature: 22.12,
        airpressure: 994.52,
        humidity: 0.311
      }
    ]
  }


  setActive = () => {
    this.setState({
      kartat: this.state.kartat.map(kartta => {
        kartta.active = !kartta.active;
        return kartta;
      })
    });
  }
  setDisabled = () => {
    this.setState({
      painikkeet: this.state.painikkeet.map(painike => {
        painike.disable = !painike.disable;
        return painike;
      })
    });
  }
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Mittarointi</h1>
        </header>
        <div className="container">
          <div className="main-content-kartta">
            <Valintalaatikko painikkeet={this.state.painikkeet} setDisabled={this.setDisabled} setActive={this.setActive} />
            <Kartat kartat={this.state.kartat} setActive={this.setActive} />
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
