import React from 'react';
import PropTypes from 'prop-types';
import {
  toTitle,
  UNSELECTABLE_ATTRIBUTE, UNSELECTABLE_STYLE,
} from '../../util';

class Selection extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    prefixCls: PropTypes.string,
    maxTagTextLength: PropTypes.number,
    onRemove: PropTypes.func,

    label: PropTypes.node,
    value: PropTypes.string,
  };

  onRemove = (event) => {
    const { onRemove, value } = this.props;
    onRemove(event, value);

    event.stopPropagation();
  };

  render() {
    const {
      prefixCls, maxTagTextLength,
      label, value, onRemove, editable
    } = this.props;

    let content = label || value;
    if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
      content = `${content.slice(0, maxTagTextLength)}...`;
    }

    let tagStyle = Object.assign({}, UNSELECTABLE_STYLE);
    if (!onRemove) {
      tagStyle['padding'] = '0 10px';
    }

    // if (editable) {
    return (
      <li
        style={tagStyle}
        {...UNSELECTABLE_ATTRIBUTE}
        role="menuitem"
        className={`${prefixCls}-selection__choice`}
        title={toTitle(label)}
      >
        <span
          className={`${prefixCls}-selection__choice__remove fishdicon-guanbi`}
          onClick={this.onRemove}
        />
        <span className={`${prefixCls}-selection__choice__content`}>
          {content}
        </span>
      </li>
    );
    // } else {
    //   return (
    //     <span
    //       style={tagStyle}
    //       {...UNSELECTABLE_ATTRIBUTE}
    //       role="menuitem"
    //       title={toTitle(label)}
    //     >
    //       {content}
    //     </span>
    //   );
    // }
  }
}

export default Selection;
