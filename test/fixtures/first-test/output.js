import i18n from 'i18next';
import k from '~/i18n/keys';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stuff: i18n.t(k.SOME_TEXT)
    };
    this.thisHardcodedString = 'Another string';
  }

  componentDidMount() {
    const route = '/api/post';
    api.post(route);
  }

  render() {
    const {
      stuff
    } = this.state;
    const hardCodedString = i18n.t(k.SOME_TEXT);
    return <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{i18n.t(k.SOME_STRING)}</h2>
          <p>{hardCodedString}</p>
          <p>{this.thisHardcodedString}</p>
          <p>{`${hardCodedString} ${this.thisHardcodedString}`}</p>
        </div>
        <p className="App-intro">
          {i18n.t(k.SOME_STRING)}
          {' '}
          <code>{stuff}</code>
          {' '}
          {i18n.t(k.SOME_STRING)}
        </p>
      </div>;
  }

}

export default App;
