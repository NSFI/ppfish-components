import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tabs as AntTabs } from 'antd';
import BizLoading from '../BizLoading';
import './index.less';

class Tabs extends Component {
	static TabPane = AntTabs.TabPane;
	static propTypes = {
		activeKey: PropTypes.string,
		animated: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.object
		]),
		className: PropTypes.string,
		defaultActiveKey: PropTypes.string,
		hideAdd: PropTypes.bool,
		showLoading: PropTypes.bool,
		// newTabLabel: PropTypes.string,
		size: PropTypes.string,
		tabBarExtraContent: PropTypes.node,
		tabBarGutter: PropTypes.number,
		tabBarStyle: PropTypes.object,
		tabPosition: PropTypes.string,
		// tabScrollable: PropTypes.bool,
		type: PropTypes.string,
		onChange: PropTypes.func,
		onEdit: PropTypes.func,
		onNextClick: PropTypes.func,
		onPrevClick: PropTypes.func,
		onTabClick: PropTypes.func,
	};
	static defaultProps = {
		className: '',
		hideAdd: false,
		showLoading: false,
		// newTabLabel: 'New Tab',
		size: 'default',
		tabPosition: 'top',
		// tabScrollable: false,
		type: 'line',
	};

  constructor(props) {
    super(props);

    this.clsPrefix = 'm-tabs';
  }

  render() {
  	const {
  		activeKey,
  		className,
  		showLoading,
  		type
  	} = this.props;
    let tabsClass = classNames({
      [this.clsPrefix]: true,
      [this.clsPrefix + '-section']: type === 'section',
      [this.clsPrefix + '-borderless-section']: type === 'borderless-section',
      [className]: className !== ''
    });
    let loadingClass = classNames({
			[this.clsPrefix + '-hide']: !showLoading
    });

  	return (
  		<div className={tabsClass}>
  			<AntTabs 
  				{...this.props} 
				/>
				<BizLoading extraCls={loadingClass}/>
  		</div>
  	);
  }
}

export default Tabs;
