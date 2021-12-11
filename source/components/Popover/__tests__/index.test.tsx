import React from 'react';
import { mount } from 'enzyme';
import Popover from '../index';
import { TooltipRef } from '../../Tooltip';

describe('Popover', () => {
  it('should show overlay when trigger is clicked', () => {
    let popoverRef: React.RefObject<TooltipRef> = React.createRef();
    const popover = mount(
      <Popover ref={popoverRef} content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    expect(popoverRef.current.getPopupDomNode()).toBe(null);

    popover.find('span').simulate('click');

    const popup = popoverRef.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect((popover.find('Trigger PopupInner').props() as any).visible).toBeTruthy();

    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('shows content for render functions', () => {
    const renderTitle = 'some-title';
    const renderContent = 'some-content';
    let popoverRef: React.RefObject<TooltipRef> = React.createRef();

    const popover = mount(
      <Popover ref={popoverRef} content={renderContent} title={renderTitle} trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    popover.find('span').simulate('click');

    const popup = popoverRef.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.innerHTML).toContain('some-title');
    expect(popup.innerHTML).toContain('some-content');
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('handles empty title/content props safely', () => {
    let popoverRef: React.RefObject<TooltipRef> = React.createRef();

    const popover = mount(
      <Popover trigger="click" ref={popoverRef}>
        <span>show me your code</span>
      </Popover>,
    );

    popover.find('span').simulate('click');

    const popup = popoverRef.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('props#overlay do not warn anymore', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const overlay = jest.fn();

    // Popover 因为没有overlay类型, 想要检测只能先注释
    mount(
      // @ts-ignore
      <Popover overlay={overlay} content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    expect(errorSpy.mock.calls.length).toBe(0);
    expect(overlay).not.toHaveBeenCalled();
  });
});
