import React from 'react';
import zh_CN from '../../Locale/zh_CN';
import { LocaleProperties } from '../../Locale';

import { Provider } from './Context';

let runtimeLocale: {
  locale?: string,
} = {};

export function getRuntimeLocale(componentName) {
  if (!runtimeLocale.locale) {
    // 获取默认Locale;
    changeRuntimeLocale();
  }
  return runtimeLocale[componentName] || {};
}

// 部分组件如Modal 可以通过函数式调用  所以需要runtimeLocale提供支撑
export function changeRuntimeLocale(LocaleValue?: LocaleProperties) {
  if (!LocaleValue || !LocaleValue.locale) {
      runtimeLocale = zh_CN;
  }
  runtimeLocale = LocaleValue;
};

export default (props: {
  Locale: LocaleProperties,
  children?: React.ReactNode
}) => {
  const Locale = (props.Locale) || zh_CN;
  const { children } = props;
  const renderProvider = () => {
    changeRuntimeLocale(Locale);
    return props.children
  }
  return <Provider value={Locale}>
    {
      renderProvider()
    }
  </Provider>
};