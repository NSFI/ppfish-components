// context.js
import React from 'react';
import zh_CN from '../../Locale/zh_CN';
export var LocaleContext = React.createContext(zh_CN);
export var Provider = LocaleContext.Provider;
export var Consumer = LocaleContext.Consumer;
