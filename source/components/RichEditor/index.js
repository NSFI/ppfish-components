import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.less';

class RichEditor extends Component {
  static propTypes = {
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state = { text: 'asdfadsf' }; // You can also pass a Quill Delta here
    this.modules = {
      toolbar: [
        ['link', 'bold', 'italic', 'underline'],
        ['color'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        // ['emoji'],
        ['image'],
        ['size'],
        ['clean'],
        // ['entry']
      ],
    };
        // [{'header': [1, 2, 3, false] }],
    this.formats = [
      'link', 'bold', 'italic', 'underline', 
      'color', 'size',
      'list',
      'image',
      'header',
      'clean',
      'emoji',
      'entry'
    ];
            // formats={this.formats}
  }

  handleChange = (value) => {
    // this.setState({ text: value })
  };

  render() {
    return (
      <ReactQuill
        className={'testclass testclass2'}
        value={this.state.text}
        placeholder={'placeholder'}
        modules={this.modules}
        onChange={this.handleChange}
      />
    )
  }
}

export default RichEditor;
