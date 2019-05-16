import i18n from 'i18next';
import k from '~/i18n/keys';
import React from 'react';
const p = i18n.t(k.POTATO1);
const isPotato = i18n.t(k.ISPOTATO);

const SomeComponent = () => <div>{isPotato ? p : i18n.t(k.TOMATO)}</div>;

export default SomeComponent;
