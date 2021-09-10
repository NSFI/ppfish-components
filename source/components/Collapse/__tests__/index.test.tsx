import * as React from 'react';
import { mount } from 'enzyme';
import Collapse from '../index';

describe('Collapse', () => {

  it('should expand and collapse', async () => {
    const onChange = jest.fn();
    const wrapper = mount(<Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Collapse.Panel header="This is panel header 1" key="1">
        <p>panel1</p>
      </Collapse.Panel>
      <Collapse.Panel header="This is panel header 2" key="2">
        <p>panel2</p>
      </Collapse.Panel>
      <Collapse.Panel header="This is panel header 3" key="3" disabled>
        <p>panel3</p>
      </Collapse.Panel>
    </Collapse>);

    // Init
    expect(wrapper.find('.fishd-collapse-item').at(0).hasClass('fishd-collapse-item-active')).toBe(true);
    expect(onChange).toBeCalledTimes(0);

    // Click
    wrapper.find('.fishd-collapse-item .fishd-collapse-header').at(1).simulate('click');
    wrapper.update();

    // Update
    expect(wrapper.find('.fishd-collapse-item').at(1).hasClass('fishd-collapse-item-active')).toBe(true);
    expect(onChange).toBeCalledTimes(1);
  });


  it('accordion mode should expand and collapse', async () => {
    const onChange = jest.fn();
    const wrapper = mount(<Collapse accordion onChange={onChange}>
      <Collapse.Panel header="This is panel header 1" key="1">
        <p>panel1</p>
      </Collapse.Panel>
      <Collapse.Panel header="This is panel header 2" key="2">
        <p>panel2</p>
      </Collapse.Panel>
      <Collapse.Panel header="This is panel header 3" key="3">
        <p>panel3</p>
      </Collapse.Panel>
    </Collapse>);


    function validUI(index: number) {
      wrapper.find('.fishd-collapse-item .fishd-collapse-header').at(index).simulate('click');
      const panelItems = wrapper.find('.fishd-collapse-item');
      const length = panelItems.length;
      expect(panelItems.at(index).hasClass('fishd-collapse-item-active')).toBe(true);
      expect(panelItems.filterWhere((panelItem) => !panelItem.hasClass('fishd-collapse-item-active')).length).toBe(length - 1);
    }

    // Click first panel
    validUI(0);
    expect(onChange).toBeCalledTimes(1);

    // click third panel
    validUI(2);
    expect(onChange).toBeCalledTimes(2);

    // click second panel
    validUI(1);
    expect(onChange).toBeCalledTimes(3);
  });


  it('could be close panel', () => {
    const onClose = jest.fn();
    function CollapseDemo() {
      const [statusList, setStatusList] = React.useState([true, true, true]);

      const handleClose = (list: boolean[]) => {
        setStatusList([...list]);
        onClose(list);
      }

      return <Collapse showClose statusList={statusList} close={handleClose}>
        <Collapse.Panel header="This is panel header 1" key="1">
          <p>panel1</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 2" key="2">
          <p>panel2</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 3" key="3">
          <p>panel3</p>
        </Collapse.Panel>
      </Collapse>
    }

    const wrapper = mount(<CollapseDemo />);
    wrapper.find('.z-close-show').at(0).simulate('click');
    wrapper.update();

    expect(onClose).toBeCalled();
    expect(wrapper.find('.fishd-collapse-item').length).toBe(2);

  })
});
