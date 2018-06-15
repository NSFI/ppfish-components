import React from 'react';
import PropTypes from "prop-types";
import './slider.less';

//代码展示容器
export default class Slider extends React.Component {

  constructor(props) {
    super(props);
  }

  clickLink = (e, id) => {
    e && e.preventDefault();
    document.getElementById(id).scrollIntoView();
  };

  render() {
    const List = Array.from(this.props.anchors);
    return (
      <ul className="u-slider-anchors">
        {List.map(x => <li title={x.id} key={x.id}>
          <a onClick={(e) => this.clickLink(e, x.id)}>{x.name}</a>
        </li>)}
      </ul>
    );
  }
}

Slider.propTypes = {
  anchors: PropTypes.array
};
