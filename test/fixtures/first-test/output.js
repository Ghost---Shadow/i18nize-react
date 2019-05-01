import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stuff: 'src/App.js'
    };
  }

  render() {
    const {
      stuff
    } = this.state;
    return <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{t(k.SOME_TEXT)}</h2>
        </div>
        <p className="App-intro">
          {t(k.SOME_TEXT)}
          {' '}
          <code>{stuff}</code>
          {' '}
          {t(k.SOME_TEXT)}
        </p>
      </div>;
  }

}

export default App;