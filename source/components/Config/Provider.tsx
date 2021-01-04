import { LocaleProperties } from '../Locale';
import React from 'react'
import LocaleProvider from './Locale/Provider';

export default function ConfigProvider(props: {
  Locale: LocaleProperties
  children: React.ReactNode
}) {
  const { Locale, children } = props;
  return (
    <LocaleProvider Locale={Locale}>
      {
        children
      }
    </LocaleProvider>
  )
}