import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '../index.tsx';
import focusTest from '../../../tests/focusTest';

describe('Checkbox', () => {
  focusTest(Checkbox);

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = shallow(
      <Checkbox
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    wrapper.simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
