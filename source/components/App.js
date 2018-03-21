import React from 'react';
import { Menu, Icon, Row, Col } from 'antd';
import { Link } from 'react-router';
import axios from 'axios';
import Emitter from '../monitor/monitor';
import './App.less';
import Loading from './Loading';
let Markdown = require('./AnimationImageLoader/demo/Markdown.js')
const requireContext = require.context("../components", true, /demo\/App\.js$/);
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      component: null,
      theme: 'light',
      current: '0',
    };
  }
  componentDidMount() {
  }
  stringToElement = (html) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: html }} className="g-table-mk">
      </div>
    )
  }
  handleClick = (e) =>{
    this.setState({
      current: e.key,
    });
  }
  urlChange = (url = '/demo/AnimationImageLoader/') => {
    let urlArgu = url.replace(/\/demo\/|\//g, '');
    axios.get('https://raw.githubusercontent.com/octopusccc1/ppfish/master/ppfsbf/source/components/'+urlArgu+'/demo/App.js')
      .then(res => {
        let Markdown = require('./'+urlArgu+'/demo/Markdown.js')
        Emitter.emit('CodeChange', res.data);
        Emitter.emit('Markdown', Markdown);
      })
    
  }
  render() {
    //根据浏览器的url地址来判断
    let urlArguArray = location.href.split('demo');
    if (urlArguArray[1] !== undefined) {
      this.urlChange('/demo' + urlArguArray[1])
    } else {
      this.urlChange()
    }
    return (
      <div className="g-content" >
        <Row >
          <Col span={3} style={{minWidth:'220px'}}>
            <Menu onClick={this.handleClick}
              style={{ width: '100%'}}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
              theme={this.state.theme}
            >
              <SubMenu key="sub1" title={<span><Icon type="setting" /><span>组件</span></span>}>
                {
                  requireContext.keys().map((id, index, arr) => {
                    const idx = id.indexOf('/') + 1;
                    const name = id.slice(idx, id.indexOf('/', idx));
                    const url = id.replace(/demo\/App.js/, '').replace(/./, '/demo');
                    return (
                      <Menu.Item key={index} >
                        <Link to={url} onClick={this.urlChange.bind(this, url)}>
                          {name}
                        </Link>
                      </Menu.Item>
                    )
                  })
                }
              </SubMenu>
            </Menu>
          </Col>
          <Col span={19} style={{borderLeft:'1px solid #e9e9e9',marginLeft:'-1px'}}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    )
  }
}
export default App;