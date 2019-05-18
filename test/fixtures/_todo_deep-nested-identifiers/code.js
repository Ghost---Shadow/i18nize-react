import React from 'react';

const a = { b: { c: { d: 'hello' } } };
const x = {};
x.y = {};
x.y.z = 'world';

a.name = 'string1';
a.b.name = 'string1';

const MyComponent = () => (
  <div>
    {a.b.c.d}
    {x.y.z}
    {a.name}
    {a.b.name}
  </div>
);

export default MyComponent;
