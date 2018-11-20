import * as React from 'react';
import Upload from './Upload';
export default class Dragger extends React.Component {
    render() {
        const { props } = this;
        return React.createElement(Upload, Object.assign({}, props, { type: "drag" }));
    }
}
