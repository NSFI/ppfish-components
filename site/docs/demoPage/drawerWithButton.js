import React from "react";
import ReactDOM from 'react-dom';
import { Drawer, Menu, Icon, Select } from '../../../source/components';

const Option = Select.Option;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placement: 'right',
      childShow: true,
      width: '20vw',
      height: null,
    };
  }

  onChange = (value) => {
    this.setState({
      placement: value,
      width: value === 'right' || value === 'left' ? '20vw' : null,
      height: value === 'right' || value === 'left' ? null : '20vh',
      childShow: false, // 删除子级，删除切换时的过渡动画。。。
    }, () => {
      this.setState({
        childShow: true,
      });
    });
  }

  render() {
    return (
      <div >
        {this.state.childShow && (
          <Drawer
            placement={this.state.placement}
            width={this.state.width}
          >
            <Menu
              style={{ height: '200%' }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <Menu.SubMenu
                key="sub1"
                title={<span>Navigation One</span>}
              >
                <Menu.ItemGroup key="g1" title="Item 1">
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="Item 2">
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sub2"
                title={<span>Navigation Two</span>}
              >
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </Menu.SubMenu>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sub4"
                title={<span>Navigation Three</span>}
              >
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Drawer>
        )}
        <div
          style={{
            width: '100%', height: 450,
            textAlign: 'center', lineHeight: '450px',
          }}
        >
          选择抽屉位置：
          <Select
            style={{ width: 200, marginLeft: 20 }}
            defaultValue={this.state.placement}
            onChange={this.onChange}
          >
            <Option value="left">左边 left</Option>
            <Option value="top">上面 top</Option>
            <Option value="right">右边 right</Option>
            <Option value="bottom">下面 bottom</Option>
          </Select>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('app')
);
