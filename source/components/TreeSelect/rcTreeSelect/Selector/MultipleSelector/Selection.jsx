import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  toTitle,
  UNSELECTABLE_ATTRIBUTE, UNSELECTABLE_STYLE,
} from '../../util';

class Selection extends React.Component {
  static propTypes = {
    disableCloseTag: PropTypes.bool,
    editable: PropTypes.bool,
    prefixCls: PropTypes.string,
    maxTagTextLength: PropTypes.number,
    tagWidth: PropTypes.number,
    onRemove: PropTypes.func,

    label: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  onRemove = (event) => {
    const { onRemove, value } = this.props;
    onRemove(event, value);

    event.stopPropagation();
  };

  render() {
    const {
      prefixCls, maxTagTextLength,
      label, value, tagWidth,
      disableCloseTag, iconPrefix
    } = this.props;

    let content = label || value;
    if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
      content = `${content.slice(0, maxTagTextLength)}...`;
    }

    let tagStyle = Object.assign({
      width: tagWidth + 'px'
    }, UNSELECTABLE_STYLE);

    const removeCls = classNames({
      [`${prefixCls}-selection__choice__remove`]: true,
      [`${iconPrefix}-close-modal-line`]: true,
      [`${prefixCls}-selection__choice__remove__disabled`]: disableCloseTag
    });

    return (
      <li
        style={tagStyle}
        {...UNSELECTABLE_ATTRIBUTE}
        role="menuitem"
        className={`${prefixCls}-selection__choice`}
        title={toTitle(label)}
      >
        <span
          className={removeCls}
          onClick={disableCloseTag ? null : this.onRemove}
        />
        <span className={`${prefixCls}-selection__choice__content`}>
          {content}
        </span>
      </li>
    );
  }
}

export default Selection;
