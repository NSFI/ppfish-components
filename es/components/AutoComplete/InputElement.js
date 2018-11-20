import * as React from 'react';
import * as ReactDOM from 'react-dom';
export default class InputElement extends React.Component {
    constructor() {
        super(...arguments);
        this.focus = () => {
            this.ele.focus ? this.ele.focus() : ReactDOM.findDOMNode(this.ele).focus();
        };
        this.blur = () => {
            this.ele.blur ? this.ele.blur() : ReactDOM.findDOMNode(this.ele).blur();
        };
        this.saveRef = (ele) => {
            this.ele = ele;
            const { ref: childRef } = this.props.children;
            if (typeof childRef === 'function') {
                childRef(ele);
            }
        };
    }
    render() {
        return React.cloneElement(this.props.children, Object.assign({}, this.props, { ref: this.saveRef }), null);
    }
}
