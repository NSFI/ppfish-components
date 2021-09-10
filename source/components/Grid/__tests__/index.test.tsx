import { mount } from 'enzyme';
import React from 'react';
import { Row, Col } from '..';

describe('Grid', () => {
  it('Row should render', () => {
    const wrapper = mount(<Row />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Col should render', () => {
    const wrapper = mount(<Col span={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  // it('when typeof gutter is object', () => {
  //   const wrapper = mount(<Row gutter={{ xs: 8, sm: 16, md: 24 }} />);
  //   expect(wrapper.find('div').first().props().style).toEqual(
  //     expect.objectContaining({
  //       marginLeft: -12,
  //       marginRight: -12,
  //     }),
  //   );
  // });

  it('Row wrapped Col should render', () => {
    const wrapper = mount(
      <Row>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('when type is flex should render', () => {
    const wrapper = mount(
      <Row type="flex">
        <Col span={12}>1</Col>
        <Col span={12}>2</Col>
      </Row>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('when order is set should render correct', () => {
    const wrapper = mount(
      <Row type="flex">
        <Col span={6} order={4}>
          1 col-order-4
        </Col>
        <Col span={6} order={3}>
          2 col-order-3
        </Col>
        <Col span={6} order={2}>
          3 col-order-2
        </Col>
        <Col span={6} order={1}>
          4 col-order-1
        </Col>
      </Row>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
