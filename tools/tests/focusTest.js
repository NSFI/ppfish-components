import React from 'react';
import { mount } from 'enzyme';

export default function focusTest(Component) {
  describe('focus and blur', () => {
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
      wrapper.find('input').instance().focus();
      jest.runAllTimers();
      expect(handleFocus).toBeCalled();
    });

    it('blur() and onBlur', () => {
      const handleBlur = jest.fn();
      const wrapper = mount(<Component onBlur={handleBlur} />, { attachTo: container });
      wrapper.find('input').instance().focus();
      jest.runAllTimers();
      wrapper.find('input').instance().blur();
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
