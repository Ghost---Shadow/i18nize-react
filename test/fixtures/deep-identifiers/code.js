import React from 'react';

const a = { b: { c: { d: 'hello' } } };
const x = {};
x.y = {};
x.y.z = 'world';

const MyComponent = () => (
  <div>
    {a.b.c.d}
    {x.y.z}
  </div>
);

export default MyComponent;
