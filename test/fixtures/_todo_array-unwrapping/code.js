// TODO: Find a way to implement this feature

import React from 'react';

const vegetables = ['potato', 'tomato', 'cabbage'];
const fridge = [
  {
    name: 'potato',
    description: 'large potato',
  },
  {
    name: 'tomato',
    description: 'large tomato',
  },
];

const MyComponent = () => (
  <ul>
    {vegetables.map(vegetable => (
      <li>{vegetable}</li>
    ))}
    {fridge.map(item => (
      <div>
        <div>{item.name}</div>
        <div>{item.description}</div>
      </div>
    ))}
  </ul>
);

export default MyComponent;
