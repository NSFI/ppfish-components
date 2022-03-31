import React, { useContext } from 'react';
import { mount } from 'enzyme';
import Anchor from '../index';
import context from '../context';

const { Link } = Anchor;

describe('Anchor Render', () => {
  it('Anchor render perfectly', () => {
    const wrapper = mount(
      <Anchor>
        <Link href="#API" title="API" />
      </Anchor>,
    );

    expect(wrapper.find('a').getDOMNode().className).toBe('fishd-anchor-link-title');
  });

  it('Anchor render perfectly for complete href - click', () => {
    const wrapper = mount(
      <Anchor>
        <Link href="http://www.example.com/#API" title="API" />
      </Anchor>,
    );
    wrapper.find('a').simulate('click');
    expect(wrapper.find('a').getDOMNode().className).toContain('fishd-anchor-link-title-active');
  });

  it('Anchor render perfectly for complete href - scroll', () => {
    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'root';
      document.body.appendChild(root);
    }
    mount(<div id="API">Hello</div>, { attachTo: root });
    const wrapper = mount(
      <Anchor>
        <Link href="http://www.example.com/#API" title="API" />
      </Anchor>,
    );
    expect(wrapper.find('a').getDOMNode().className).toContain('fishd-anchor-link-title-active');
  });

  it('Anchor render perfectly for complete href - scrollTo', async () => {

    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'root';
      document.body.appendChild(root);
    }
    mount(<div id="API">Hello</div>, { attachTo: root });
    const HelperWrapper = () => {
      const { scrollTo } = useContext(context);

      React.useLayoutEffect(() => {
        scrollTo('##API');
      }, []);
      return null;
    };
    const wrapper = mount(
      <Anchor>
        <HelperWrapper />
        <Link href="##API" title="API" />
      </Anchor>,
    );

    expect(wrapper.find('a').getDOMNode().className).toContain('fishd-anchor-link-title-active');
    expect(scrollToSpy).not.toHaveBeenCalled();
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it('should remove listener when unmount', async () => {
    const wrapper = mount(
      <Anchor>
        <Link href="#API" title="API" />
      </Anchor>,
    );
    const a = window;
    const removeListenerSpy = jest.spyOn(window, 'removeEventListener');
    wrapper.unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  // 暂无相应变通用例
  // it('should unregister link when unmount children', async () => {
  //   const wrapper = mount(
  //     <Anchor>
  //       <Link href="#API" title="API" />
  //     </Anchor>,
  //   );
  //   expect(wrapper.instance().links).toEqual(['#API']);
  //   wrapper.setProps({ children: null });
  //   expect(wrapper.instance().links).toEqual([]);
  // });

  // 暂无相应变通用例
  // it('should update links when link href update', async () => {
  //   let anchorInstance = null;
  //   function AnchorUpdate({ href }) {
  //     return (
  //       <Anchor
  //         ref={c => {
  //           anchorInstance = c;
  //         }}
  //       >
  //         <Link href={href} title="API" />
  //       </Anchor>
  //     );
  //   }
  //   const wrapper = mount(<AnchorUpdate href="#API" />);

  //   expect(anchorInstance.links).toEqual(['#API']);
  //   wrapper.setProps({ href: '#API_1' });
  //   expect(anchorInstance.links).toEqual(['#API_1']);
  // });

  it('Anchor onClick event', () => {
    let event;
    let link;
    const handleClick = (...arg) => ([event, link] = arg);

    const href = '#API';
    const title = 'API';

    const wrapper = mount(
      <Anchor onClick={handleClick}>
        <Link href={href} title={title} />
      </Anchor>,
    );

    wrapper.find(`a`).simulate('click');

    expect(event).not.toBe(undefined);
    expect(link).toEqual({ href, title });
  });
});
