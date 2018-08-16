import React from 'react';
import './style.less';
import Affix from '../../source/components/Affix/index.tsx';
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
    this.scrollContainer = document.querySelector('.component-content');
    this.scrollContainer.addEventListener('scroll', this.handleSliderActiveCheck);
    this.handleSliderActiveCheck();
  }

  componentDidUpdate() {
    this.handleSliderActiveCheck();
  }

  componentWillUnmount() {
    this.scrollContainer.removeEventListener('scroll', this.handleSliderActiveCheck);
  }

  handleSliderClick = (e, id) => {
    e && e.preventDefault();
    scrollIntoView(document.getElementById(id), this.scrollContainer, {
      offsetTop: 5,
      alignWithTop: true
    });
  };

  handleSliderActiveCheck = () => {
    const {anchors} = this.state;
    if (anchors.length < 2) return;
    const result = anchors
      .map(x => ({
        id: x.id,
        offset: Math.abs(getElementTop(x.id) - this.scrollContainer.scrollTop)
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
      <Affix offsetTop={80} target={() => document.querySelector('.component-content')}>
        <ul className="u-slider-anchors" ref="menu">
          {menuList}
        </ul>
      </Affix>
    );
  }
}
