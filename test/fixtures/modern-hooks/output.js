import i18n from 'i18next';import k from '~/i18n/keys';import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api';

const App = ({ greeting = 'Hello visitor' }) => {
  const [stuff, setStuff] = useState('src/App.js');
  const [status, setStatus] = useState('Loading data');

  const thisHardcodedString = i18n.t(k.ANOTHER_STRING);

  useEffect(() => {
    const route = '/api/post';
    api.post(route).then(() => {
      setStatus('Data loaded');
    });
  }, []);

  const hardCodedString = i18n.t(k.SOME_STRING);
  let aLetString = null;
  aLetString = i18n.t(k.ASSIGNMENT_EXPRESSION);

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{i18n.t(k.WELCOME_TO_REACT)}</h2>
        <p>{greeting}</p>
        <p>{hardCodedString}</p>
        <p>{thisHardcodedString}</p>
        <p>{`${hardCodedString} ${thisHardcodedString}`}</p>
        <p>{aLetString}</p>
        <p>{status}</p>
      </div>
      <p className="App-intro">
        {i18n.t(k.TO_GET_STARTED_EDIT)}
        {' '}
        <code>{stuff}</code>
        {' '}
        {i18n.t(k.AND_SAVE_TO_RELOAD)}
      </p>
    </div>);

};

export default App;
