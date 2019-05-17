import i18n from 'i18next';import k from '~/i18n/keys';import React from 'react';

const a = { b: { c: { d: i18n.t(k.HELLO) } } };
const x = {};
x.y = {};
x.y.z = i18n.t(k.WORLD);

const MyComponent = () =>
<div>
    {a.b.c.d}
    {x.y.z}
  </div>;


export default MyComponent;
