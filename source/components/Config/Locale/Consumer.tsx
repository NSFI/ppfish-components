import React from 'react';
import { Consumer } from './Context';
import LocaleList from '../../Locale/index';

export default function LocaleConsumer({ componentName, children }: {
  componentName: string,
  children: (params: object, locale: string) => React.ReactNode
}) {
  return <Consumer>
    {
      (value) => {
        const { Locale } = value;
        const ComponentLocal = LocaleList[Locale] && LocaleList[Locale][componentName]
        return children(ComponentLocal || {}, Locale);
      }
    }
  </Consumer>
}
