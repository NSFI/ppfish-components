import React from 'react';
import { mount, render } from 'enzyme';
import Spin from '../index';

describe('Spin', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('组件的背景样式覆盖', () => {
    const wrapper = mount(
      <Spin style={{ background: 'red' }}>
        <div>content</div>
      </Spin>,
    );
    expect(wrapper.find('.fishd-spin-spinning').at(0).prop('style').background).toBe('red');
  });

  it('文本指示器', () => {
    const loadingText = 'cumstom loading text';
    const wrapper = render(<Spin.TextLoading className="myClass" text={loadingText} />);
    expect(wrapper.hasClass('myClass')).toBeTruthy();
    expect(wrapper.text()).toBe(loadingText + '.');
  });

  it('自定义 indicator', () => {
    const customIndicator = <div className="custom-indicator" />;
    const wrapper = render(<Spin indicator={customIndicator} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('受 spinning 参数控制', () => {
    const wrapper = mount(<Spin spinning={false} />);
    expect(wrapper.find('.fishd-spin').hasClass('fishd-spin-spinning')).toBe(false);

    wrapper.setProps({ spinning: true });
    wrapper.update();
    expect(wrapper.find('.fishd-spin').hasClass('fishd-spin-spinning')).toBe(true);
  });

  it('受 spinning 参数和 delay 参数控制', () => {
    const wrapper = mount(<Spin spinning={false} delay={300} />);
    expect(wrapper.find('.fishd-spin').hasClass('fishd-spin-spinning')).toBe(false);

    wrapper.setProps({ spinning: true });
    jest.advanceTimersByTime(280);
    expect(wrapper.find('.fishd-spin').hasClass('fishd-spin-spinning')).toBe(false);

    jest.advanceTimersByTime(20);
    wrapper.update();
    expect(wrapper.find('.fishd-spin').hasClass('fishd-spin-spinning')).toBe(true);

    jest.advanceTimersByTime(20);
    wrapper.update();
    expect(wrapper.find('.fishd-spin').hasClass('fishd-spin-spinning')).toBe(true);

    wrapper.setProps({ spinning: false });
    wrapper.update();
    expect(wrapper.find('.fishd-spin').hasClass('fishd-spin-spinning')).toBe(false);

    jest.advanceTimersByTime(20);
    expect(wrapper.find('.fishd-spin').hasClass('fishd-spin-spinning')).toBe(false);
  });
});
