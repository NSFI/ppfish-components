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
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  urlChange = (url = '/demo/AnimationImageLoader/') => {
    
    // this.setState({
    //   current: e.key,
    // });
    let urlArgu = url.replace(/\/demo\/|\//g, '');
    axios.get('https://raw.githubusercontent.com/octopusccc1/ppfish/master/ppfsbf/source/components/'+urlArgu+'/demo/App.js')
      .then(res => {
        let Markdown = require('./'+urlArgu+'/demo/Markdown.js')
        Emitter.emit('CodeChange', res.data);
        Emitter.emit('Markdown', Markdown);
      })
    // Jsonp('https://github.com/octopusccc1/ppfish/blob/master/ppfsbf/source/components/AnimationImageLoader/demo/App.js',null,(err,res) =>{
    //     let Markdown = require('./'+urlArgu+'/demo/Markdown.js')
    //     Emitter.emit('CodeChange', res.data);
    //     Emitter.emit('Markdown', Markdown);
    // })
    
  }
  render() {
    let urlArguArray = location.href.split('demo');
    if (urlArguArray[1] !== '/') {
      this.urlChange('/demo' + urlArguArray[1])
    } else {
      this.urlChange()
    }
    return (
      <div className="g-content" >
        <Row >
          <Col span={5}>
            <Menu onClick={this.handleClick}
              style={{ width: 220 }}
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
          <Col span={19}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    )
  }
}
export default App;