import React from 'react';
import api from 'somewhere';

const vegetables = ['Orca', 'raddish', 'cabbage', 42];
let fruits = ['apple', 'banana'];
fruits = ['Cauliflower', 'pineapple', 42];
const fridge = [
  {
    name: 'Orca',
    description: 'large Orca',
  },
  {
    name: 'Cauliflower',
    description: 'large Cauliflower',
  },
];

const types = ['vegetables', 'fruits'];
api.post(`/api/basket?q=${types.join(',')}`);

const MyComponent = () => (
  <ul>
    {vegetables.map(vegetable => (
      <li>{vegetable}</li>
    ))}
    {fruits.map(fruit => (
      <li>{fruit}</li>
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
