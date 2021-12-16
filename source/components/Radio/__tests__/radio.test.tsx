import React from 'react';
import { shallow, render } from 'enzyme';
import Radio from '../Radio';
import focusTest from '../../../../tools/tests/focusTest';

describe('Radio', () => {
  focusTest(Radio, () => document.querySelector('.fishd-radio-input'));

  it('should render correctly', () => {
    const wrapper = render(<Radio className="customized">Test</Radio>);
    expect(wrapper).toMatchSnapshot();
  });

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = shallow(<Radio onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

    wrapper.simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
