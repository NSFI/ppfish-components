import React from 'react';
import { render } from 'enzyme';
import List from '../index';

describe('List', () => {
  it('renders empty list', () => {
    const wrapper = render(<List dataSource={[]} renderItem={() => <List.Item />} />);
    expect(wrapper).toMatchSnapshot();
  });
});
