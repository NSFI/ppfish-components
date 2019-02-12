import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import Trigger from 'rc-trigger';
import classNames from 'classnames';

import { createRef } from './util';

const commonPlacements = {
  overflow: {
    adjustX: 1,
    adjustY: 1,
  },
  ignoreShake: true,
};
const BUILT_IN_PLACEMENTS = {
  leftCenter: {
    points: ['cr', 'cl'],
    offset: [-8, 0],
    ...commonPlacements
  },
  leftTop: {
    points: ['tr', 'tl'],
    offset: [-8, 0],
    ...commonPlacements
  },
  leftBottom: {
    points: ['br', 'bl'],
    offset: [-8, 0],
    ...commonPlacements
  },
  rightCenter: {
    points: ['cl', 'cr'],
    offset: [8, 0],
    ...commonPlacements
  },
  rightTop: {
    points: ['tl', 'tr'],
    offset: [8, 0],
    ...commonPlacements
  },
  rightBottom: {
    points: ['bl', 'br'],
    offset: [8, 0],
    ...commonPlacements
  },
  topCenter: {
    points: ['bc', 'tc'],
    offset: [0, -8],
    ...commonPlacements
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -8],
    ...commonPlacements
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -8],
    ...commonPlacements
  },
  bottomCenter: {
    points: ['tc', 'bc'],
    offset: [0, 8],
    ...commonPlacements
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 8],
    ...commonPlacements
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 8],
    ...commonPlacements
  },
};

class SelectTrigger extends React.Component {
  static propTypes = {
    // Pass by outside user props
    disabled: PropTypes.bool,
    dropdownPopupAlign: PropTypes.object,
    placement: PropTypes.string,
    dropdownClassName: PropTypes.string,
    dropdownStyle: PropTypes.object,
    getPopupContainer: PropTypes.func,
    children: PropTypes.node,
    dropdownMatchSelectWidth: PropTypes.bool,
    transitionName: PropTypes.string,
    animation: PropTypes.string,

    // Pass by Select
    isMultiple: PropTypes.bool,
    dropdownPrefixCls: PropTypes.string,
    onDropdownVisibleChange: PropTypes.func,
    popupElement: PropTypes.node,
    open: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
  };

  constructor() {
    super();

    this.triggerRef = createRef();
  }

  getDropdownTransitionName = () => {
    const { transitionName, animation, dropdownPrefixCls } = this.props;
    if (!transitionName && animation) {
      return `${dropdownPrefixCls}-${animation}`;
    }
    return transitionName;
  };

  forcePopupAlign = () => {
    const $trigger = this.triggerRef.current;

    if ($trigger) {
      $trigger.forcePopupAlign();
    }
  };

  render() {
    const {
      disabled, isMultiple,
      dropdownPopupAlign, dropdownMatchSelectWidth, dropdownClassName,
      dropdownStyle, onDropdownVisibleChange, getPopupContainer,
      dropdownPrefixCls, popupElement, open,
      children, placement
    } = this.props;

    // TODO: [Legacy] Use new action when trigger fixed: https://github.com/react-component/trigger/pull/86

    // When false do nothing with the width
    // ref: https://github.com/ant-design/ant-design/issues/10927
    let stretch;
    if (dropdownMatchSelectWidth !== false) {
      stretch = dropdownMatchSelectWidth ? 'width' : 'minWidth';
    }

    return (
      <Trigger
        ref={this.triggerRef}
        action={disabled ? [] : ['click']}
        popupPlacement={placement}
        // forceRender
        builtinPlacements={BUILT_IN_PLACEMENTS}
        popupAlign={dropdownPopupAlign}
        prefixCls={dropdownPrefixCls}
        popupTransitionName={this.getDropdownTransitionName()}
        onPopupVisibleChange={onDropdownVisibleChange}
        popup={popupElement}
        popupVisible={open}
        getPopupContainer={getPopupContainer}
        stretch={stretch}
        popupClassName={classNames(
          dropdownClassName,
          {
            [`${dropdownPrefixCls}--multiple`]: isMultiple,
            [`${dropdownPrefixCls}--single`]: !isMultiple,
          },
        )}
        popupStyle={dropdownStyle}
      >
        {children}
      </Trigger>
    );
  }
}

polyfill(SelectTrigger);

export default SelectTrigger;
