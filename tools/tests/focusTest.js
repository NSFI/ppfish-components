import React from 'react';
import { mount } from 'enzyme';

export default function focusTest(Component, componetRef = false) {
  describe('focus and blur', () => {
    const getCorrectInstance = (wrapper) => {
      if(componetRef) {
        return wrapper.instance();
      }
      return wrapper.find('input').instance();
    };

    beforeAll(() => {
      jest.useFakeTimers();
    });

    let container;
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('focus() and onFocus', () => {
      const handleFocus = jest.fn();
      const wrapper = mount(<Component onFocus={handleFocus} />, { attachTo: container });
      getCorrectInstance(wrapper).focus();
      jest.runAllTimers();
      expect(handleFocus).toBeCalled();
    });

    it('blur() and onBlur', () => {
      const handleBlur = jest.fn();
      const wrapper = mount(<Component onBlur={handleBlur} />, { attachTo: container });
      getCorrectInstance(wrapper).focus();
      jest.runAllTimers();
      getCorrectInstance(wrapper).blur();
      jest.runAllTimers();
      expect(handleBlur).toBeCalled();
    });

    it('autoFocus', () => {
      const handleFocus = jest.fn();
      mount(<Component autoFocus onFocus={handleFocus} />, { attachTo: container });
      jest.runAllTimers();
      expect(handleFocus).toBeCalled();
    });
  });
}
