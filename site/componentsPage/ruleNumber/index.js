import React from "react";
import {Row, Col, Divider} from '../../../source/components';
import './style.less';

export default class ruleNumber extends React.Component {

  render() {
    return (
      <div className="rule-number">
        <h1 className="md-heading">Number 数字</h1>
        <p className="md-paragraph">产品中的数字。</p>
        <h2 className="md-heading" id="适用场景">适用场景</h2>
        <p className="md-paragraph">产品内统一使用的数字显示规则。</p>
        <h2 className="md-heading" id="样式">样式</h2>
        <h3 className="md-heading">1.基础样式</h3>
        <Row gutter={20}>
          <Col span={12}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <Row style={{marginBottom: 30}}>
                  <Col span={6}>99</Col>
                  <Col span={18}>188,888</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={6}>99+</Col>
                  <Col span={18}>999+</Col>
                </Row>
                <Row>
                  <Col span={6}>99K</Col>
                  <Col span={18}>9999万</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">基本状态</span></Divider>
              <div className="demo-description">
                <p>A. 正常数字显示直接显示对应数字内容，可自定义是否提供千位分隔符，默认不提供。</p>
                <p>B. 当数字的显示空间，或业务需求没必要展示更多数据内容时，可提供对应数据的上限位数限制，如99+、999+，一般不会提供超过9999+的数字显示上限。</p>
                <p>C. 当数字过大，或无需提供精确数字内容时，可进行位数缩减自定义，如9999万。保留位数与单位均可根据业务自定义。</p>
                <p>D. 当数字位空时，默认提供空数据占位符，表明当前数据为空，与数据为0的情况进行区分。</p>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <Row>
                  <Col span={6}>99%</Col>
                  <Col span={6}>99.9%</Col>
                  <Col span={6}>99.99%</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">百分比数据</span></Divider>
              <div className="demo-description">
                <p>百分比数据可自定义展示精确到小数点后几位，默认精确到小数点后两位。</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
