import React, { Component, Children } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/index.js';
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

  componentDidMount() {
    // detect a scrollbar
    this.addClsIfNeed();
  }

  componentDidUpdate() {
    // detect a scrollbar
    this.addClsIfNeed();
  }

  addClsIfNeed = () => {
    const pane = this.pane;
    if ( pane && (pane.scrollHeight <= pane.clientHeight) ) {
      pane.classList.add('z-without-scrollbar');
    }
  }

  setSelected(key, value) {
    const { onSelect } = this.props;
    onSelect(key, value);
  }

  setCurrent(key, id) {
    const { onCurrent } = this.props;
    onCurrent(key, id);
  }

  render() {
    const { pane, depth } = this.props;
    const data = pane.items;
    const visible = pane.visible;
    if (!visible) {
      return null;
    }
    return (
      <div
        className={[`fishd-tree-select-depth fishd-tree-select-depth${depth}`]}
        ref={pane => this.pane = pane}
      >
        {
          data.map((item, i) => {
            return (
              <div
                key={item.key}
                className={classNames({
                  'clearfix': true,
                  'fishd-tree-select-item': true,
                  'current': item.current
                })}
              >
                <Checkbox
                  checked={item.selected}
                  indeterminate={item.indeterminate}
                  onChange={(e) => this.setSelected(item.key, e.target.checked)}
                />
                <div
                  className="fishd-tree-select-text"
                  onClick={() => this.setCurrent(item.key, item.id)}
                >{item.text}</div>
                <TreeSelectMore
                  hasSubItem={!!item.children || !item.leaf}
                  loading={item.loading}
                  onClick={() => this.setCurrent(item.key, item.id)}
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
