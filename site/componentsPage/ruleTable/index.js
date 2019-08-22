import React from "react";
import {Row, Col, Divider} from '../../../source/components';
import './style.less';

export default class ruleTable extends React.Component {

  render() {
    return (
      <div className="rule-table">
        <h1 className="md-heading">Table 表格</h1>
        <p className="md-paragraph">产品中的表格展示。</p>
        <h2 className="md-heading" id="适用场景">适用场景</h2>
        <p className="md-paragraph">平台全局使用统一表格显示规则。</p>
        <h2 className="md-heading" id="样式">样式</h2>
        <h3 className="md-heading">1.表格页面布局</h3>
        <Row gutter={24}>
          <Col span={24}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <ul>
                  <li class="md-listitem">
                    <p class="md-paragraph"><strong>字段内容</strong></p>
                    <p class="md-paragraph">1) 字段按照比例进行展示，展示不全时在末尾加“...”，hover时有 tooltip 补全字段的内容。</p>
                    <p class="md-paragraph">2) 为空时展示“--”。</p>
                    <p class="md-paragraph">3) 内容均与标题左对齐展示。</p>
                  </li>
                  <li class="md-listitem">
                    <p class="md-paragraph"><strong>表格操作项，固定表尾展示（如编辑、删除、启停等）</strong></p>
                  </li>
                  <li class="md-listitem">
                    <p class="md-paragraph"><strong>表格字段自定义设置，固定表尾展示</strong></p>
                  </li>
                  <li class="md-listitem">
                    <p class="md-paragraph"><strong>对表格内容有全列表选中或有上限提示时，使用header模块</strong></p>
                  </li>
                  <li class="md-listitem">
                    <p class="md-paragraph"><strong>对列表内容有总计或汇总时，使用footer模块</strong></p>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <h3 className="md-heading">2.针对表格内容的筛选项</h3>
        <Row gutter={24}>
          <Col span={24}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <ul>
                  <li class="md-listitem">
                    <p class="md-paragraph"><strong>筛选项</strong></p>
                    <p class="md-paragraph">1) 超过 3 个时折叠展示，点击展开收起浮层。</p>
                    <p class="md-paragraph">2) 少于等于 3 个时放出展示。</p>
                  </li>
                  <li class="md-listitem">
                    <p class="md-paragraph"><strong>表头筛选</strong></p>
                    <p class="md-paragraph">轻量级筛选项以及无需后端加载的筛选项，可放在表头。（典型表头操作如：数量排序、A-Z排序、数据项在 10 个或以内的多选或单选筛选）</p>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <h3 className="md-heading">3.分页</h3>
        <Row gutter={24}>
          <Col span={24}>
            <div className="rule-demo-block">
              <div className="demo-content">
                <ul>
                  <li class="md-listitem">
                    <p class="md-paragraph"><strong>分页数一般采取每页展示 50 条</strong></p>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
