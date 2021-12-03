import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';


export default function focusTest(Component, getDOMNode: () => HTMLElement, props = {}) {
  const getDOMNodeWithError = () => {
    let returnNode = getDOMNode();
    if (!returnNode) {
      throw new Error('DOM node is not available');
    }
    return returnNode;
  };
  describe('focus and blur', () => {
    let container = null;

    beforeAll(() => {
      jest.useFakeTimers();
    });

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    it('focus() and onFocus', () => {
      const handleFocus = jest.fn();
      let focusNode = null;
      act(() => {
        render(<Component {...props} onFocus={handleFocus} />, container);
      });
      focusNode = getDOMNodeWithError();
      expect(focusNode).not.toBe(null);
      act(() => {
        focusNode.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
      });
      jest.runAllTimers();
      expect(handleFocus).toBeCalled();
    });

    it('blur() and onBlur', () => {
      const handleBlur = jest.fn();
      let focusNode = null;
      act(() => {
        render(<Component {...props} onBlur={handleBlur} />, container);
      });
      focusNode = getDOMNodeWithError();
      expect(focusNode).not.toBe(null);
      act(() => {
        getDOMNodeWithError().dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
      });
      jest.runAllTimers();
      act(() => {
        getDOMNodeWithError().dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: null }));
      });
      jest.runAllTimers();
      expect(handleBlur).toBeCalled();
    });

    it('autoFocus', () => {
      const handleFocus = jest.fn();
      let focusNode = null;
      act(() => {
        render(<Component {...props} autoFocus onFocus={handleFocus} />, container);
      });
      focusNode = getDOMNodeWithError();
      expect(focusNode).not.toBe(null);
      jest.runAllTimers();
      expect(handleFocus).toBeCalled();
    });
  });
}
