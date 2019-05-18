import React from 'react';

const App = ({ someVal, someHandle }) => (
  <div>
    {someVal === 0 ? (
      <div>Some text</div>
    ) : (
      <div
        someAttr="sad"
        someAtt2r={i18n.t(k.SADER)}
      >
        Some other text
      </div>
    )}
  </div>
);

export default App;
