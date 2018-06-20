import React from 'react';
import PropTypes from "prop-types";
import './style.less';

//元素距顶部高度
const getElementTop = (element) => {
  element = document.getElementById(element);
  if (!element) return;
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
};

//获取兄弟节点
const getSiblings = (elem) => {
  let siblings = [];
  let sibling = elem.parentNode.firstChild;
  for (; sibling; sibling = sibling.nextSibling)
    if (sibling.nodeType === 1 && sibling !== elem)
      siblings.push(sibling);
  return siblings;
};

export default class Slider extends React.Component {

  static defaultProps = {
    anchors: []
  };

  static propTypes = {
    anchors: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkActiveAnchors);
    this.checkActiveAnchors();
  }

  componentDidUpdate() {
    this.checkActiveAnchors();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkActiveAnchors);
  }

  clickLink = (e, id) => {
    e && e.preventDefault();
    document.getElementById(id).scrollIntoView();
  };

  checkActiveAnchors = () => {
    const {anchors} = this.props;
    if (anchors.length < 2) {
      return;
    } // 不显示导航时，直接跳出 scroll 事件
    const wayFromTop = document.documentElement.scrollTop;
    let menu = this.refs.menu;
    if (wayFromTop > 80) {  // 页面卷过 80px 之后，固定快速导航
      menu.classList.add('z-fixed');
    } else {
      menu.classList.remove('z-fixed');
    }
    const result = anchors.map(x => ({
      id: x.id,
      offset: Math.abs(getElementTop(x.id) - wayFromTop)
    })).reduce((a, b) => {
      return a.offset < b.offset ? a : b;
    });
    const el = this.refs[result.id];
    el.classList.add('active');
    getSiblings(el).map((i) => i.classList.remove('active'));
  };

  render() {
    const {anchors} = this.props;
    let menuList = anchors.length > 1
      ? anchors.map(x => <li title={x.id} key={x.id} ref={x.id}>
        <a onClick={(e) => this.clickLink(e, x.id)}>{x.name}</a>
      </li>)
      : null;
    return (
      <ul className="u-slider-anchors" ref="menu">
        {menuList}
      </ul>
    );
  }
}
