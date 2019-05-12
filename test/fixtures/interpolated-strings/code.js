import React from 'react';

const string1 = 'Hello waldo';
const string2 = 'Hello walda';
const string3 = 'Hello waluigi';
const string4 = 'Hello womble';

const InterpolationTest = () => (
  <div>
    {string1}
    {`${string2} ${string3}`}
    {`Potato: ${string4}`}
  </div>
);

export default InterpolationTest;
