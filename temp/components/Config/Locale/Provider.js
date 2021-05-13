import React from 'react';
import zh_CN from '../../Locale/zh_CN';
import { Provider } from './Context';
var runtimeLocale = {};
export function getRuntimeLocale(componentName) {
    if (!runtimeLocale.locale) {
        // 获取默认Locale;
        changeRuntimeLocale();
    }
    return runtimeLocale[componentName] || {};
}
// 部分组件如Modal 可以通过函数式调用  所以需要runtimeLocale提供支撑
export function changeRuntimeLocale(LocaleValue) {
    if (!LocaleValue || !LocaleValue.locale) {
        runtimeLocale = zh_CN;
    }
    else {
        runtimeLocale = LocaleValue;
    }
}
;
export default (function (props) {
    var Locale = (props.Locale) || zh_CN;
    var children = props.children;
    var renderProvider = function () {
        changeRuntimeLocale(Locale);
        return props.children;
    };
    return React.createElement(Provider, { value: Locale }, renderProvider());
});
