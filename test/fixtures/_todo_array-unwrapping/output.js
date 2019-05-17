// TODO: Find a way to implement this feature

import React from 'react';

const vegetables = ['potato', 'tomato', 'cabbage'];

const MyComponent = () =>
<ul>
    {vegetables.map((vegetable) =>
  <li>{vegetable}</li>)}

  </ul>;


export default MyComponent;
