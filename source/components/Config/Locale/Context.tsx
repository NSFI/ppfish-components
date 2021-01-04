// context.js
import React from 'react';
import zh_CN from '../../Locale/zh_CN';
export const LocaleContext = React.createContext(zh_CN);
export const Provider = LocaleContext.Provider;
export const Consumer = LocaleContext.Consumer;



