import React from 'react';
import { Row, Col } from 'antd';
import './Footer.less'

class Footer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="g-footer">
         <Row>
          <Col span={24} align='middle'>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Footer;