import React from "react";
import ReactDOM from 'react-dom';
import {Anchor, Button} from '../../../source/components';

class Demo extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const {Link} = Anchor;
    return (
      <div>
        <Anchor inkPosition={'left'} style={{
          width: 150,
          position: 'absolute',
          right: 50,
          top: 50
        }}>
          <Link href="#内容项1" title="内容项-1">
            <Link href="#内容项1-1" title="内容项-1-1"/>
            <Link href="#内容项1-2" title="内容项-1-2"/>
            <Link href="#内容项1-3" title="内容项-1-3"/>
          </Link>
          <Link href="#内容项2" title="内容项-2"/>
          <Link href="#内容项3" title="内容项-3"/>
        </Anchor>
        <div style={{padding: '0 24px 24px'}}>
          <p id={'内容项1'}>内容项 1</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项1-1'}>内容项1-1</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项1-2'}>内容项1-2</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项1-3'}>内容项1-3</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项2'}>内容项 2</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项3'}>内容项 3</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo/>,
  document.getElementById('app')
);
