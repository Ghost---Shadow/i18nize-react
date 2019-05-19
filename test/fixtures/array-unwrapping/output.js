import i18n from 'i18next';import k from '~/i18n/keys';import React from 'react';
import api from 'somewhere';

const vegetables = [i18n.t(k.ORCA), i18n.t(k.RADDISH), i18n.t(k.CABBAGE), 42];
let fruits = [i18n.t(k.APPLE), i18n.t(k.BANANA)];
fruits = [i18n.t(k.CAULIFLOWER), i18n.t(k.PINEAPPLE), 42];
const fridge = [
{
  name: i18n.t(k.ORCA),
  description: i18n.t(k.LARGE_ORCA) },

{
  name: i18n.t(k.CAULIFLOWER),
  description: i18n.t(k.LARGE_CAULIFLOWER) }];



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
