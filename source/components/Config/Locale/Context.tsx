// context.js
import React from 'react';
export const LocaleContext = React.createContext({
  Locale: 'zh_CN',
});
export const Provider = LocaleContext.Provider;
export const Consumer = LocaleContext.Consumer;



