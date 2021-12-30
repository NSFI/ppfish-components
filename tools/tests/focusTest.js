var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
export default function focusTest(Component, getDOMNode, props) {
    if (props === void 0) { props = {}; }
    var getDOMNodeWithError = function () {
        var returnNode = getDOMNode();
        if (!returnNode) {
            throw new Error('DOM node is not available');
        }
        return returnNode;
    };
    describe('focus and blur', function () {
        var container = null;
        beforeAll(function () {
            jest.useFakeTimers();
        });
        beforeEach(function () {
            container = document.createElement('div');
            document.body.appendChild(container);
        });
        afterAll(function () {
            jest.useRealTimers();
        });
        afterEach(function () {
            unmountComponentAtNode(container);
            container.remove();
            container = null;
        });
        it('focus() and onFocus', function () {
            var handleFocus = jest.fn();
            var focusNode = null;
            act(function () {
                render(React.createElement(Component, __assign({}, props, { onFocus: handleFocus })), container);
            });
            focusNode = getDOMNodeWithError();
            expect(focusNode).not.toBe(null);
            act(function () {
                focusNode.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
            });
            jest.runAllTimers();
            expect(handleFocus).toBeCalled();
        });
        it('blur() and onBlur', function () {
            var handleBlur = jest.fn();
            var focusNode = null;
            act(function () {
                render(React.createElement(Component, __assign({}, props, { onBlur: handleBlur })), container);
            });
            focusNode = getDOMNodeWithError();
            expect(focusNode).not.toBe(null);
            act(function () {
                getDOMNodeWithError().dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
            });
            jest.runAllTimers();
            act(function () {
                getDOMNodeWithError().dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: null }));
            });
            jest.runAllTimers();
            expect(handleBlur).toBeCalled();
        });
        it('autoFocus', function () {
            var handleFocus = jest.fn();
            var focusNode = null;
            act(function () {
                render(React.createElement(Component, __assign({}, props, { autoFocus: true, onFocus: handleFocus })), container);
            });
            focusNode = getDOMNodeWithError();
            expect(focusNode).not.toBe(null);
            jest.runAllTimers();
            expect(handleFocus).toBeCalled();
        });
    });
}
