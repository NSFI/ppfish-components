import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tabs as AntTabs } from 'antd';
import './index.less';

class Tabs extends Component {
	static TabPane = AntTabs.TabPane;
	static propTypes = {};
	static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
  	return (
  		<div className="m-tabs">
  			<AntTabs {...this.props} />
  		</div>
  	);
  }
}

export default Tabs;
