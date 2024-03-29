/* eslint-disable */
import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import Button from '../index';
import Icon from '../../Icon/index';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(<Button>Follow</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Chinese characters correctly', () => {
    const wrapper = render(<Button>按钮</Button>);
    expect(wrapper).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper1 = render(<Button icon="search">按钮</Button>);
    expect(wrapper1).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper2 = render(
      <Button>
        <Icon type="search" />
        按钮
      </Button>,
    );
    expect(wrapper2).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper3 = render(<Button icon="search">按钮</Button>);
    expect(wrapper3).toMatchSnapshot();
    // should not insert space when there is icon while loading
    const wrapper4 = render(
      <Button icon="search" loading>
        按钮
      </Button>,
    );
    expect(wrapper4).toMatchSnapshot();
    // should insert space while loading
    const wrapper5 = render(<Button loading>按钮</Button>);
    expect(wrapper5).toMatchSnapshot();
  });

  it('renders Chinese characters correctly in HOC', () => {
    const Text = ({ children }) => <span>{children}</span>;
    const wrapper = mount(
      <Button>
        <Text>按钮</Text>
      </Button>,
    );
    expect(wrapper.find('.fishd-btn').hasClass('fishd-btn-two-chinese-chars')).toBe(true);
    wrapper.setProps({
      children: <Text>大按钮</Text>,
    });
    wrapper.update();
    expect(wrapper.find('.fishd-btn').hasClass('fishd-btn-two-chinese-chars')).toBe(false);
    wrapper.setProps({
      children: <Text>按钮</Text>,
    });
    wrapper.update();
    expect(wrapper.find('.fishd-btn').hasClass('fishd-btn-two-chinese-chars')).toBe(true);
  });

  it('should not insert space to link or text button', () => {
    const wrapper1 = mount(<Button type="link">按钮</Button>);
    expect(wrapper1.text()).toBe('按钮');
    const wrapper2 = mount(<Button type="text">按钮</Button>);
    expect(wrapper2.text()).toBe('按钮');
  });

  it('should warning when pass type=link and ghost=true', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Button type="link" ghost />);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('should warning when pass type=text and ghost=true', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Button type="text" ghost />);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('have static property for type detecting', () => {
    const wrapper = mount(<Button>Button Text</Button>);
    // eslint-disable-next-line
    expect((wrapper.type() as any).__FISHD_BUTTON).toBe(true);
  });

  it('should change loading state instantly by default', () => {
    class DefaultButton extends Component {
      state = {
        loading: false,
      };

      enterLoading = () => {
        this.setState({ loading: true });
      };

      render() {
        const { loading } = this.state;
        return (
          <Button loading={loading} onClick={this.enterLoading}>
            Button
          </Button>
        );
      }
    }
    const wrapper = mount(<DefaultButton />);
    wrapper.simulate('click');
    expect(wrapper.find('.fishd-btn-loading').length).toBe(1);
  });

  it('should change loading state with delay', () => {
    // eslint-disable-next-line
    class DefaultButton extends Component {
      state = {
        loading: false,
      };

      enterLoading = () => {
        this.setState({ loading: { delay: 1000 } });
      };

      render() {
        const { loading } = this.state;
        return (
          <Button loading={loading} onClick={this.enterLoading}>
            Button
          </Button>
        );
      }
    }
    const wrapper = mount(<DefaultButton />);
    wrapper.simulate('click');
    expect(wrapper.hasClass('fishd-btn-loading')).toBe(false);
  });

  it('should support link button', () => {
    const wrapper = mount(
      <Button target="_blank" href="http://163.com">
        link button
      </Button>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('fixbug renders {0} , 0 and {false}', () => {
    const wrapper = render(<Button>{0}</Button>);
    expect(wrapper).toMatchSnapshot();
    const wrapper1 = render(<Button>0</Button>);
    expect(wrapper1).toMatchSnapshot();
    const wrapper2 = render(<Button>{false}</Button>);
    expect(wrapper2).toMatchSnapshot();
  });
});
/* eslint-enable */
