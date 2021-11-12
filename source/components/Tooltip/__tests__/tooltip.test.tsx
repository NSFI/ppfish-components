import React from 'react';
import { mount } from 'enzyme';
import Tooltip, { TooltipRef } from '../index';
import Button from '../../Button';

describe('Tooltip', () => {
  it('check `onVisibleChange` arguments', () => {
    const onVisibleChange = jest.fn();
    const ref = React.createRef<TooltipRef>();

    const wrapper = mount(
      <Tooltip
        ref={ref}
        title=""
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
      >
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );

    // `title` is empty.
    const div = wrapper.find('#hello').at(0);
    div.simulate('mouseenter');
    expect(onVisibleChange).not.toHaveBeenCalled();
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(false);

    div.simulate('mouseleave');
    expect(onVisibleChange).not.toHaveBeenCalled();
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(false);

    // update `title` value.
    wrapper.setProps({ title: 'Have a nice day!' });
    wrapper.find('#hello').simulate('mouseenter');
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(true);

    wrapper.find('#hello').simulate('mouseleave');
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(false);

    // add `visible` props.
    wrapper.setProps({ visible: false });
    wrapper.find('#hello').simulate('mouseenter');
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);
    const lastCount = onVisibleChange.mock.calls.length;
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(false);

    // always trigger onVisibleChange
    wrapper.simulate('mouseleave');
    expect(onVisibleChange.mock.calls.length).toBe(lastCount); // no change with lastCount
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(false);
  });

  it('should hide when mouse leave native disabled button', () => {
    const onVisibleChange = jest.fn();
    const ref = React.createRef<TooltipRef>();
    const wrapper = mount(
      <Tooltip
        ref={ref}
        title="xxxxx"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
      >
        <button type="button" disabled>
          Hello world!
        </button>
      </Tooltip>,
    );

    expect(wrapper.find('span')).toHaveLength(1);
    const button = wrapper.find('span').at(0);
    button.simulate('mouseenter');
    expect(onVisibleChange).toBeCalledWith(true);
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(true);

    button.simulate('mouseleave');
    expect(onVisibleChange).toBeCalledWith(false);
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(false);
  });

  it('should hide when mouse leave fishd disabled Button', () => {
    const onVisibleChange = jest.fn();
    const ref = React.createRef<TooltipRef>();
    const wrapper = mount(
      <Tooltip
        ref={ref}
        title="xxxxx"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
      >
        <Button disabled>Hello world!</Button>
      </Tooltip>,
    );

    expect(wrapper.render()).toMatchSnapshot();
    const button = wrapper.find('span').at(0);
    button.simulate('mouseenter');
    expect(onVisibleChange).toBeCalledWith(true);
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(true);

    button.simulate('mouseleave');
    expect(onVisibleChange).toBeCalledWith(false);
    expect(ref.current.tooltip.trigger.props.popupVisible).toBe(false);
  });

  it('should render disabled Button style properly', () => {
    const wrapper1 = mount(
      <Tooltip title="xxxxx">
        <Button disabled>Hello world!</Button>
      </Tooltip>,
    );
    const wrapper2 = mount(
      <Tooltip title="xxxxx">
        <Button disabled style={{ display: 'block' }}>
          Hello world!
        </Button>
      </Tooltip>,
    );
    expect(wrapper1.find('span').first().getDOMNode<HTMLElement>().style.display).toBe(
      'inline-block',
    );
    expect(wrapper2.find('span').first().getDOMNode<HTMLElement>().style.display).toBe('block');
  });

  it('should not wrap span when trigger is not hover', () => {
    const wrapper = mount(
      <Tooltip title="xxxxx" trigger="click" mouseEnterDelay={0} mouseLeaveDelay={0}>
        <button type="button" disabled>
          Hello world!
        </button>
      </Tooltip>,
    );

    expect(wrapper.find('span')).toHaveLength(0);
  });

  it('should works for arrowPointAtCenter', () => {
    const arrowWidth = 5;
    const horizontalArrowShift = 16;
    const triggerWidth = 200;

    const suit = () => {
      const ref = React.createRef<TooltipRef>();
      const wrapper = mount(
        <Tooltip
          ref={ref}
          title="xxxxx"
          trigger="click"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
          placement="bottomLeft"
        >
          <button type="button" style={{ width: triggerWidth }}>
            Hello world!
          </button>
        </Tooltip>,
      );
      wrapper.find('button').at(0).simulate('click');
      const popupLeftDefault = parseInt(ref.current.getPopupDomNode().style.left, 10);

      const ref2 = React.createRef<TooltipRef>();
      const wrapper2 = mount(
        <Tooltip
          ref={ref2}
          title="xxxxx"
          trigger="click"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
          placement="bottomLeft"
          arrowPointAtCenter
        >
          <button type="button" style={{ width: triggerWidth }}>
            Hello world!
          </button>
        </Tooltip>,
      );
      wrapper2.find('button').at(0).simulate('click');
      const popupLeftArrowPointAtCenter = parseInt(ref2.current.getPopupDomNode().style.left, 10);
      expect(popupLeftArrowPointAtCenter - popupLeftDefault).toBe(
        triggerWidth / 2 - horizontalArrowShift - arrowWidth,
      );
    };

    jest.dontMock('rc-trigger');
  });
});
