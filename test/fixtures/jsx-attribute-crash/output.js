import i18n from 'i18next';import k from '~/i18n/keys';import React from 'react';

const App = ({ someVal, someHandle }) =>
<div>
    {someVal === 0 ?
  <div>{i18n.t(k.SOME_TEXT)}</div> :

  <div
  someAttr="sad"
  someAtt2r={i18n.t(k.SADER)}>

        {i18n.t(k.SOME_OTHER_TEXT)}
      </div>}

  </div>;


export default App;
