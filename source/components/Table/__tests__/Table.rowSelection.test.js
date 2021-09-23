import React from 'react';
import { mount, render } from 'enzyme';
import Table from '../index.tsx';
import Checkbox from '../../Checkbox/index.tsx';

describe('Table.rowSelection', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
  ];

  const data = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  function createTable(props = {}) {
    return <Table columns={columns} dataSource={data} rowSelection={{}} {...props} />;
  }

  function renderedNames(wrapper) {
    return wrapper.find('TableRow').map(row => row.props().record.name);
  }

  it('select by checkbox', () => {
    const wrapper = mount(createTable());
    const checkboxes = wrapper.find('input');
    const checkboxAll = checkboxes.first();

    checkboxAll.simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [0, 1, 2, 3],
      selectionDirty: true,
    });

    checkboxes.at(1).simulate('change', { target: { checked: false } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [1, 2, 3],
      selectionDirty: true,
    });

    checkboxes.at(1).simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [1, 2, 3, 0],
      selectionDirty: true,
    });
  });

  it('select by radio', () => {
    const wrapper = mount(createTable({ rowSelection: { type: 'radio' } }));
    const radios = wrapper.find('input');

    expect(radios.length).toBe(4);

    radios.first().simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [0],
      selectionDirty: true,
    });

    radios.last().simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [3],
      selectionDirty: true,
    });
  });

  it('pass getCheckboxProps to checkbox', () => {
    const rowSelection = {
      getCheckboxProps: record => ({
        disabled: record.name === 'Lucy',
        name: record.name,
      }),
    };

    const wrapper = mount(createTable({ rowSelection }));
    const checkboxes = wrapper.find('input');

    expect(checkboxes.at(1).props().disabled).toBe(false);
    expect(checkboxes.at(1).props().name).toEqual(data[0].name);
    expect(checkboxes.at(2).props().disabled).toBe(true);
    expect(checkboxes.at(2).props().name).toEqual(data[1].name);
  });

  it('works with pagination', () => {
    const wrapper = mount(createTable({ pagination: { pageSize: 2 } }));

    const checkboxAll = wrapper.find('SelectionCheckboxAll');
    const pagers = wrapper.find('Pager');

    checkboxAll.find('input').simulate('change', { target: { checked: true } });
    expect(checkboxAll.instance().state).toEqual({ checked: true, indeterminate: false });

    pagers.at(1).simulate('click');
    expect(checkboxAll.instance().state).toEqual({ checked: false, indeterminate: false });

    pagers.at(0).simulate('click');
    expect(checkboxAll.instance().state).toEqual({ checked: true, indeterminate: false });
  });

  // https://github.com/ant-design/ant-design/issues/4020
  it('handles defaultChecked', () => {
    const rowSelection = {
      getCheckboxProps: record => ({
        defaultChecked: record.key === 0,
      }),
    };

    const wrapper = mount(createTable({ rowSelection }));

    let checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().checked).toBe(true);
    expect(checkboxs.at(2).props().checked).toBe(false);

    checkboxs.at(2).simulate('change', { target: { checked: true } });
    checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().checked).toBe(true);
    expect(checkboxs.at(2).props().checked).toBe(true);
  });

  it('can be controlled', () => {
    const wrapper = mount(createTable({ rowSelection: { selectedRowKeys: [0] } }));

    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [0],
      selectionDirty: false,
    });

    wrapper.setProps({ rowSelection: { selectedRowKeys: [1] } });

    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [1],
      selectionDirty: false,
    });
  });

  it('fires change & select events', () => {
    const handleChange = jest.fn();
    const handleSelect = jest.fn();
    const rowSelection = {
      onChange: handleChange,
      onSelect: handleSelect,
    };
    const wrapper = mount(createTable({ rowSelection }));

    wrapper
      .find('input')
      .last()
      .simulate('change', { target: { checked: true } });

    expect(handleChange).toBeCalledWith([3], [{ key: 3, name: 'Jerry' }]);
    expect(handleSelect.mock.calls.length).toBe(1);
    expect(handleSelect.mock.calls[0][0]).toEqual({ key: 3, name: 'Jerry' });
    expect(handleSelect.mock.calls[0][1]).toEqual(true);
    expect(handleSelect.mock.calls[0][2]).toEqual([{ key: 3, name: 'Jerry' }]);
    expect(handleSelect.mock.calls[0][3].type).toBe('change');
  });

  it('fires selectAll event', () => {
    const handleSelectAll = jest.fn();
    const rowSelection = {
      onSelectAll: handleSelectAll,
    };
    const wrapper = mount(createTable({ rowSelection }));

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { checked: true } });
    expect(handleSelectAll).toBeCalledWith(true, data, data);

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { checked: false } });
    expect(handleSelectAll).toBeCalledWith(false, [], data);
  });

  it('render with default selection correctly', () => {
    const rowSelection = {
      selections: true,
    };
    const wrapper = render(createTable({ rowSelection }));
    expect(wrapper).toMatchSnapshot();
  });

  it('click select all selection', () => {
    // jest.useFakeTimers();
    const handleSelectAll = jest.fn();
    const rowSelection = {
      onSelectAll: handleSelectAll,
      selections: true,
    };
    const wrapper = mount(createTable({ rowSelection }));

    // Open
    wrapper.find('.fishd-table-selection-down').simulate('mouseEnter');

    jest.runAllTimers();
    wrapper.update();

    wrapper.find('.fishd-dropdown-menu-item div').first().simulate('click');

    expect(handleSelectAll).toBeCalledWith(true, data, data);
  });

  it('fires selectInvert event', () => {
    // jest.useFakeTimers();
    const handleSelectInvert = jest.fn();
    const rowSelection = {
      onSelectInvert: handleSelectInvert,
      selections: true,
    };
    const wrapper = mount(createTable({ rowSelection }));
    const checkboxes = wrapper.find('input');

    checkboxes.at(1).simulate('change', { target: { checked: true } });

    // Open
    wrapper.find('.fishd-table-selection-down').simulate('mouseEnter');

    jest.runAllTimers();
    wrapper.update();

    wrapper.find('.fishd-dropdown-menu-item div').last().simulate('click');

    expect(handleSelectInvert).toBeCalledWith([1, 2, 3]);
  });

  it('fires selection event', () => {
    // jest.useFakeTimers();
    const handleSelectOdd = jest.fn();
    const handleSelectEven = jest.fn();
    const rowSelection = {
      selections: [
        {
          key: 'odd',
          text: '奇数项',
          onSelect: handleSelectOdd,
        },
        {
          key: 'even',
          text: '偶数项',
          onSelect: handleSelectEven,
        },
      ],
    };
    const wrapper = mount(createTable({ rowSelection }));

    // Open
    wrapper.find('.fishd-table-selection-down').simulate('mouseEnter');

    jest.runAllTimers();
    wrapper.update();

    // const dropdownWrapper = mount(wrapper.find('Trigger').first().instance().getComponent());
    expect(wrapper.find('.fishd-dropdown-menu-item').hostNodes().length).toBe(4);

    wrapper.find('.fishd-dropdown-menu-item').hostNodes().at(2).find('div').simulate('click');
    expect(handleSelectOdd).toBeCalledWith([0, 1, 2, 3]);

    wrapper.find('.fishd-dropdown-menu-item').hostNodes().at(3).find('div').simulate('click');
    expect(handleSelectEven).toBeCalledWith([0, 1, 2, 3]);
  });

  it('could hide default selection options', () => {
    // jest.useFakeTimers();
    const rowSelection = {
      hideDefaultSelections: true,
      selections: [
        {
          key: 'odd',
          text: '奇数项',
        },
        {
          key: 'even',
          text: '偶数项',
        },
      ],
    };
    const wrapper = mount(createTable({ rowSelection }));
    // Open
    wrapper.find('.fishd-table-selection-down').simulate('mouseEnter');

    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.fishd-dropdown-menu-item').hostNodes().length).toBe(2);
  });

  it('handle custom selection onSelect correctly when hide default selection options', () => {
    // jest.useFakeTimers();
    const handleSelectOdd = jest.fn();
    const handleSelectEven = jest.fn();
    const rowSelection = {
      hideDefaultSelections: true,
      selections: [
        {
          key: 'odd',
          text: '奇数项',
          onSelect: handleSelectOdd,
        },
        {
          key: 'even',
          text: '偶数项',
          onSelect: handleSelectEven,
        },
      ],
    };
    const wrapper = mount(createTable({ rowSelection }));

    // Open
    wrapper.find('.fishd-table-selection-down').simulate('mouseEnter');

    jest.runAllTimers();
    wrapper.update();

    wrapper.find('.fishd-dropdown-menu-item div').at(0).simulate('click');
    expect(handleSelectOdd).toBeCalledWith([0, 1, 2, 3]);

    wrapper.find('.fishd-dropdown-menu-item div').at(1).simulate('click');
    expect(handleSelectEven).toBeCalledWith([0, 1, 2, 3]);
  });

  // https://github.com/ant-design/ant-design/issues/4245
  it('handles disabled checkbox correctly when dataSource changes', () => {
    const rowSelection = {
      getCheckboxProps: record => ({ disabled: record.disabled }),
    };
    const wrapper = mount(createTable({ rowSelection }));
    const newData = [
      { key: 0, name: 'Jack', disabled: true },
      { key: 1, name: 'Lucy', disabled: true },
    ];
    wrapper.setProps({ dataSource: newData });
    wrapper.find('input').forEach(checkbox => {
      expect(checkbox.props().disabled).toBe(true);
    });
  });

  // https://github.com/ant-design/ant-design/issues/4245
  it('should allow dynamic getCheckboxProps', () => {
    class App extends React.Component {
      state = {
        disableName: 'Jack',
      };

      render() {
        const { disableName } = this.state;
        return (
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={{
              getCheckboxProps: record => ({ disabled: record.name === disableName }),
            }}
          />
        );
      }
    }

    const wrapper = mount(<App />);
    let checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().disabled).toBe(true);
    expect(checkboxs.at(2).props().disabled).toBe(false);
    wrapper.setState({ disableName: 'Lucy' });
    checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().disabled).toBe(false);
    expect(checkboxs.at(2).props().disabled).toBe(true);
  });

  // https://github.com/ant-design/ant-design/issues/4779
  it('should not switch pagination when select record', () => {
    const newData = [];
    for (let i = 0; i < 20; i += 1) {
      newData.push({
        key: i.toString(),
        name: i.toString(),
      });
    }
    const wrapper = mount(
      createTable({
        rowSelection: {},
        dataSource: newData,
      }),
    );
    wrapper.find('Pager').last().simulate('click'); // switch to second page
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(renderedNames(wrapper)).toEqual([
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
    ]);
  });

  it('highlight selected row', () => {
    const wrapper = mount(createTable());
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('tbody tr').at(0).hasClass('fishd-table-row-selected')).toBe(true);
  });

  it('fix selection column on the left', () => {
    const wrapper = render(
      createTable({
        rowSelection: { fixed: true },
      }),
    );

    expect(wrapper).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/10629
  it('should keep all checked state when remove item from dataSource', () => {
    const wrapper = mount(
      <Table
        rowSelection={{
          selectedRowKeys: [0, 1, 2, 3],
        }}
        columns={columns}
        dataSource={data}
      />,
    );
    expect(wrapper.find(Checkbox).length).toBe(5);
    wrapper.find(Checkbox).forEach(checkbox => {
      expect(checkbox.props().checked).toBe(true);
      expect(checkbox.props().indeterminate).toBe(false);
    });
    wrapper.setProps({
      dataSource: data.slice(1),
      rowSelection: {
        selectedRowKeys: [1, 2, 3],
      },
    });
    expect(wrapper.find(Checkbox).length).toBe(4);
    wrapper.find(Checkbox).forEach(checkbox => {
      expect(checkbox.props().checked).toBe(true);
      expect(checkbox.props().indeterminate).toBe(false);
    });
  });
});
