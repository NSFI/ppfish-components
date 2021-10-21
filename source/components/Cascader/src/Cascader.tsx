import * as React from 'react';
import Trigger from 'rc-trigger';
import Menus from './Menus';
import { KeyCode, shallowEqualArrays } from '../../../utils';
import arrayTreeFilter from 'array-tree-filter';
import BUILT_IN_PLACEMENTS from './placements';
import { CascaderOptionType, RcCascaderProps, SelectEvent } from '../interface';
import useControlledState from '../../../hooks/useControlledState';

const defaultFieldNames = Object.freeze({ label: 'label', value: 'value', children: 'children' });

const RcCascader: React.FC<RcCascaderProps> = props => {
  const triggerRef = React.useRef<any>();
  // useImperativeHandle(ref, () => ({
  //   getPopupDOMNode() {
  //     return triggerRef.current.getPopupDOMNode();
  //   },
  // }))

  const { defaultValue, options, onPopupVisibleChange, loadData } = props;
  const [value, setValue] = useControlledState([], { value: props.value, defaultValue });
  const [activeValue, setActiveValue] = React.useState([]);

  React.useEffect(() => {
    if (!loadData) {
      setActiveValue(props.value);
    }
  }, [props]);

  const [popupVisible, setPopupVisible] = useControlledState(false, {
    value: props.popupVisible,
    onChange: onPopupVisibleChange,
  });

  const handlePopupVisibleChange = (popupVisible: boolean) => {
    setPopupVisible(popupVisible);
  };

  const getFieldName = name => {
    return props.fieldNames[name] || defaultFieldNames[name];
  };

  const isKeyDownEvent = (e: SelectEvent): e is React.KeyboardEvent => e.type === 'keydown';
  const isConfirmEventType = (e: SelectEvent) =>
    isKeyDownEvent(e) ? e.keyCode === KeyCode.ENTER : e.type === 'click';

  const getCurrentLevelOptions = () => {
    const { options } = props;
    const result = arrayTreeFilter(
      options,
      (o: CascaderOptionType[], level: number) => o[getFieldName('value')] === activeValue[level],
      { childrenKeyName: getFieldName('children') },
    );
    if (result[result.length - 2]) {
      return result[result.length - 2][getFieldName('children')];
    }
    return [...options].filter(o => !o.disabled);
  };

  const getActiveOptions = (activeValue: string[]) =>
    arrayTreeFilter(
      options || [],
      (o: CascaderOptionType, level: number) => o[getFieldName('value')] === activeValue[level],
      { childrenKeyName: getFieldName('children') },
    );

  const handleChange = (options: CascaderOptionType[], visible: boolean, e: SelectEvent) => {
    const { onChange } = props;

    if (isConfirmEventType(e)) {
      onChange(
        options.map(o => o[getFieldName('value')]),
        options,
      );
      setPopupVisible(visible);
    }
  };

  const handleMenuSelect = (targetOption, menuIndex, e) => {
    const { changeOnSelect, loadData, expandTrigger } = props;
    // Keep focused state for keyboard support
    const triggerNode = triggerRef.current.getRootDomNode();
    if (triggerNode && triggerNode.focus) {
      triggerNode.focus();
    }

    if (!targetOption || targetOption.disabled) {
      return;
    }

    const newActiveValue = activeValue.slice(0, menuIndex + 1);
    newActiveValue[menuIndex] = targetOption[getFieldName('value')];
    // 更新activeValue
    setActiveValue(newActiveValue);

    const activeOptions = getActiveOptions(newActiveValue);

    // loadData
    if (targetOption.isLeaf === false && !targetOption[getFieldName('children')] && loadData) {
      if (changeOnSelect) {
        handleChange(activeOptions, true, e);
      }
      loadData(activeOptions);
      return;
    }

    // e.keyCode === KeyCode.ENTER || e.type === 'click'
    const canSyncValue = isConfirmEventType(e);

    if (!targetOption[getFieldName('children')] || !targetOption[getFieldName('children')].length) {
      handleChange(activeOptions, false, e);
      // set value to activeValue when select leaf option
      canSyncValue && setValue(newActiveValue);
    } else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
      // add e.type judgement to prevent `onChange` being triggered by mouseEnter
      if (expandTrigger === 'hover') {
        handleChange(activeOptions, false, e);
      } else {
        handleChange(activeOptions, true, e);
      }

      // set value to activeValue on every select
      canSyncValue && setValue(newActiveValue);
    }
  };

  const handleKeyDown = e => {
    const { children } = props;
    // https://github.com/ant-design/ant-design/issues/6717
    // Don't bind keyboard support when children specify the onKeyDown
    if (children && children.props && children.props.onKeyDown) {
      children.props.onKeyDown(e);
      return;
    }

    const newActiveValue = [...activeValue];
    const currentLevel = newActiveValue.length - 1 < 0 ? 0 : newActiveValue.length - 1;
    const currentOptions = getCurrentLevelOptions();
    const currentIndex = currentOptions
      .map(o => o[getFieldName('value')])
      .indexOf(newActiveValue[currentLevel]);
    if (
      e.keyCode !== KeyCode.DOWN &&
      e.keyCode !== KeyCode.UP &&
      e.keyCode !== KeyCode.LEFT &&
      e.keyCode !== KeyCode.RIGHT &&
      e.keyCode !== KeyCode.ENTER &&
      e.keyCode !== KeyCode.BACKSPACE &&
      e.keyCode !== KeyCode.ESC
    ) {
      return;
    }
    // Press any keys above to reopen menu
    if (
      !popupVisible &&
      e.keyCode !== KeyCode.BACKSPACE &&
      e.keyCode !== KeyCode.LEFT &&
      e.keyCode !== KeyCode.RIGHT &&
      e.keyCode !== KeyCode.ESC
    ) {
      setPopupVisible(true);
      return;
    }
    if (e.keyCode === KeyCode.DOWN || e.keyCode === KeyCode.UP) {
      let nextIndex = currentIndex;
      if (nextIndex !== -1) {
        if (e.keyCode === KeyCode.DOWN) {
          nextIndex += 1;
          nextIndex = nextIndex >= currentOptions.length ? 0 : nextIndex;
        } else {
          nextIndex -= 1;
          nextIndex = nextIndex < 0 ? currentOptions.length - 1 : nextIndex;
        }
      } else {
        nextIndex = 0;
      }
      newActiveValue[currentLevel] = currentOptions[nextIndex][getFieldName('value')];
    } else if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.BACKSPACE) {
      newActiveValue.splice(newActiveValue.length - 1, 1);
    } else if (e.keyCode === KeyCode.RIGHT) {
      if (currentOptions[currentIndex] && currentOptions[currentIndex][getFieldName('children')]) {
        newActiveValue.push(
          currentOptions[currentIndex][getFieldName('children')][0][getFieldName('value')],
        );
      }
    } else if (e.keyCode === KeyCode.ESC) {
      props.esc && setPopupVisible(false);
      return;
    }

    if (!newActiveValue || newActiveValue.length === 0) {
      setPopupVisible(false);
    }

    const activeOptions = getActiveOptions(newActiveValue);
    const targetOption = activeOptions[activeOptions.length - 1];
    handleMenuSelect(targetOption, activeOptions.length - 1, e);

    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  const {
    disabled,
    popupPlacement,
    builtinPlacements,
    transitionName,
    prefixCls,
    popupClassName,
    fieldNames,
    dropdownMenuColumnStyle,
    children,
    expandTrigger,
    expandIcon,
  } = props;

  // render Menus
  const isEmptyOptions = !options || options.length === 0;
  const menus = isEmptyOptions ? (
    <div />
  ) : (
    <Menus
      prefixCls={prefixCls}
      dropdownMenuColumnStyle={dropdownMenuColumnStyle}
      value={value}
      activeValue={activeValue}
      options={options}
      expandTrigger={expandTrigger}
      onSelect={handleMenuSelect}
      visible={popupVisible}
      defaultFieldNames={defaultFieldNames}
      fieldNames={fieldNames}
      expandIcon={expandIcon}
    />
  );

  const emptyMenuClassName = isEmptyOptions ? ` ${prefixCls}-menus-empty` : '';

  return (
    <Trigger
      ref={triggerRef}
      popupPlacement={popupPlacement}
      builtinPlacements={builtinPlacements}
      popupTransitionName={transitionName}
      action={disabled ? [] : ['click']}
      popupVisible={disabled ? false : popupVisible}
      onPopupVisibleChange={handlePopupVisibleChange}
      prefixCls={`${prefixCls}-menus`}
      popupClassName={popupClassName + emptyMenuClassName}
      popup={menus}
    >
      {React.cloneElement(children, {
        onKeyDown: handleKeyDown,
        tabIndex: disabled ? undefined : 0,
      })}
    </Trigger>
  );
};

RcCascader.defaultProps = {
  options: [],
  onChange() {},
  onPopupVisibleChange() {},
  disabled: false,
  transitionName: '',
  prefixCls: 'rc-cascader',
  popupClassName: '',
  popupPlacement: 'bottomLeft',
  builtinPlacements: BUILT_IN_PLACEMENTS,
  expandTrigger: 'click',
  fieldNames: { label: 'label', value: 'value', children: 'children' },
  expandIcon: '',
  esc: true,
};

export default RcCascader;
