import React from "react";
import ReactDOM from 'react-dom';
import { Drawer, Button } from '../../../source/components';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openChild: false,
      openChildren: false,
    }
  }

  onClick = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  onChildClick = () => {
    this.setState({
      openChild: !this.state.openChild,
    })
  }

  onChildrenClick = () => {
    this.setState({
      openChildren: !this.state.openChildren,
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
          visible={this.state.open}
          onMaskClick={this.onClick}
          level={null}
        >
          <div>
            <Button type="primary" onClick={this.onChildClick}>打开子级</Button>
            <Drawer
              width="320"
              handler={false}
              visible={this.state.openChild}
              onMaskClick={this.onChildClick}
            >
              <div>
                二级抽屉
                <Button type="primary" onClick={this.onChildrenClick}>打开子级</Button>
                <Drawer
                  width="200"
                  handler={false}
                  visible={this.state.openChildren}
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
