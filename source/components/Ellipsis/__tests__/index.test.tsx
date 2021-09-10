import React from 'react';
import { mount } from 'enzyme';
import Ellipsis from '../Ellipsis';

describe('Ellipsis', () => {
  const testWidthModeTooltipCls = 'demo-width-1';
  const testWidthModeWithoutTooltipCls = 'demo-width-2';

  const testLineClampModeTooltipCls = 'demo-line-1';
  const testLineClampModeWithoutTooltipCls = 'demo-line-2';

  const mockOffsetWidthGet = jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get');
  const mockScrollWidthGet = jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get');
  const mockOffsetHeightGet = jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get');
  const mockScrollHeightGet = jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get');
  beforeAll(() => {
    // Mock offsetWidth
    mockOffsetWidthGet.mockImplementation(function () {
      if (this.className.includes(testWidthModeTooltipCls)) {
        return 100;
      } else if (this.className.includes(testWidthModeWithoutTooltipCls)) {
        return 100;
      }
      return 80;
    });

    // Mock scrollWidth
    mockScrollWidthGet.mockImplementation(function () {
      if (this.className.includes(testWidthModeTooltipCls)) {
        return 200;
      } else if (this.className.includes(testWidthModeWithoutTooltipCls)) {
        return 100;
      }
      return 80;
    });

    // Mock offsetHeight
    mockOffsetHeightGet.mockImplementation(function () {
      if (this.className.includes(testLineClampModeTooltipCls)) {
        return 100;
      } else if (this.className.includes(testLineClampModeWithoutTooltipCls)) {
        return 100;
      }
      return 80;
    });

    // Mock scrollHeight
    mockScrollHeightGet.mockImplementation(function () {
      if (this.className.includes(testLineClampModeTooltipCls)) {
        return 200;
      } else if (this.className.includes(testLineClampModeWithoutTooltipCls)) {
        return 100;
      }
      return 80;
    });
  });

  afterAll(() => {
    mockOffsetWidthGet.mockRestore();
    mockScrollWidthGet.mockRestore();
    mockOffsetHeightGet.mockRestore();
    mockScrollHeightGet.mockRestore();
  });

  it('should use length mode with tooltip', () => {
    const wrapper = mount(
      <Ellipsis length={5} tooltipProps={{ trigger: 'click' }}>
        123456
      </Ellipsis>,
    );
    const node = wrapper.find('.fishd-ellipsis-ellipsis');
    expect(node.text()).toBe('12345...');

    const prevNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(prevNodes.length).toBe(0);

    const self = wrapper.find('.fishd-ellipsis-ellipsis');
    self.at(0).simulate('click');

    const currNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(currNodes.length).toBe(1);
  });

  it('should use length mode without tooltip', () => {
    const wrapper = mount(
      <Ellipsis length={5} tooltipProps={{ trigger: 'click' }}>
        12345
      </Ellipsis>,
    );
    const node = wrapper.find('.fishd-ellipsis-ellipsis');
    expect(node.text()).toBe('12345');

    const prevNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(prevNodes.length).toBe(0);

    const self = wrapper.find('.fishd-ellipsis-ellipsis');
    self.at(0).simulate('click');

    const currNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(currNodes.length).toBe(0);
  });

  it('should use width mode with tooltip', () => {
    const wrapper = mount(
      <Ellipsis
        className={testWidthModeTooltipCls}
        width={'100%'}
        tooltipProps={{ trigger: 'click' }}
      >
        12345678
      </Ellipsis>,
    );
    const prevNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(prevNodes.length).toBe(0);

    const self = wrapper.find('.fishd-ellipsis-ellipsis');
    self.at(0).simulate('click');

    const currNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(currNodes.length).toBe(1);
  });

  it('should use width mode without tooltip', () => {
    const wrapper = mount(
      <Ellipsis
        className={testWidthModeWithoutTooltipCls}
        width={'100%'}
        tooltipProps={{ trigger: 'click' }}
      >
        12345678
      </Ellipsis>,
    );
    const prevNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(prevNodes.length).toBe(0);

    const self = wrapper.find('.fishd-ellipsis-ellipsis');
    self.at(0).simulate('click');

    const currNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(currNodes.length).toBe(0);
  });

  it('should use line mode with tooltip', () => {
    const wrapper = mount(
      <Ellipsis
        className={testLineClampModeTooltipCls}
        lines={2}
        tooltipProps={{ trigger: 'click' }}
      >
        12345678
      </Ellipsis>,
    );
    const prevNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(prevNodes.length).toBe(0);

    const self = wrapper.find('.fishd-ellipsis-ellipsis');
    self.at(0).simulate('click');

    const currNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(currNodes.length).toBe(1);
  });

  it('should use line mode without tooltip', () => {
    const wrapper = mount(
      <Ellipsis
        className={testLineClampModeWithoutTooltipCls}
        lines={2}
        tooltipProps={{ trigger: 'click' }}
      >
        12345678
      </Ellipsis>,
    );
    const prevNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(prevNodes.length).toBe(0);

    const self = wrapper.find('.fishd-ellipsis-ellipsis');
    self.at(0).simulate('click');

    const currNodes = wrapper.render().find('.fishd-ellipsis-tooltip');
    expect(currNodes.length).toBe(0);
  });
});
