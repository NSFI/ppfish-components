import React from 'react';
import { Consumer } from './Context';

export function getLocale(Locale: object, componentName?: string) {
  let currentLocale = Locale;
  if (componentName) {
    currentLocale = currentLocale[componentName];
  }
  return currentLocale || {};
}

export default function LocaleConsumer({
  componentName,
  children,
}: {
  componentName: string;
  children: (value: object, lang: string) => React.ReactNode;
}) {
  return (
    <Consumer>
      {Locale => {
        const ComponentLocal = getLocale(Locale, componentName);
        return children(ComponentLocal || {}, Locale.locale);
      }}
    </Consumer>
  );
}
