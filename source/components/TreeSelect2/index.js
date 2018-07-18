import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TreeSelect as AntTreeSelect } from 'antd';
import './index.less';

class TreeSelect2 extends Component {
  static TreeNode = AntTreeSelect.TreeNode;
  static SHOW_ALL = AntTreeSelect.SHOW_ALL;
  static SHOW_PARENT = AntTreeSelect.SHOW_PARENT;
  static SHOW_CHILD = AntTreeSelect.SHOW_CHILD;

	static propTypes = {
		showCheckedStrategy: PropTypes.string,
	};
	static defaultProps = {
    showCheckedStrategy: AntTreeSelect.SHOW_PARENT,
	};

  constructor(props) {
    super(props);
  }

  render() {
  	return (
	  	<div className="m-tree-select">
	  		<AntTreeSelect {...this.props}/>
	  	</div>
  	);
  }
}

export default TreeSelect2;
