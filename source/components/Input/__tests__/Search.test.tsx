import React from 'react';
import { mount } from 'enzyme';
import Input from '../index';
import Button from '../../Button';

const Search = Input.Search;

describe('Input.Search', () => {
  it('should support focus() blur(), and can get input element', function () {
    const ref = React.createRef<any>();
    mount(<Input ref={ref} />);
    ref.current.focus();
    ref.current.blur();
    expect(ref.current.input instanceof HTMLInputElement).toBe(true);
  });

  it('should support custom button', () => {
    const wrapper = mount(<Search enterButton={<button type="button">ok</button>} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support custom Button', () => {
    const wrapper = mount(<Search enterButton={<Button>ok</Button>} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support enterButton null', () => {
    expect(() => {
      mount(<Search enterButton={null} />);
    }).not.toThrow();
  });

  it('should support ReactNode suffix without error', () => {
    const wrapper = mount(<Search suffix={<div>ok</div>} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should disable enter button when disabled prop is true', () => {
    const wrapper = mount(<Search placeholder="input search text" enterButton disabled />);
    expect(wrapper.find('.fishd-btn-primary[disabled]')).toHaveLength(1);
  });

  it('should disable search icon when disabled prop is true', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<Search defaultValue="search text" onSearch={onSearch} disabled />);
    wrapper.find('.fishd-input-search-icon').at(0).simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(0);
  });

  it('should trigger onSearch when click search icon', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<Search defaultValue="search text" onSearch={onSearch} />);
    wrapper.find('.fishd-input-search-icon').at(0).simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when click search button', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<Search defaultValue="search text" enterButton onSearch={onSearch} />);
    wrapper.find('.fishd-input-search-button').at(0).simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when click search button with text', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <Search defaultValue="search text" enterButton="button text" onSearch={onSearch} />,
    );
    wrapper.find('.fishd-input-search-button').at(0).simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when click search button with customize button', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <Search
        defaultValue="search text"
        enterButton={<Button>fishd button</Button>}
        onSearch={onSearch}
      />,
    );
    wrapper.find('Button').at(0).simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when click search button of native', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <Search
        defaultValue="search text"
        enterButton={<button type="button">native button</button>}
        onSearch={onSearch}
      />,
    );
    wrapper.find('button').simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when press enter', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<Search defaultValue="search text" onSearch={onSearch} />);
    wrapper.find('input').simulate('keydown', { key: 'Enter', keyCode: 13 });
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'keydown',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should support addonAfter', () => {
    const addonAfter = <span>Addon After</span>;
    const wrapper = mount(<Search addonAfter={addonAfter} />);
    const wrapperWithEnterButton = mount(<Search enterButton addonAfter={addonAfter} />);
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapperWithEnterButton.render()).toMatchSnapshot();
  });

  it('should support invalid suffix', () => {
    const wrapper = mount(<Search suffix={[]} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support invalid addonAfter', () => {
    const wrapper = mount(<Search addonAfter={[]} enterButton />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('not crash when use function ref', () => {
    const ref = jest.fn();
    const wrapper = mount(<Search ref={ref} enterButton />);
    expect(() => {
      wrapper.find('button').simulate('mousedown');
    }).not.toThrow();
  });
});
