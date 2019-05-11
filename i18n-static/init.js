import i18next from 'i18next';
import english from './english';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: { translation: english },
  },
});

// Add this line to your app entrypoint. Usually it is src/index.js
// import './i18n/init';
