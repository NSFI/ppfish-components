import React, { Component, Children } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import TreeSelectMore from './TreeSelectMore';

class TreePane extends Component {
  static propTypes = {
    pane: PropTypes.object,
    depth: PropTypes.number,
    onSelect: PropTypes.func,
    onCurrent: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
    onCurrent: () => {},
  }

  constructor(props) {
    super(props);
  }

  setSelected(key, value) {
    const { onSelect } = this.props;
    onSelect(key, value);
  }

  setCurrent(key) {
    const { onCurrent } = this.props;
    onCurrent(key);
  }

  render() {
    const { pane, depth } = this.props;
    const data = pane.items;
    const visible = pane.visible;
    if (!visible) {
      return null;
    }
    return (
      <div className={[`tree-select-depth tree-select-depth${depth}`]}>
        {
          data.map((item, i) => {
            return (
              <div
                key={item.key}
                className={classNames({
                  'clearfix': true,
                  'tree-select-item': true,
                  'current': item.current
                })}
              >
                <Checkbox
                  checked={item.selected}
                  indeterminate={item.indeterminate}
                  onChange={(e) => this.setSelected(item.key, e.target.checked)}
                />
                <div
                  className="tree-select-text"
                  onClick={() => this.setCurrent(item.key)}
                >{item.text}</div>
                <TreeSelectMore
                  hasSubItem={!!item.children}
                  onClick={() => this.setCurrent(item.key)}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default TreePane;
