import i18n from 'i18next';import k from '~/i18n/keys';import React from 'react';

const SomeComponent = () =>
<div>
    <div style={{
    margin: '10px',
    border: '1px solid white' }}>


      {i18n.t(k.SOME_TEXT)}
    </div>
  </div>;


export default SomeComponent;
