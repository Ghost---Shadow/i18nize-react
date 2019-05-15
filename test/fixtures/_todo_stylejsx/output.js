import i18n from 'i18next';
import k from '~/i18n/keys';
import React from 'react';

const SomeComponent = () => <div>
    <div>
      <style jsx>
        {`${i18n.t(k.GAME_PANEL_POSI)}`}
      </style>
    </div>
  </div>;

export default SomeComponent;
