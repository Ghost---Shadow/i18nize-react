import i18n from 'i18next';
import k from '~/i18n/keys';
import React from 'react';
const string1 = i18n.t(k.HELLO_WALDO);
const string2 = i18n.t(k.HELLO_WALDA);
const string3 = i18n.t(k.HELLO_WALUIGI);
const string4 = i18n.t(k.HELLO_WOMBLE);

const InterpolationTest = () => <div>
    {string1}
    {`${string2} ${string3}`}
    {`${i18n.t(k.POTATO)} ${string4}`}
  </div>;

export default InterpolationTest;
