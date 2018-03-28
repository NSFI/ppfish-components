/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Collapse, Table } from 'antd';
import brace from 'brace';
import AceEditor from 'react-ace';
import Emitter from '../../monitor/monitor';

import './DocumentLayout.less';
import 'brace/mode/html';
import 'brace/theme/textmate';
import Markdowner from 'markdown-it';
const md = new Markdowner({
  html:true,
  prefix:'code-'
});
const Panel = Collapse.Panel;
class DoucumentLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
      demoData: ''
    };
  }
  componentDidMount() { //在组件挂载完成后声明一个自定义事件
    Emitter.addListener('CodeChange', (msg) => {
      this.setState({
        msg: msg
      });
    });
    Emitter.addListener('Markdown', (msg) =>{
      let changeMsg = md.render(msg||'');
      this.setState({
        markMsg: changeMsg
      });
    });
  }
  componentWillUnmount() { //组件销毁前移除事件监听
    Emitter.removeListener('CodeChange', (msg) => {
      this.setState({
        msg: msg
      });
    });
    Emitter.removeListener('CodeChange', (msg) => {
      this.setState({
        markMsg: msg
      });
    });
  }
  callback = (key) => {
  }
  onChange = (newValue) => {
  }
  stringToElement = (html) =>{
    return(
      <div dangerouslySetInnerHTML={{__html: html}} className="g-table-mk" />
    );
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              {this.props.children}
              <Collapse onChange={this.callback} >
                <Panel header="代码演示" key="1" >
                  <AceEditor
                    mode="html"
                    theme="textmate"
                    onChange={this.onChange}
                    readOnly={true}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    value={this.state.msg}
                    width="100%"
                    showGutter={false}
                    showPrintMargin={false}
                    highlightActiveLine={false}
                  />
                </Panel>
              </Collapse>
            </Card>
          </Col>
          {/* {this.stringToElement(this.state.markMsg)} */}
        </Row>

      </div>
    );
  }
}
export default DoucumentLayout;
