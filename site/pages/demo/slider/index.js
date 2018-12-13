import React from 'react';
import PropTypes from 'prop-types';

import Affix from '../../../../source/components/Affix/index.tsx';
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

  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      anchors: [],
      title: undefined,
    };
  }

  componentDidMount() {
    this.scrollContainer = document.documentElement;
    this.setAnchors();
    window.addEventListener('scroll', this.handleSliderActiveCheck);
    this.handleSliderActiveCheck();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.title !== this.state.title) {
      this.setState({
        title: nextProps.title
      });
      setTimeout(() => {
        this.setAnchors();
        this.handleSliderActiveCheck();
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleSliderActiveCheck);
  }

  setAnchors = () => {
    const anchors = Array.from(document.querySelectorAll('h2')).map(h2Item => ({
      id: h2Item.id,
      name: h2Item.innerText
    }));
    this.setState({anchors});
  };

  handleSliderClick = (e, id) => {
    e && e.preventDefault();
    const fishHeaderHeight = document.querySelector('.fish-header').offsetHeight;
    this.scrollContainer.scrollTop = getElementTop(id) - fishHeaderHeight;
  };

  handleSliderActiveCheck = () => {
    const {anchors} = this.state;
    if (anchors.length < 2) return;
    const fishHeaderHeight = document.querySelector('.fish-header').offsetHeight;
    const result = anchors
      .map(x => ({
        id: x.id,
        offset: Math.abs(getElementTop(x.id) - this.scrollContainer.scrollTop - fishHeaderHeight)
      }))
      .reduce((a, b) => a.offset < b.offset ? a : b);
    const el = this.refs[result.id];
    el.classList.add('active');
    getSiblings(el).map((i) => i.classList.remove('active'));
  };

  render() {
    const {anchors} = this.state;
    const menuList = anchors.length > 1 ? anchors.map(x =>
        <li title={x.id} key={x.id} ref={x.id}><a onClick={(e) => this.handleSliderClick(e, x.id)}>{x.name}</a></li>) :
      null;
    return (
      <Affix offsetTop={145}>
        <ul className="u-slider-anchors" ref="menu">
          {menuList}
        </ul>
      </Affix>
    );
  }
}
