import React from "react";
import ReactDOM from 'react-dom';
import { Drawer, Button } from '../../../source/components';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleChild: false,
      visibleChildren: false,
    }
  }

  onClick = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onChildClick = () => {
    this.setState({
      visibleChild: !this.state.visibleChild,
    })
  }

  onChildrenClick = () => {
    this.setState({
      visibleChildren: !this.state.visibleChildren,
    });
  }

  render() {
    return (
      <div >
        <div
          style={{
            width: '100%', height: 450,
            textAlign: 'center', lineHeight: '450px',
          }}
        >
          <Button type="primary" onClick={this.onClick}>打开抽屉</Button>
        </div>
        <Drawer
          width="520"
          handler={false}
          visible={this.state.visible}
          onMaskClick={this.onClick}
          level={null}
        >
          <div>
            <Button type="primary" onClick={this.onChildClick}>打开子级</Button>
            <Drawer
              width="320"
              handler={false}
              visible={this.state.visibleChild}
              onMaskClick={this.onChildClick}
            >
              <div>
                二级抽屉
                <Button type="primary" onClick={this.onChildrenClick}>打开子级</Button>
                <Drawer
                  width="200"
                  handler={false}
                  visible={this.state.visibleChildren}
                  onMaskClick={this.onChildrenClick}
                >
                  <div>
                    三级抽屉
                  </div>
                </Drawer>
              </div>
            </Drawer>
          </div>
        </Drawer>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('app')
);
