import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { createRef } from '../util';
import Icon from '../../../Icon/index.tsx';

export const selectorPropTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  open: PropTypes.bool,
  valueList: PropTypes.array, // Name as valueList to diff the single value
  allowClear: PropTypes.bool,
  showArrow: PropTypes.bool,
  uniqueTreeNodeByLabel: PropTypes.bool,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  removeSelected: PropTypes.func,

  // Pass by component
  ariaId: PropTypes.string,
};

export const selectorContextTypes = {
  onSelectorFocus: PropTypes.func.isRequired,
  onSelectorBlur: PropTypes.func.isRequired,
  onSelectorKeyDown: PropTypes.func.isRequired,
  onSelectorClear: PropTypes.func.isRequired,
};

export default function (modeName) {
  class BaseSelector extends React.Component {
    static propTypes = {
      ...selectorPropTypes,

      // Pass by HOC
      renderSelection: PropTypes.func.isRequired,
      renderPlaceholder: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    static contextTypes = {
      rcTreeSelect: PropTypes.shape({
        ...selectorContextTypes,
      }),
    };

    static defaultProps = {
      tabIndex: 0,
    }

    constructor() {
      super();

      this.domRef = createRef();
    }

    onFocus = (...args) => {
      const { onFocus, focused } = this.props;
      const { rcTreeSelect: { onSelectorFocus } } = this.context;

      if (!focused) {
        onSelectorFocus();
      }

      if (onFocus) {
        onFocus(...args);
      }
    };

    onBlur = (...args) => {
      const { onBlur } = this.props;
      const { rcTreeSelect: { onSelectorBlur } } = this.context;

      // TODO: Not trigger when is inner component get focused
      onSelectorBlur();

      if (onBlur) {
        onBlur(...args);
      }
    };

    focus = () => {
      this.domRef.current.focus();
    }

    blur = () => {
      this.domRef.current.focus();
    }

    renderClear() {
      const { prefixCls, allowClear, valueList } = this.props;
      const { rcTreeSelect: { onSelectorClear } } = this.context;

      if (!allowClear || !valueList.length || !valueList[0].value) {
        return null;
      }

      return (
        <span
          key="clear"
          className={`${prefixCls}-selection__clear`}
          onClick={onSelectorClear}
        />
      );
    }

    renderArrow() {
      const { prefixCls, showArrow } = this.props;

      if (!showArrow) {
        return null;
      }

      return <Icon key="arrow" type="down-fill" className={`${prefixCls}-arrow`} style={{ outline: 'none' }} />;
    }

    render() {
      const {
        prefixCls, className, style,
        open, focused, disabled, allowClear,
        onClick,
        ariaId,
        renderSelection, renderPlaceholder,
        tabIndex, showArrow
      } = this.props;
      const { rcTreeSelect: { onSelectorKeyDown } } = this.context;

      let myTabIndex = tabIndex;
      if (disabled) {
        myTabIndex = null;
      }

      return (
        <span
          style={style}
          // 用 onMouseDown 代替 onClick，修复加载页面后点击弹层，RcTrigger v2.6.2 中
          // onDocumentClick 先于 onPopupMouseDown 执行，导致的弹层异常关闭的问题
          onMouseDown={onClick}
          className={classNames(
            className,
            prefixCls,
            {
              [`${prefixCls}-open`]: open,
              [`${prefixCls}-focused`]: open || focused,
              [`${prefixCls}-disabled`]: disabled,
              [`${prefixCls}-enabled`]: !disabled,
              [`${prefixCls}-allow-clear`]: allowClear,
            }
          )}
          ref={this.domRef}
          role="combobox"
          aria-expanded={open}
          aria-owns={open ? ariaId : undefined}
          aria-controls={open ? ariaId : undefined}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          tabIndex={myTabIndex}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={onSelectorKeyDown}
        >
          <span
            key="selection"
            className={classNames(
              `${prefixCls}-selection`,
              `${prefixCls}-selection--${modeName}`,
              {
                'readonly': (modeName == 'multiple') && showArrow
              }
            )}
          >
            {renderSelection()}
            {this.renderClear()}
            {this.renderArrow()}

            {renderPlaceholder && renderPlaceholder()}
          </span>
        </span>
      );
    }
  }

  polyfill(BaseSelector);

  return BaseSelector;
}
