import React from 'react';
import { mount } from 'enzyme';
import List from '../index.tsx';

const ListItem = List.Item;

describe('List', () => {
  it('locale not passed to internal div', async () => {
    const renderItem = item => <ListItem>{item}</ListItem>;
    const dataSource = [];

    const wrapper = mount(
      <List renderItem={renderItem} dataSource={dataSource} Locale={{ emptyText: '暂无数据' }} />
    );
    expect(wrapper.find('div').first().props().locale).toBe(undefined);
  });
});
