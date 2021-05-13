import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';

import generateSelector, { selectorPropTypes } from '../../Base/BaseSelector';
import SearchInput from '../../SearchInput';
import Selection from './Selection';
import { createRef } from '../../util';
import classNames from 'classnames';
const TREE_SELECT_EMPTY_VALUE_KEY = 'RC_TREE_SELECT_EMPTY_VALUE_KEY';

const Selector = generateSelector('multiple');

export const multipleSelectorContextTypes = {
  onMultipleSelectorRemove: PropTypes.func.isRequired,
};

class MultipleSelector extends React.Component {
  static propTypes = {
    ...selectorPropTypes,
    selectorValueList: PropTypes.array,
    disabled: PropTypes.bool,
    disableCloseTag: PropTypes.bool,
    editable: PropTypes.bool,
    searchValue: PropTypes.string,
    labelInValue: PropTypes.bool,
    maxTagCount: PropTypes.number,
    maxTagPlaceholder: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
    tagWidth: PropTypes.number,

    onChoiceAnimationLeave: PropTypes.func,
  };

  static contextTypes = {
    rcTreeSelect: PropTypes.shape({
      ...multipleSelectorContextTypes,

      onSearchInputChange: PropTypes.func,
    }),
  };

  constructor() {
    super();
    // this.inputRef = createRef();
  }

  // onPlaceholderClick = () => {
  //   this.inputRef.current.focus();
  // };

  // focus = () => {
  //   this.inputRef.current.focus();
  // };

  // blur = () => {
  //   this.inputRef.current.blur();
  // };

  renderPlaceholder = () => {
    const {
      prefixCls,
      placeholder, searchPlaceholder,
      searchValue, selectorValueList,
    } = this.props;

    const currentPlaceholder = placeholder || searchPlaceholder;

    if (!currentPlaceholder) return null;

    // const hidden = searchValue || selectorValueList.length;
    const hidden = selectorValueList.length;

    // [Legacy] Not remove the placeholder
    return (
      <span
        style={{
          display: hidden ? 'none' : 'block',
        }}
        onClick={this.onPlaceholderClick}
        className={`${prefixCls}-search__field__placeholder`}
      >
        {currentPlaceholder}
      </span>
    );
  };

  renderSelection = () => {
    const {
      selectorValueList, choiceTransitionName, prefixCls,
      onChoiceAnimationLeave,
      labelInValue, maxTagCount, maxTagPlaceholder,
      editable, uniqueTreeNodeByLabel
    } = this.props;
    const { rcTreeSelect: { onMultipleSelectorRemove } } = this.context;

    // Check if `maxTagCount` is set
    let myValueList = selectorValueList;
    if (maxTagCount >= 0) {
      myValueList = selectorValueList.slice(0, maxTagCount);
    }

    // Selector node list
    let selectedValueNodes = myValueList.map(({ label, value }) => (
      <Selection
        {...this.props}
        key={value || TREE_SELECT_EMPTY_VALUE_KEY}
        label={label}
        value={value}
        onRemove={onMultipleSelectorRemove}
      />
    ));

    // Rest node count
    if (maxTagCount >= 0 && maxTagCount < selectorValueList.length) {
      let content = `+ ${selectorValueList.length - maxTagCount} ...`;
      if (typeof maxTagPlaceholder === 'string') {
        content = maxTagPlaceholder;
      } else if (typeof maxTagPlaceholder === 'function') {
        const restValueList = selectorValueList.slice(maxTagCount);
        content = maxTagPlaceholder(
          labelInValue ? restValueList : restValueList.map(({ value }) => value)
        );
      }

      const restNodeSelect = (
        <Selection
          {...this.props}
          key="rc-tree-select-internal-max-tag-counter"
          label={content}
          value={null}
        />
      );

      selectedValueNodes.push(restNodeSelect);
    }

    // selectedValueNodes.push(
    //   <li className={`${prefixCls}-search ${prefixCls}-search--inline`} key="__input">
    //     <SearchInput {...this.props} ref={this.inputRef} needAlign />
    //   </li>
    // );

    // 处理不可编辑的多选
    if (!editable) {
      let labelList = selectedValueNodes.map((item) => {
        return item.props.label;
      });

      // 相同 label 去重
      uniqueTreeNodeByLabel && (labelList = [...new Set(labelList)]);

      selectedValueNodes = labelList.filter((item) => item != undefined).join('、');
    }

    // const className = `${prefixCls}-selection__rendered`;
    const className = classNames({
      [`${prefixCls}-selection__rendered`]: true,
      [`${prefixCls}-multiple-readonly`]: !editable
    }, className);

    if (choiceTransitionName && editable) {
      return (<Animate
        className={className}
        component="ul"
        transitionName={choiceTransitionName}
        onLeave={onChoiceAnimationLeave}
      >
        {selectedValueNodes}
      </Animate>);
    }
    return (
      <ul className={className} role="menubar" title={!editable ? selectedValueNodes : null}>
        {selectedValueNodes}
      </ul>
    );
  }

  render() {
    return (
      <Selector
        {...this.props}
        tabIndex={-1}
        showArrow={!this.props.editable}
        renderSelection={this.renderSelection}
        renderPlaceholder={this.renderPlaceholder}
      />
    );
  }
}

export default MultipleSelector;
