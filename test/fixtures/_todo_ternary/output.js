import i18n from 'i18next';
import k from '~/i18n/keys';
import React from 'react';
const p = i18n.t(k.POTATO1);
const isPotato = true;

const SomeComponent = () => <div>{isPotato ? p : 'Tomato'}</div>;

export default SomeComponent;
