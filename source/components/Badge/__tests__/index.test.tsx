import React from 'react';
import { mount, render } from 'enzyme';
import Badge from '../index';
import Tooltip from '../../Tooltip/index';
import { act } from 'react-dom/test-utils';

describe('Badge', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('badge dot not scaling count > 9', () => {
    const badge = mount(<Badge count={10} dot />);
    expect(badge.find('.fishd-card-multiple-words').length).toBe(0);
  });

  it('badge dot not showing count == 0', () => {
    const badge = mount(<Badge count={0} dot />);
    expect(badge.find('.fishd-badge-dot').length).toBe(0);
  });

  it('should have an overriden title attribute', () => {
    const badge = mount(<Badge count={10} title="Custom title" />);
    expect(
      badge.find('.fishd-scroll-number').getDOMNode().attributes.getNamedItem('title').value,
    ).toEqual('Custom title');
  });

  it('should be composable with Tooltip', () => {
    const wrapper = mount(
      <Tooltip title="Fix the error">
        <Badge status="error" />
      </Tooltip>,
    );
    wrapper.find('Badge').simulate('mouseenter');
    act(() => {
      jest.runAllTimers();
    });
    expect(wrapper.find('.fishd-tooltip-hidden').length).toBe(0);
  });

  it('should render when count is changed', () => {
    const wrapper = mount(<Badge count={9} />);
    wrapper.setProps({ count: 10 });
    act(() => {
      jest.runAllTimers();
    });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 11 });
    act(() => {
      jest.runAllTimers();
    });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 11 });
    act(() => {
      jest.runAllTimers();
    });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 10 });
    act(() => {
      jest.runAllTimers();
    });
    expect(wrapper).toMatchSnapshot();
    act(() => {
      jest.runAllTimers();
    });
    wrapper.setProps({ count: 9 });
    expect(wrapper).toMatchSnapshot();
  });

  it('should be compatible with borderColor style', () => {
    const wrapper = render(
      <Badge
        count={4}
        style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
