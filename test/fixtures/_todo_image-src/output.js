import i18n from 'i18next';import k from '~/i18n/keys';import React from 'react';
import AnotherComponent from './Somewhere';

const src = i18n.t(k.HTTPS_EXAMPLE_COM_SOME_PAGE); // TODO: Have a regex to ignore websites and emails

const MyComponent = () =>
<AnotherComponent src={src} />;


export default MyComponent;
