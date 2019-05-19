import i18n from 'i18next';import k from '~/i18n/keys'; // TODO: Find a way to implement this feature

import React from 'react';
import api from 'somewhere';

const vegetables = ['potato', 'raddish', 'cabbage'];
let fruits = ['apple', 'banana'];
fruits = ['tomato', 'pineapple'];
const fridge = [
{
  name: i18n.t(k.POTATO2),
  description: i18n.t(k.LARGE_POTATO) },

{
  name: i18n.t(k.TOMATO1),
  description: i18n.t(k.LARGE_TOMATO) }];



const types = ['vegetables', 'fruits'];
api.post(`/api/basket?q=${types.join(',')}`);

const MyComponent = () =>
<ul>
    {vegetables.map((vegetable) =>
  <li>{vegetable}</li>)}

    {fruits.map((fruit) =>
  <li>{fruit}</li>)}

    {fridge.map((item) =>
  <div>
        <div>{item.name}</div>
        <div>{item.description}</div>
      </div>)}

  </ul>;


export default MyComponent;
