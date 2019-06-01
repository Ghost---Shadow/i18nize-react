import i18n from 'i18next';import k from '~/i18n/keys';import React from 'react';
import api from './api';

const p = i18n.t(k.POTATO);
const isPotato = i18n.t(k.ISPOTATO);

const val = true;
const query = val ? 'dont' : 'replace_these';

const result = api.get(`/posts?q=${query}`);

const SomeComponent = () =>
<div>
    <div>{isPotato ? p : i18n.t(k.TOMATO)}</div>
    {result}
  </div>;


export default SomeComponent;
