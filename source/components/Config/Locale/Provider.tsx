import React from 'react'

import { Provider } from './Context';

export default (props: {
  value: {
    Locale: string,
  }
  children?: React.ReactNode
}) => {
  return <Provider value={props.value}>
    {props.children}
  </Provider>
};