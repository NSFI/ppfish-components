import 'babel-polyfill';
import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

Enzyme.configure({ adapter: new Adapter() });

import AnimationImageLoader from '../index';


jest.useFakeTimers();


describe('<AnimationImageLoader />', () => {
  const defaultImage = '';

  let props;
  beforeEach(() => {
    props = {
      src: defaultImage,
      zoom: 0.5,
      extraCls: 'myDIYStates'
    };
    document.body.innerHTML = '<div id="react-content"></div>';

  });

  //表现
  test('props能够被正确渲染', () => {
    const wrapper = render(
      <AnimationImageLoader {...props} />,
      {
        attachTo: document.getElementById('react-content'),
      });
    expect(wrapper.hasClass(props.extraCls));
    expect(wrapper.attr('style')).toContain(props.src);
  });

  //交互
  test('鼠标移入移出，播放状态改变', () => {
    const wrapper = mount(
      <AnimationImageLoader {...props} />,
      {
        attachTo: document.getElementById('react-content'),
      });


    wrapper.simulate('mouseenter');
    jest.runAllTimers();
    let state = wrapper.state();
    expect(state.stage).toBe(1);


    wrapper.simulate('mouseleave');
    jest.runAllTimers();
    state = wrapper.state();
    expect(state.stage).toBe(0);


  });

  //TODO 未覆盖播放图片的循环逻辑


});
