import React from 'react';
import PropTypes from 'prop-types';
import InkTabBarNode from './InkTabBarNode';
import TabBarTabsNode from './TabBarTabsNode';
import TabBarRootNode from './TabBarRootNode';
import ScrollableTabBarNode from './ScrollableTabBarNode';
import SaveRef from './SaveRef';

export default class ScrollableInkTabBar extends React.Component {
  static propTypes = {
    showInkBar: PropTypes.bool,
  };

  render() {
    const { showInkBar } = this.props;

    return (
      <SaveRef>
        {(saveRef, getRef) => (
          <TabBarRootNode saveRef={saveRef} {...this.props}>
            <ScrollableTabBarNode saveRef={saveRef} getRef={getRef} {...this.props}>
              <TabBarTabsNode saveRef={saveRef} {...this.props} />
              {showInkBar ? <InkTabBarNode saveRef={saveRef} getRef={getRef} {...this.props} /> : null}
            </ScrollableTabBarNode>
          </TabBarRootNode>
        )}
      </SaveRef>
    );
  }
}
