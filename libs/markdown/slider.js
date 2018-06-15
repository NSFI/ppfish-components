import React from 'react';
import PropTypes from "prop-types";
import './slider.less';

//代码展示容器

const getElementTop = (element) => {
  element = document.getElementById(element);
  let actualTop = element.offsetTop;
  let current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
};

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
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      this.checkActiveAnchors();
    });
  }

  clickLink = (e, id) => {
    e && e.preventDefault();
    document.getElementById(id).scrollIntoView();
  };

  checkActiveAnchors = () => {
    const wayFromTop = document.documentElement.scrollTop;
    const {anchors} = this.props;
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
    return (
      <ul className="u-slider-anchors">
        {anchors.map(x => <li title={x.id} key={x.id} ref={x.id}>
          <a onClick={(e) => this.clickLink(e, x.id)}>{x.name}</a>
        </li>)}
      </ul>
    );
  }
}

Slider.propTypes = {
  anchors: PropTypes.array
};
