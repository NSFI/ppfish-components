import * as React from 'react';
import Button from '../Button';
export default class Operation extends React.Component {
    render() {
        const { mode, arrowText, moveToLeft, moveToRight, leftArrowText = '', rightArrowText = '', leftActive, rightActive, className, style, } = this.props;
        if (mode === 'single') {
            return (React.createElement("div", { className: className, style: style }, arrowText));
        }
        else {
            return (React.createElement("div", { className: className, style: style },
                React.createElement(Button, { type: "primary", size: "small", disabled: !rightActive, onClick: moveToRight, icon: "right" }, rightArrowText),
                React.createElement(Button, { type: "primary", size: "small", disabled: !leftActive, onClick: moveToLeft, icon: "left" }, leftArrowText)));
        }
    }
}
