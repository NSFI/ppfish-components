import 'babel-polyfill';
import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

Enzyme.configure({ adapter: new Adapter() });

import Avatar from '../index';

describe('<Avatar />', () => {

  const defaultImage = require('../default-avatar.jpg');
  let props;
  beforeEach(() => {
    props = {
      headpic: defaultImage,
      roleFlag: 0,
      extraCls: 'myDIYStates'
    };
    document.body.innerHTML = '<div id="react-content"></div>';
  });

  //表现
  test('props能够被正确渲染', () => {
    const wrapper = render(
      <Avatar {...props} >
        <div id="child">custome</div>
      </Avatar>
    );
    expect(wrapper.hasClass(props.extraCls));
    expect(wrapper.children().first().attr('src')).toContain(props.headpic);
    expect(wrapper.find('#child').text()).toBe('custome');
    expect(wrapper.find('i.iconfont').length).toBeGreaterThanOrEqual(1);
  });

  //表现
  test('roleFlag', () => {

    let wrapper = render(
      <Avatar roleFlag={0} />
    );

    let rank = wrapper.children().eq(1);
    expect(rank.hasClass('iconfont')).toBeTruthy();
    expect(rank.hasClass('m-avatar-main')).toBeFalsy();

    wrapper = render(
      <Avatar roleFlag={1} />
    );

    rank = wrapper.children().eq(1);
    expect(rank.hasClass('iconfont')).toBeTruthy();
    expect(rank.hasClass('m-avatar-main')).toBeTruthy();

  });


});
