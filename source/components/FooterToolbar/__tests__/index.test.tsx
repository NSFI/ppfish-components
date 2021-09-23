import React from 'react';
import { mount } from 'enzyme';
import FooterToolbar from '../FooterToolbar';

describe('FooterToolbar', () => {
  let originGetComputedStyle;
  beforeAll(() => {
    originGetComputedStyle = Object.getOwnPropertyDescriptor(window, 'getComputedStyle').value;
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        height: 100,
      }),
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: originGetComputedStyle,
    });
  });

  it('FooterToolbar should render', () => {
    const Page = () => {
      return (
        <div style={{ position: 'relative' }}>
          <FooterToolbar>footer</FooterToolbar>
        </div>
      );
    };
    const wrapper = mount(<Page />);
    expect(wrapper).toMatchSnapshot();
  });
});
