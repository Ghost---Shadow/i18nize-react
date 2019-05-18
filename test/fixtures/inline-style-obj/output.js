import i18n from 'i18next';import k from '~/i18n/keys';import React from 'react';

const SomeComponent = (isWhite, showTitle) =>
<div className={isWhite ? 'white' : 'black'}>
    <div style={{
    margin: '10px',
    border: '1px solid white' }}>


      {i18n.t(k.SOME_TEXT)}
    </div>
    <div
  style={() => {
    const margin = '10px';
    const maxWidth = 20;
    const border = maxWidth > 20 ? '1px solid white' : '  ';
    return {
      margin,
      border };

  }}
  title={showTitle ? i18n.t(k.TITLE) : '  '}>

      {i18n.t(k.SOME_MORE_TEXT)}
    </div>
  </div>;


export default SomeComponent;
