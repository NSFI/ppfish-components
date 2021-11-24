import React from 'react';
import { render, mount } from 'enzyme';
import Slider from '..';

describe('Slider', () => {
  it('should show tooltip when hovering slider handler', () => {
    const wrapper = mount(<Slider defaultValue={30} />);
    wrapper.find('.fishd-slider-handle').at(0).simulate('mouseEnter');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    wrapper.find('.fishd-slider-handle').at(0).simulate('mouseLeave');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });

  it('should show correct placement tooltip when set tooltipPlacement', () => {
    const wrapper = mount(<Slider vertical defaultValue={30} tooltipPlacement="left" />);
    wrapper.find('.fishd-slider-handle').at(0).simulate('mouseEnter');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    wrapper.find('.fishd-slider-handle').at(0).simulate('mouseLeave');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });

  it('when mouseEnter, tooltip should show', () => {
    let wrapper = mount(<Slider defaultValue={30} />);
    expect(wrapper.find('.fishd-tooltip').length).toBe(0);
    wrapper.find('.fishd-slider-handle').at(0).simulate('mouseEnter');
    expect(wrapper.find('.fishd-tooltip').at(0)).not.toBe(null);
    expect(wrapper.find('.fishd-tooltip').at(0).hasClass('fishd-tooltip-hidden')).toBe(false);
    wrapper.find('.fishd-slider-handle').at(0).simulate('click');
    expect(wrapper.find('.fishd-tooltip').at(0).hasClass('fishd-tooltip-hidden')).toBe(false);
  });

  it('when tipFormatter is null, tooltip should be hidden', () => {
    let wrapper = mount(<Slider defaultValue={30} tipFormatter={null} />);
    wrapper.find('.fishd-slider-handle').at(0).simulate('click');
    expect(wrapper.find('.fishd-tooltip').length).toBe(0);
  });

  it('when tipFormatter is not null, tooltip should show', () => {
    let wrapper = mount(<Slider defaultValue={30} tipFormatter={value => value.toString()} />);
    wrapper.find('.fishd-slider-handle').at(0).simulate('mouseEnter');
    expect(wrapper.find('.fishd-tooltip').at(0).hasClass('fishd-tooltip-hidden')).toBe(false);
  });

  it('when step is null, thumb can only be slided to the specific mark', () => {
    const intentionallyWrongValue = 40;
    const marks = {
      0: '0',
      48: '48',
      100: '100',
    };

    const wrapper = mount(
      <Slider marks={marks} defaultValue={intentionallyWrongValue} step={null} />,
    );
    expect(wrapper.find('.fishd-slider-handle').get(0).props).toHaveProperty('value', 48);
  });

  it('when step is not null, thumb can be slided to the multiples of step', () => {
    const marks = {
      0: '0',
      48: '48',
      100: '100',
    };

    const wrapper = mount(<Slider marks={marks} defaultValue={49} step={1} />);
    expect(wrapper.find('.fishd-slider-handle').get(0).props).toHaveProperty('value', 49);
  });

  it('when step is undefined, thumb can be slided to the multiples of step', () => {
    const marks = {
      0: '0',
      48: '48',
      100: '100',
    };

    const wrapper = mount(<Slider marks={marks} defaultValue={49} step={undefined} />);
    expect(wrapper.find('.fishd-slider-handle').get(0).props).toHaveProperty('value', 49);
  });

  it('tipFormatter should not crash with undefined value', () => {
    [undefined, null].forEach(value => {
      mount(<Slider value={value} />);
    });
  });
  it('step should not crash with undefined value', () => {
    [undefined, null].forEach(value => {
      mount(<Slider step={value} />);
    });
  });
});
