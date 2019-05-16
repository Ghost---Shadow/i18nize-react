import React from 'react';
import api from './api';

const p = '   potato  ';
const isPotato = '  isPotato   ';

const val = true;
const query = val ? 'dont' : 'replace_these';

const result = api.get(`/posts?q=${query}`);

const SomeComponent = () => (
  <div>
    <div>{isPotato ? p : '   Tomato   '}</div>
    {result}
  </div>
);

export default SomeComponent;
