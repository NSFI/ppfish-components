import React from 'react';
import './style.less';
import {Affix} from 'antd';
import scrollIntoView from 'dom-scroll-into-view';
//元素距顶部高度
const getElementTop = (element) => {
  element = document.getElementById(element);
  // if (!element) return;
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

  constructor(props) {
    super(props);
    this.state = {
      anchors: []
    };
  }

  componentDidMount() {
    const anchors = Array.from(document.querySelectorAll('h2')).map(h3Item => ({
      id: h3Item.id,
      name: h3Item.innerText
    }));
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({anchors});
    /* eslint-enable react/no-did-mount-set-state */
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
    const fixedHeaderHeight = parseInt(getComputedStyle(document.querySelector('.fish-header')).height);
    scrollIntoView(document.getElementById(id), window, {
      offsetTop: fixedHeaderHeight + 5,
      alignWithTop: true
    });
  };

  checkActiveAnchors = () => {
    const {anchors} = this.state;
    if (anchors.length < 2) {
      return;
    } // 不显示导航时，直接跳出 scroll 事件
    const wayFromTop = document.documentElement.scrollTop;
    const fixedHeaderHeight = parseInt(getComputedStyle(document.querySelector('.fish-header')).height);
    const result = anchors.map(x => ({
      id: x.id,
      offset: Math.abs(getElementTop(x.id) - fixedHeaderHeight - wayFromTop)
    })).reduce((a, b) => {
      return a.offset < b.offset ? a : b;
    });
    const el = this.refs[result.id];
    el.classList.add('active');
    getSiblings(el).map((i) => i.classList.remove('active'));
  };

  render() {
    const {anchors} = this.state;
    const menuList = anchors.length > 1 ? anchors.map(x =>
        <li title={x.id} key={x.id} ref={x.id}><a onClick={(e) => this.clickLink(e, x.id)}>{x.name}</a></li>) :
      null;
    return (
      <Affix offsetTop={90}>
        <ul className="u-slider-anchors" ref="menu">
          {menuList}
        </ul>
      </Affix>
    );
  }
}
