import React from 'react';

const SomeComponent = (isWhite, showTitle) => (
  <div className={isWhite ? 'white' : 'black'}>
    <div style={{
      margin: '10px',
      border: '1px solid white',
    }}
    >
      Some text
    </div>
    <div
      style={() => {
        const margin = '10px';
        const maxWidth = 20;
        const border = maxWidth > 20 ? '1px solid white' : '  ';
        return {
          margin,
          border,
        };
      }}
      title={showTitle ? 'Title' : '  '}
    >
      Some more text
    </div>
  </div>
);

export default SomeComponent;
