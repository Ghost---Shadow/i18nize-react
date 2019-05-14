import React from 'react';
import AnotherComponent from './Somewhere';

const src = 'https://example.com/some/page'; // TODO: Have a regex to ignore websites and emails

const MyComponent = () => (
  <AnotherComponent src={src} />
);

export default MyComponent;
