import React from 'react';
import PropTypes from 'prop-types';

var Pager = function Pager(props) {
  var prefixCls = "".concat(props.rootPrefixCls, "-item");
  var cls = "".concat(prefixCls, " ").concat(prefixCls, "-").concat(props.page);

  if (props.active) {
    cls = "".concat(cls, " ").concat(prefixCls, "-active");
  }

  if (props.className) {
    cls = "".concat(cls, " ").concat(props.className);
  }

  var handleClick = function handleClick() {
    props.onClick(props.page);
  };

  var handleKeyPress = function handleKeyPress(e) {
    props.onKeyPress(e, props.onClick, props.page);
  };

  return React.createElement("li", {
    title: props.showTitle ? props.page : null,
    className: cls,
    onClick: handleClick,
    onKeyPress: handleKeyPress,
    tabIndex: "0"
  }, props.itemRender(props.page, 'page', React.createElement("a", null, props.page)));
};

Pager.propTypes = {
  page: PropTypes.number,
  active: PropTypes.bool,
  last: PropTypes.bool,
  locale: PropTypes.object,
  className: PropTypes.string,
  showTitle: PropTypes.bool,
  rootPrefixCls: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  itemRender: PropTypes.func
};
export default Pager;