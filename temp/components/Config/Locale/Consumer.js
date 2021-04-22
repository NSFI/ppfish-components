import React from 'react';
import { Consumer } from './Context';
export function getLocale(Locale, componentName) {
    var currentLocale = Locale;
    if (componentName) {
        currentLocale = currentLocale[componentName];
    }
    return currentLocale || {};
}
export default function LocaleConsumer(_a) {
    var componentName = _a.componentName, children = _a.children;
    return React.createElement(Consumer, null, function (Locale) {
        var ComponentLocal = getLocale(Locale, componentName);
        return children(ComponentLocal || {}, Locale.locale);
    });
}
