import React from "react";
import ReactDOM from 'react-dom';
import { Drawer, Menu, Icon, Select } from '../../../source/components';

const Option = Select.Option;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleDrawerChange = (status) => {
    this.setState({
      isOpen: status
    });
  }

  render() {
    const customerHandler = () => {
      const style = {
        width: 102,
        height: 32,
        left: -102,
        lineHeight: 32,
        fontSize: 14,
        color: '#fff',
        backgroundColor: '#337EFF',
        border: '1px solid #337EFF',
        borderRadius: '2px 2px 0 0',
      };

      if(this.state.isOpen){
        return (
          <div className="drawer-handle" style={style}>收起</div>
        );
      }else{
        return (
          <div className="drawer-handle" style={style}>展开</div>
        );
      }
    };

    return (
      <div >
        <Drawer
          placement="right"
          width="20vw"
          handler={customerHandler()}
          onChange={this.handleDrawerChange}
        >
          <Menu
            style={{ height: '200%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <Menu.SubMenu
              key="sub1"
              title={<span><Icon type="mail" /><span>Navigation One</span></span>}
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
              title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}
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
              title={<span><Icon type="setting" /><span>Navigation Three</span></span>}
            >
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Drawer>
        <div
          style={{
            width: '100%', height: 450,
            textAlign: 'center', lineHeight: '450px',
          }}
        >
          自定义触发按钮的样式
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('app')
);
