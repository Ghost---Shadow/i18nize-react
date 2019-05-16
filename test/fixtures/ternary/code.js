import React from 'react';

const p = '   potato  ';
const isPotato = '  isPotato   ';

const SomeComponent = () => (
  <div>{isPotato ? p : '   Tomato   '}</div>
);

export default SomeComponent;
