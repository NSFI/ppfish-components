import React from 'react';
import { Row, Col } from 'antd';

import CloudSearch from './CloudSearch';
import './Header.less';
import logo from '../../assets/image/登录Bule@2x.png';
class Header extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className="g-header">
        <Row>
          <Col span={5}>
            <img src={logo} className='u-logo'/>
          </Col>
          <Col span={12} align='left'>
            {/* <CloudSearch style={{width:200,marginTop:25}}/> */}
          </Col>
          <Col span={7} align='center'>组件</Col>
        </Row>
      </div>
    )
  }
}
export default Header;
