import i18n from 'i18next';import k from '~/i18n/keys'; // TODO: Find a way to implement this feature

import React from 'react';

const vegetables = ['potato', 'tomato', 'cabbage'];
const fridge = [
{
  name: 'potato',
  description: 'large potato' },

{
  name: i18n.t(k.TOMATO1),
  description: i18n.t(k.LARGE_TOMATO) }];



const MyComponent = () =>
<ul>
    {vegetables.map((vegetable) =>
  <li>{vegetable}</li>)}

    {fridge.map((item) =>
  <div>
        <div>{item.name}</div>
        <div>{item.description}</div>
      </div>)}

  </ul>;


export default MyComponent;
