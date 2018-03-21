import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';
import {Button, Pagination, Radio, Checkbox,Select} from 'antd';
import {PAGE_SIZE} from '../../constants';
import './index.less';
import SearchInput from '../SearchInput';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

class UIcomponent extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
    };
  }

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    return (
      <div className="ui-container">
        <h2>前端视觉及UI控件规范</h2>
        <h3>Color 颜色</h3>

        <div className="block">
          <div className="title">主色</div>
          <div className="subtitle">七鱼主要品牌颜色是鲜艳、耀眼的蓝色。</div>
          <ul className="color-block">
            <li className="primary-color">
              <div>Blue</div>
              #4D6AFF
            </li>
          </ul>
        </div>

        <div className="block">
          <div className="title">辅助色</div>
          <div className="subtitle">除了主色外的场景色，需要在不同的场景中使用（例如警告色表示警告的操作）。</div>
          <ul className="color-block">
            <li className="assistant-red">
              <div>Red</div>
              #FF3356
            </li>
            <li className="assistant-green">
              <div>Green</div>
              #26BD71
            </li>
            <li className="assistant-yellow">
              <div>Yellow</div>
              #FFAF0F
            </li>
          </ul>
        </div>

        <div className="block">
          <div className="title">文字色</div>
          <div className="subtitle">中性色用于文本、背景和边框颜色，用来表现层次结构。</div>
          <ul className="color-block">
            <li className="text-3">
              <div>#3 Black</div>
              #333333
            </li>
            <li className="text-6">
              <div>#6 Black</div>
              #666666
            </li>
            <li className="text-9">
              <div>#9 Black</div>
              #999999
            </li>
            <li className="text-c">
              <div>#C Black</div>
              #CCCCCC
            </li>
            <li className="text-d">
              <div>#D Black</div>
              #DDDDDD
            </li>
            <li className="text-e">
              <div>#E Black</div>
              #EEEEEE
            </li>
          </ul>
        </div>

        <h3>Typography 字体</h3>
        <div className="block">
          <div className="title">中文字体</div>
          <ul className="font-block">
            <li>
              <div className="name">苹方</div>
              <div className="subname">PingFang SC</div>
            </li>
            <li>
              <div className="name">微软雅黑</div>
              <div className="subname">Microsoft YaHei</div>
            </li>
          </ul>
          <div className="title">英文字体</div>
          <ul className="font-block">
            <li>
              <div className="name">Arial</div>
              <div className="subname">Arial</div>
            </li>
            <li>
              <div className="name" style={{fontSize: 24}}>Helvetica Neue</div>
              <div className="subname">Helvetica Neue</div>
            </li>
          </ul>
        </div>

        <div className="block">
          <div className="title">字体使用规范</div>
          <ul className="font-rule">
            <li className="font-title-large">
              <div>页面标题</div>
              <div>客群洞察</div>
              <div>20px</div>
            </li>
            <li className="font-title-medium">
              <div>大标题</div>
              <div>客群洞察</div>
              <div>18px</div>
            </li>
            <li className="font-title-small">
              <div>列表标题</div>
              <div>客群洞察</div>
              <div>16px</div>
            </li>
            <li className="font-body-large">
              <div>正文</div>
              <div>客群洞察</div>
              <div>14px</div>
            </li>
            <li className="font-body-medium">
              <div>正文／小标题／辅助文字</div>
              <div>客群洞察</div>
              <div>12px</div>
            </li>
          </ul>
        </div>

        <div className="block">
          <div className="title">Button 按钮</div>
          <ul className="button">
            <li>
              <div>Primary large</div>
              <Button type="primary" size="large">Primary</Button>
            </li>
            <li>
              <div>Primary default</div>
              <Button type="primary" size="default">Primary</Button>
            </li>
            <li>
              <div>Primary small</div>
              <Button type="primary" size="small">Primary</Button>
            </li>
          </ul>
          <ul className="button">
            <li>
              <div>Default large</div>
              <Button size="large">Default</Button>
            </li>
            <li>
              <div>Default default</div>
              <Button size="default">Default</Button>
            </li>
            <li>
              <div>Default small</div>
              <Button size="small">Default</Button>
            </li>
          </ul>
          <ul className="button">
            <li>
              <div>Dashed large</div>
              <Button type="dashed" size="large">Dashed</Button>
            </li>
            <li>
              <div>Dashed default</div>
              <Button type="dashed" size="default">Dashed</Button>
            </li>
            <li>
              <div>Dashed small</div>
              <Button type="dashed" size="small">Dashed</Button>
            </li>
          </ul>
          <ul className="button">
            <li>
              <div>Danger large</div>
              <Button type="danger" size="large">Danger</Button>
            </li>
            <li>
              <div>Danger default</div>
              <Button type="danger" size="default">Danger</Button>
            </li>
            <li>
              <div>Danger small</div>
              <Button type="danger" size="small">Danger</Button>
            </li>
          </ul>
        </div>

        <div className="block">
          <h3>翻页</h3>
          <div className="block">
            <Pagination
              pageSize={+PAGE_SIZE}
              total={999}
              showTotal={(total) => {
                return `每页显示${PAGE_SIZE}条，共 ${Math.ceil(total / PAGE_SIZE)} 页`;
              }}
            />
          </div>
        </div>

        <div className="block">
          <h3>Search 搜索框</h3>
          <div className="block" style={{width: 220}}>
            <SearchInput/>
          </div>
        </div>

        <div className="block">
          <h3>RadioBox 单选框</h3>
          <div className="block">
            <Radio value={1} disabled checked={true}>A</Radio>
            <Radio value={2} disabled>B</Radio>
            <Radio value={3} checked={true}>C</Radio>
            <Radio value={4}>D</Radio>
          </div>
        </div>

        <div className="block">
          <h3>CheckBox 多选框</h3>
          <div className="block">
            <div>
              <div style={{borderBottom: '1px solid #E9E9E9'}}>
                <Checkbox
                  indeterminate={this.state.indeterminate}
                  onChange={this.onCheckAllChange}
                  checked={this.state.checkAll}
                >
                  Check all
                </Checkbox>
              </div>
              <br/>
              <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange}/>
            </div>
          </div>
          <div className="block">
            <CheckboxGroup options={plainOptions} disabled defaultValue={['Apple']}/>
          </div>
        </div>

        <div className="block">
          <div className="title">Droplist 下拉</div>
          <div className="block">
            <Select defaultValue="lucy" size="large" style={{ width: 220 }}>
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="disabled" disabled>Disabled</Select.Option>
              <Select.Option value="Yiminghe">yiminghe</Select.Option>
            </Select>
          </div>
        </div>

        <div className="block">
          <div className="title">Split Line 分割线</div>
          <div className="subtitle">分割线用于区分内容与内容、区域与区域。</div>
          <ul className="color-block">
            <li className="separate-heavy">
              <div>一级分隔符</div>
              #D4D6D9
            </li>
            <li className="separate-light">
              <div>二级分隔符</div>
              #EBEDF0
            </li>
          </ul>
        </div>

      </div>
    );
  }
}

export default UIcomponent;
