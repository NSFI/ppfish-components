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
      <div style={{background: '#f7f7f7'}}>
        <Anchor inkPosition={'left'} style={{
          width: 150,
          float: 'right',
          marginRight: 50,
          marginTop: 50
        }}>
          <Link href="#title1" title="Title-1">
            <Link href="#title1-1" title="Title-1-1"/>
            <Link href="#title1-2" title="Title-1-2"/>
            <Link href="#title1-3" title="Title-1-3"/>
          </Link>
          <Link href="#title2" title="Title-2"/>
          <Link href="#title3" title="Title-3"/>
        </Anchor>
        <div style={{padding: 24, marginBottom: 65}}>
          <p id={'title1'}>Title 1</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'title1-1'}>title1-1</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'title1-2'}>title1-2</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'title1-3'}>title1-3</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'title2'}>Title 2</p>
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
          <p id={'title3'}>Title 3</p>
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
