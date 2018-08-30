import React from 'react';
import { mount } from 'enzyme';
import Drawer from '../index.tsx';
import Button from '../../Button/index.tsx';

class DrawerEventTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    this.setState({ visible: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  open = () => {
    this.setState({
      visible: true,
    });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.open}>open</Button>
        <Drawer
          visible={visible}
          onClose={this.onClose}
          getContainer={false}
          {...this.props}
        >
          Here is content of Drawer
        </Drawer>
      </div>
    );
  }
}


describe('Drawer', () => {
  it('render correctly', () => {
    const wrapper = mount(<DrawerEventTester />);
    const body = wrapper.find('.fishd-drawer-body').exists();

    expect(body).toBe(true);
    wrapper.find('button.fishd-btn').simulate('click');

    const content = wrapper.find('.fishd-drawer-body').getDOMNode().innerHTML;
    expect(content).toBe('Here is content of Drawer');

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('mask trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester />);

    wrapper.find('button.fishd-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.fishd-drawer-mask').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });

  it('close button trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester />);

    wrapper.find('button.fishd-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.fishd-drawer-close').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });

  it('maskClosable no trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester maskClosable={false} />);

    wrapper.find('button.fishd-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.fishd-drawer-mask').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);
  });

  it('destroyOnClose is true onClose', () => {
    const wrapper = mount(<DrawerEventTester destroyOnClose />);
    wrapper.find('button.fishd-btn').simulate('click');
    expect(wrapper.find('.fishd-drawer-wrapper-body').exists()).toBe(true);

    wrapper.setState({
      visible: false,
    });
    wrapper.find('.fishd-drawer-wrapper-body').simulate('transitionend');
    expect(wrapper.find('.fishd-drawer-wrapper-body').exists()).toBe(false);
  });

  it('no mask and no closable', () => {
    const wrapper = mount(<DrawerEventTester destroyOnClose />);

    wrapper.find('button.fishd-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.fishd-drawer-close').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });
});
