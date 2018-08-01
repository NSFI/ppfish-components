import * as React from 'react';
import classNames from 'classnames';
import Checkbox, {CheckboxChangeEvent} from '../Checkbox';
import Dropdown from '../Dropdown';
import Menu from '../Menu';
import Icon from '../Icon';
import {SelectionCheckboxAllProps, SelectionCheckboxAllState, SelectionItem} from './interface';

export default class SelectionCheckboxAll<T> extends React.Component<SelectionCheckboxAllProps<T>, SelectionCheckboxAllState> {
  unsubscribe: () => void;
  defaultSelections: SelectionItem[];

  constructor(props: SelectionCheckboxAllProps<T>) {
    super(props);

    this.defaultSelections = props.hideDefaultSelections ? [] : [{
      key: 'all',
      text: props.locale.selectAll,
      onSelect: () => {
      },
    }, {
      key: 'invert',
      text: props.locale.selectInvert,
      onSelect: () => {
      },
    }];

    this.state = {
      checked: this.getCheckState(props),
      indeterminate: this.getIndeterminateState(props),
    };
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillReceiveProps(nextProps: SelectionCheckboxAllProps<T>) {
    this.setCheckState(nextProps);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe() {
    const {store} = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.setCheckState(this.props);
    });
  }

  checkSelection(data: T[], type: string, byDefaultChecked: boolean) {
    const {store, getCheckboxPropsByItem, getRecordKey} = this.props;
    // type should be 'every' | 'some'
    if (type === 'every' || type === 'some') {
      return (
        byDefaultChecked
          ? data[type]((item, i) => getCheckboxPropsByItem(item, i).defaultChecked)
          : data[type]((item, i) =>
          store.getState().selectedRowKeys.indexOf(getRecordKey(item, i)) >= 0)
      );
    }
    return false;
  }

  setCheckState(props: SelectionCheckboxAllProps<T>) {
    const checked = this.getCheckState(props);
    const indeterminate = this.getIndeterminateState(props);
    this.setState((prevState) => {
      let newState: SelectionCheckboxAllState = {};
      if (indeterminate !== prevState.indeterminate) {
        newState.indeterminate = indeterminate;
      }
      if (checked !== prevState.checked) {
        newState.checked = checked;
      }
      return newState;
    });
  }

  getCheckState(props: SelectionCheckboxAllProps<T>) {
    const {store, data} = props;
    let checked;
    if (!data.length) {
      checked = false;
    } else {
      checked = store.getState().selectionDirty
        ? this.checkSelection(data, 'every', false)
        : (
          this.checkSelection(data, 'every', false) ||
          this.checkSelection(data, 'every', true)
        );

    }
    return checked;
  }

  getIndeterminateState(props: SelectionCheckboxAllProps<T>) {
    const {store, data} = props;
    let indeterminate;
    if (!data.length) {
      indeterminate = false;
    } else {
      indeterminate = store.getState().selectionDirty
        ? (
          this.checkSelection(data, 'some', false) &&
          !this.checkSelection(data, 'every', false)
        )
        : ((this.checkSelection(data, 'some', false) &&
            !this.checkSelection(data, 'every', false)) ||
          (this.checkSelection(data, 'some', true) &&
            !this.checkSelection(data, 'every', true))
        );
    }
    return indeterminate;
  }

  handleSelectAllChagne = (e: CheckboxChangeEvent) => {
    let checked = e.target.checked;
    this.props.onSelect(checked ? 'all' : 'removeAll', 0, null);
  }

  renderMenus(selections: SelectionItem[]) {
    return selections.map((selection, index) => {
      return (
        <Menu.Item
          key={selection.key || index}
        >
          <div
            onClick={() => {
              this.props.onSelect(selection.key, index, selection.onSelect);
            }}
          >
            {selection.text}
          </div>
        </Menu.Item>
      );
    });
  }

  render() {
    const {disabled, prefixCls, selections, getPopupContainer} = this.props;
    const {checked, indeterminate} = this.state;

    let selectionPrefixCls = `${prefixCls}-selection`;

    let customSelections: React.ReactNode = null;

    if (selections) {
      let newSelections = Array.isArray(selections) ? this.defaultSelections.concat(selections)
        : this.defaultSelections;

      const menu = (
        <Menu
          className={`${selectionPrefixCls}-menu`}
          selectedKeys={[]}
        >
          {this.renderMenus(newSelections)}
        </Menu>
      );

      customSelections = newSelections.length > 0 ? (
        <Dropdown
          overlay={menu}
          getPopupContainer={getPopupContainer}
        >
          <div className={`${selectionPrefixCls}-down`}>
            <Icon type="down-formx"/>
          </div>
        </Dropdown>
      ) : null;
    }

    return (
      <div className={selectionPrefixCls}>
        <Checkbox
          className={classNames({[`${selectionPrefixCls}-select-all-custom`]: customSelections})}
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          onChange={this.handleSelectAllChagne}
        />
        {customSelections}
      </div>
    );
  }
}
