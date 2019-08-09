import React from "react";
import {Row, Col, Divider} from '../../../source/components';
import './style.less';

export default class ruleDatetime extends React.Component {

  render() {
    return (
      <div className="rule-date-time">
        <h1 className="md-heading">Date Time 日期时间</h1>
        <p className="md-paragraph">产品中的日期时间。</p>
        <h2 className="md-heading" id="适用场景">适用场景</h2>
        <p className="md-paragraph">平台全局使用统一时间显示规则。</p>
        <h2 className="md-heading" id="样式">样式</h2>
        <h3 className="md-heading">1.绝对时间</h3>
        <Row gutter={20}>
          <Col span={12}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <p className="demo-content-title">中文展示</p>
                <Row style={{marginBottom: 30}}>
                  <Col span={12}>2018-08-15</Col>
                  <Col span={12}>YYYY-MM-DD</Col>
                </Row>
                <Row style={{marginBottom: 10}}>
                  <Col span={12}>20180815</Col>
                  <Col span={12}>YYYYMMDD</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">日期</span></Divider>
              <div className="demo-description">
                <p>正常数字显示日期，可自定义是否存在分隔符。</p>
              </div>
            </div>
            <div className="rule-demo-block">
              <div className="demo-content">
                <p className="demo-content-title">中文展示</p>
                <Row style={{marginBottom: 10}}>
                  <Col span={3}>周一</Col>
                  <Col span={3}>周二</Col>
                  <Col span={3}>周三</Col>
                  <Col span={3}>周四</Col>
                  <Col span={3}>周五</Col>
                  <Col span={3}>周六</Col>
                  <Col span={3}>周日</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">星期</span></Divider>
              <div className="demo-description">
                <p>日期显示全部用中文表示。</p>
              </div>
            </div>
          </Col>
          <Col span={12} style={{marginBottom: 20}}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <p className="demo-content-title">中文展示</p>
                <Row style={{marginBottom: 10}}>
                  <Col span={24}>00:00:00</Col>
                </Row>
                <Row style={{marginBottom: 10}}>
                  <Col span={24}>23:59:59</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">时间显示：24小时制度</span></Divider>
              <div className="demo-description">
                <p>24小时制时间显示，数字之间用“ : ”作为分隔。</p>
              </div>
            </div>
            <div className="rule-demo-block">
              <div className="demo-content">
                <p className="demo-content-title">中文展示</p>
                <Row style={{marginBottom: 10}}>
                  <Col span={24}>2018年08月15日</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">日期的文本描述</span></Divider>
              <div className="demo-description">
                <p>日期的文本描述，年月日之间用空格作为分隔。</p>
              </div>
            </div>
            <div className="rule-demo-block">
              <div className="demo-content">
                <Row style={{marginBottom: 10}}>
                  <Col span={3}>1年</Col>
                  <Col span={3}>1月</Col>
                  <Col span={3}>第1周</Col>
                  <Col span={3}>1日</Col>
                  <Col span={3}>1时</Col>
                  <Col span={3}>1分</Col>
                  <Col span={3}>1秒</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">时间点单位</span></Divider>
              <div className="demo-description">
                <p>用于描述时间点的时间单位。</p>
              </div>
            </div>
          </Col>
        </Row>
        <h3 className="md-heading">2.相对时间</h3>
        <Row gutter={20}>
          <Col span={12}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <p className="demo-content-title">中文展示</p>
                <Row style={{marginBottom: 10}}>
                  <Col span={8}>昨天</Col>
                  <Col span={8}>今天</Col>
                  <Col span={8}>明天</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">相对日期</span></Divider>
              <div className="demo-description">
                <p>用于表示相对时间的文本样式。</p>
              </div>
            </div>
            <div className="rule-demo-block">
              <div className="demo-content">
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>今天:</Col>
                  <Col span={8}>时间</Col>
                  <Col span={8}>1:00</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>昨天:</Col>
                  <Col span={8}>昨天+时间</Col>
                  <Col span={8}>昨天 1:00</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>昨天之前的时间显示:</Col>
                  <Col span={8}>月日+时间</Col>
                  <Col span={8}>08-15 1:00</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>今年之前的时间显示:</Col>
                  <Col span={8}>年月日+时间</Col>
                  <Col span={8}>2015-08-15 1:00</Col>
                </Row>
                <Row style={{marginBottom: 10}}>
                  <Col span={8}>秒根据项目需求显示</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">B端产品推荐使用规则</span></Divider>
              <div className="demo-description">
                <p>B端产品常用的推荐使用标准。</p>
              </div>
            </div>
          </Col>
          <Col span={12} style={{marginBottom: 20}}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <p className="demo-content-title">中文展示，以下为实例：（前缀描述）时间长度（后缀描述）</p>
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>1年前</Col>
                  <Col span={8}>近1年</Col>
                  <Col span={8}>1年后</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>1月前</Col>
                  <Col span={8}>近1月</Col>
                  <Col span={8}>1月后</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>1周前</Col>
                  <Col span={8}>近1周</Col>
                  <Col span={8}>1周后</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>1小时前</Col>
                  <Col span={8}>近1小时</Col>
                  <Col span={8}>1小时后</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>1分钟前</Col>
                  <Col span={8}>近1分钟</Col>
                  <Col span={8}>1分钟后</Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                  <Col span={8}>1秒前</Col>
                  <Col span={8}>近1秒</Col>
                  <Col span={8}>1秒后</Col>
                </Row>
              </div>
              <Divider orientation={'left'}><span className="divider-title">相对时间</span></Divider>
              <div className="demo-description">
                <p>用于表示相对时间长度的文本样式。</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
