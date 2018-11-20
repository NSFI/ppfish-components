import * as React from 'react';
import Select, { Option } from '../Select';
export default class MiniSelect extends React.Component {
    render() {
        return React.createElement(Select, Object.assign({ size: "small" }, this.props));
    }
}
MiniSelect.Option = Option;
