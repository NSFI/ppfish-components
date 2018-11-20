import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import './style/TextOverflow.less';
import _throttle from 'lodash/throttle';

const listeners = new Map();
let it = 0;
window.addEventListener('resize', _throttle(function (...d) {
  listeners.forEach((fn, key) => {
    try {
      if (typeof fn === 'function') {
        fn(...d);
      }
    } catch (e) {
      setTimeout(() => {
        throw e;
      }, 0);
    }
  });
}, 50));

function next() {
  return ++it;
}

function whenResizeDo(fn) {
  let nextKey = next();
  listeners.set(nextKey, fn);
  return nextKey;
}

function cancelResizeDo(key) {
  listeners.delete(key);
}

function checkOverflow(el) {

  if(!el) return false;
  const cssStyle = window.getComputedStyle(el);

  const curOverflow = cssStyle.overflow;
  el.style.overflow = 'hidden';
  el.style.whiteSpace = 'nowrap';

  const clientHeight = el.clientHeight;
  const scrollHeight = el.scrollHeight;

  const isOverflowing = el.clientWidth < el.scrollWidth
    || ((clientHeight < scrollHeight) && (clientHeight * 2 <= scrollHeight));

  el.style.overflow = curOverflow;
  el.style.whiteSpace = "";
  return isOverflowing;
}


export default class TextOverflow extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }
  constructor(props) {
    super(props);
    this.state = {
      overflow: false,
      open: false,
    };
  }
  componentWillMount() {
   this.listenerId = whenResizeDo(this.handleResize);
  }
  componentDidMount() {
    this.handleResize();
  }
  componentDidUpdate() {
    this.handleResize();
  }
  componentWillUnmount() {
    cancelResizeDo(this.listenerId);
  }
  handleResize = () => {
    let isOverflow = checkOverflow(this.wrapper);
    if (this.state.overflow !== isOverflow) {
      //此处判断是否相同，不相同只修改一次，不会爆栈
      this.setState({ overflow: isOverflow });
    }
  }

  toggleOpen = () => {
    this.setState(state => {
      state.open = !state.open;
      return state;
    });
  }

  render() {
    const { className, children } = this.props;
    const { overflow, open } = this.state;
    const prefix = 'fishd-text-overflow';

    const wrapper = Classnames([
      `${prefix}-wrapper`,
      className,
      { 'isOverflow': overflow }
    ]);

    const _classname = Classnames([
      prefix,
      { open: open }
    ]);

    return (
      <div className={wrapper}>
        <div className={_classname} ref={dom => this.wrapper = dom}>
          {children}
        </div>
        {open ? <div className="u-showmore" onClick={this.toggleOpen}>收起更多<i className="iconfont icon-xiajiantou f-rotate180 u-inherit" /></div>
          : <div className="u-showmore" onClick={this.toggleOpen}>展开更多<i className="iconfont icon-xiajiantou u-inherit" /></div>}
      </div>
    );



  }
}

