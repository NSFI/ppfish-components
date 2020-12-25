import React from 'react'
import LocaleConsumer from './Locale/Consumer';

export default function ConfigConsumer(props) {
  return <LocaleConsumer componentName={props.componentName}>
    {
      (value) => {
        return props.children(value);
      }
    }
  </LocaleConsumer>
}