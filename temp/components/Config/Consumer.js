import React from 'react';
import LocaleConsumer from './Locale/Consumer';
export default function ConfigConsumer(props) {
    return React.createElement(LocaleConsumer, { componentName: props.componentName }, function (value, lang) { return props.children(value, lang); });
}
