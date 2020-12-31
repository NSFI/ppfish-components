import React from 'react';
import { Consumer } from './Context';
import LocaleList from '../../Locale/index';

export function getLocale(Locale: string, componentName?: string) {
  let currentLocale = LocaleList[Locale] && LocaleList[Locale];
  if (componentName) {
    currentLocale = currentLocale[componentName];
  }
  return currentLocale || {};
}

export default function LocaleConsumer({ componentName, children }: {
  componentName: string,
  children: (params: object, locale: string) => React.ReactNode
}) {
  return <Consumer>
    {
      (value) => {
        const { Locale } = value;
        const ComponentLocal = getLocale(Locale, componentName);
        return children(ComponentLocal || {}, Locale);
      }
    }
  </Consumer>
}
