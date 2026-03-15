import i18n from 'i18next';
import k from '~/i18n/keys';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api';

const App = () => {
  const [stuff] = useState(i18n.t(k.SRC_APP_JS));

  const thisHardcodedString = 'Another string';

  useEffect(() => {
    const route = '/api/post';
    api.post(route);
  }, []);

  const hardCodedString = i18n.t(k.SOME_STRING);

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{i18n.t(k.WELCOME_TO_REACT)}</h2>
        <p>{hardCodedString}</p>
        <p>{thisHardcodedString}</p>
        <p>{`${hardCodedString} ${thisHardcodedString}`}</p>
      </div>
      <p className="App-intro">
        {i18n.t(k.TO_GET_STARTED_EDIT)}
        {' '}
        <code>{stuff}</code>
        {' '}
        and save to reload.
      </p>
    </div>
  );
};

export default App;
