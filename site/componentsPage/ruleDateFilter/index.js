import React from "react";
import {Row, Col} from '../../../source/components';
import './style.less';

export default class ruleDateFilter extends React.Component {

  render() {
    return (
      <div className="rule-date-filter">
        <h1 className="md-heading">Date Filter 日期筛选</h1>
        <p className="md-paragraph">产品中的日期筛选。</p>
        <h2 className="md-heading" id="适用场景">适用场景</h2>
        <p className="md-paragraph">平台全局使用统一日期筛选规则。</p>
        <h2 className="md-heading" id="样式">样式</h2>
        <h3 className="md-heading">1.筛选一天</h3>
        <Row gutter={20}>
          <Col span={20}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <p className="demo-content-title">中文展示</p>
                <Row style={{marginBottom: 30}}>
                  <Col span={12}>昨天</Col>
                  <Col span={12}>昨天 00:00:00 至 23:59:59</Col>
                </Row>
                <Row style={{marginBottom: 10}}>
                  <Col span={12}>今天</Col>
                  <Col span={12}>今天 00:00:00 至此时此刻</Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        <h3 className="md-heading">2.筛选一周</h3>
        <Row gutter={20}>
          <Col span={20}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <p className="demo-content-title">中文展示</p>
                <Row style={{marginBottom: 30}}>
                  <Col span={12}>本周</Col>
                  <Col span={12}>本自然周开始至今天</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={12}>上周</Col>
                  <Col span={12}>上个自然周</Col>
                </Row>
                <Row style={{marginBottom: 10}}>
                  <Col span={12}>过去 7 天</Col>
                  <Col span={12}>从昨天开始往前推 7 天</Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        <h3 className="md-heading">3.筛选一月</h3>
        <Row gutter={20}>
          <Col span={20}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <p className="demo-content-title">中文展示</p>
                <Row style={{marginBottom: 30}}>
                  <Col span={12}>本月</Col>
                  <Col span={12}>从今天开始往前推至本月 1 号</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={12}>上月</Col>
                  <Col span={12}>上个自然月</Col>
                </Row>
                <Row style={{marginBottom: 10}}>
                  <Col span={12}>过去 30 天</Col>
                  <Col span={12}>从昨天开始往前推 30 天</Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
