import React from 'react';
import LocaleProvider from './Locale/Provider';
export default function ConfigProvider(props) {
    var Locale = props.Locale, children = props.children;
    return (React.createElement(LocaleProvider, { Locale: Locale }, children));
}
