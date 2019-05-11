import i18next from 'i18next';
import english from './english';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: { translation: english },
  },
});

// Add a line `import './i18n/init';` to your app entrypoint
// usually src/index.js
