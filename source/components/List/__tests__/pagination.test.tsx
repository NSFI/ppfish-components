import React from 'react';
import {render, mount} from 'enzyme';
import List from '../index';

describe('List.pagination', () => {
  const data = [
    {key: 0, name: 'Jack'},
    {key: 1, name: 'Lucy'},
    {key: 2, name: 'Tom'},
    {key: 3, name: 'Jerry'},
  ];

  const pagination = {className: 'my-page', pageSize: 2};

  function createList(props) {
    return (
      <List
        itemLayout="vertical"
        pagination={pagination}
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.key}>
            {item.name}
          </List.Item>
        )}
        {...props}
      />
    );
  }

  function renderedNames(wrapper) {
    return wrapper.find('.fishd-list-item-content').map(row => row.text());
  }

  it('renders pagination correctly', () => {
    const wrapper = render(createList({}));
    expect(wrapper).toMatchSnapshot();
  });

  it('should not show pager if pagination.hideOnSinglePage is true and only 1 page', () => {
    const wrapper = mount(
      createList({pagination: {pageSize: 3, hideOnSinglePage: true}})
    );
    expect(wrapper.find('.fishd-pagination')).toHaveLength(1);
    wrapper.setProps({pagination: {pageSize: 3, hideOnSinglePage: false}});
    expect(wrapper.find('.fishd-pagination')).toHaveLength(1);
    wrapper.setProps({pagination: {pageSize: 4, hideOnSinglePage: true}});
    expect(wrapper.find('.fishd-pagination')).toHaveLength(0);
    wrapper.setProps({pagination: {pageSize: 4, hideOnSinglePage: false}});
    expect(wrapper.find('.fishd-pagination')).toHaveLength(1);
    wrapper.setProps({pagination: {pageSize: 5, hideOnSinglePage: true}});
    expect(wrapper.find('.fishd-pagination')).toHaveLength(0);
    wrapper.setProps({pagination: {pageSize: 5, hideOnSinglePage: false}});
    expect(wrapper.find('.fishd-pagination')).toHaveLength(1);
  });

  it('paginate data', () => {
    const wrapper = mount(createList({}));

    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy']);
    wrapper
      .find('Pager')
      .last()
      .simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
  });

  it('repaginates when pageSize change', () => {
    const wrapper = mount(createList({}));

    wrapper.setProps({pagination: {pageSize: 1}});
    expect(renderedNames(wrapper)).toEqual(['Jack']);
  });

  it('fires change event', () => {
    const handlePaginationChange = jest.fn();
    const noop = () => {
    };
    const wrapper = mount(
      createList({
        pagination: {
          ...pagination,
          onChange: handlePaginationChange,
          onShowSizeChange: noop,
        },
      })
    );

    wrapper
      .find('Pager')
      .last()
      .simulate('click');

    expect(handlePaginationChange).toBeCalledWith(2, 2);
  });

  // https://codepen.io/afc163/pen/pWVRJV?editors=001
  it('should display pagination as prop pagination change between true and false', () => {
    const wrapper = mount(createList({}));
    expect(wrapper.find('.fishd-pagination')).toHaveLength(1);
    expect(wrapper.find('.fishd-pagination-item')).toHaveLength(2);
    wrapper.setProps({pagination: false});
    expect(wrapper.find('.fishd-pagination')).toHaveLength(0);
    wrapper.setProps({pagination});
    wrapper.update();
    expect(wrapper.find('.fishd-pagination')).toHaveLength(1);
    expect(wrapper.find('.fishd-pagination-item')).toHaveLength(2);
    wrapper.find('.fishd-pagination-item-2').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Tom', 'Jerry']);
    wrapper.setProps({pagination: false});
    expect(wrapper.find('.fishd-pagination')).toHaveLength(0);
    wrapper.setProps({pagination: true});
    expect(wrapper.find('.fishd-pagination')).toHaveLength(1);
    expect(wrapper.find('.fishd-pagination-item')).toHaveLength(1); // pageSize will be 10
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
  });

  it('change to correct page when data source changes', () => {
    const wrapper = mount(createList({pagination: {pageSize: 1}}));
    wrapper.find('.fishd-pagination-item-3').simulate('click');
    wrapper.setProps({dataSource: [data[0]]});
    expect(
      wrapper
        .find('.fishd-pagination-item-1')
        .hasClass('fishd-pagination-item-active')
    ).toBe(true);
  });

  it('specify the position of pagination', () => {
    const wrapper = mount(createList({pagination: {position: 'top'}}));
    expect(wrapper.find('.fishd-list').childAt(0).find('.fishd-pagination')).toHaveLength(1);
    wrapper.setProps({pagination: {position: 'bottom'}});
    expect(wrapper.find('.fishd-list').children().last().find('.fishd-pagination')).toHaveLength(1);
    wrapper.setProps({pagination: {position: 'both'}});
    expect(wrapper.find('.fishd-pagination')).toHaveLength(2);
    expect(wrapper.find('.fishd-list').childAt(0).find('.fishd-pagination')).toHaveLength(1);
    expect(wrapper.find('.fishd-list').children().last().find('.fishd-pagination')).toHaveLength(1);
  });
});
