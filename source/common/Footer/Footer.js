import React from 'react';
import { Row, Col } from 'antd';
import './Footer.less'
const logo = '../../assets/image/登录Bule@2x.png';
class Footer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="g-footer">
         <Row>
          <Col span={24} align='middle'>
            <img src={logo} className='u-logo'/>
          </Col>

        </Row>
      </div>
    )
  }
}
export default Footer;