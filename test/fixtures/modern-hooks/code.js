import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api';

const App = ({ greeting = 'Hello visitor' }) => {
  const [stuff, setStuff] = useState('src/App.js');
  const [status, setStatus] = useState('Loading data');

  const thisHardcodedString = 'Another string';

  useEffect(() => {
    const route = '/api/post';
    api.post(route).then(() => {
      setStatus('Data loaded');
    });
  }, []);

  const hardCodedString = 'Some string';
  let aLetString = null;
  aLetString = 'Assignment Expression';

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
        <p>{greeting}</p>
        <p>{hardCodedString}</p>
        <p>{thisHardcodedString}</p>
        <p>{`${hardCodedString} ${thisHardcodedString}`}</p>
        <p>{aLetString}</p>
        <p>{status}</p>
      </div>
      <p className="App-intro">
        To get started, edit
        {' '}
        <code>{stuff}</code>
        {' '}
        and save to reload.
      </p>
    </div>
  );
};

export default App;
