import React, { Component } from 'react';
import warning from 'warning';
import get from 'lodash/get';

export interface FormListProps {
  form: any;
  name: string;
  initialValues?: any[];
  children: (fields, operation) => React.ReactNode;
}

export interface FormListState {
  keys: number[];
  id: number;
  initialValues: any[];
}

const move = function (array: any[], moveIndex: number, toIndex: number) {
  const { length } = array;
  if (moveIndex < 0 || moveIndex >= length || toIndex < 0 || toIndex >= length) {
    return array;
  }
  const item = array[moveIndex];
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  }
  if (diff < 0) {
    // move right
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, toIndex + 1),
      item,
      ...array.slice(toIndex + 1, length),
    ];
  }
  return array;
};

class FormList extends Component<FormListProps, FormListState> {
  static defaultProps = {
    className: '',
    prefixCls: 'fishd-form',
    initialValues: [],
  };

  constructor(props) {
    super(props);
    const { keys, id, initialValues } = this.init();
    this.state = {
      keys,
      id,
      initialValues,
    };
  }

  init = () => {
    const { initialValues } = this.props;
    const keys = [];
    let id = 0;
    for (let i = 0; i < initialValues.length; i++) {
      keys.push(id);
      id += 1;
    }
    return {
      keys,
      id,
      initialValues,
    };
  };

  setKeys = (keys, callback?: () => void) => {
    this.setState(
      {
        keys,
      },
      callback,
    );
  };

  setId = (id, callback?: () => void) => {
    this.setState(
      {
        id,
      },
      callback,
    );
  };

  setInitialValues = (initialValues, callback?: () => void) => {
    this.setState(
      {
        initialValues,
      },
      callback,
    );
  };

  get currValue() {
    const { name, form } = this.props;
    const { getFieldsValue } = form;
    const formValue = getFieldsValue();
    const value = get(formValue, name) || [];
    return value;
  }

  setFormValue = value => {
    const { name, form } = this.props;
    const { setFieldsValue } = form;
    setFieldsValue({
      [name]: value,
    });
  };

  add = (defaultValue?: any, index?: number) => {
    const { keys, id, initialValues } = this.state;
    const currValue = this.currValue;

    let addIndex;
    if (index >= 0 && index <= currValue.length) {
      addIndex = index;
    } else {
      addIndex = currValue.length;
      if (process.env.NODE_ENV !== 'production' && (index < 0 || index > currValue.length)) {
        warning(
          false,
          `The second parameter of the add function should be a valid positive number.`,
        );
      }
    }

    const nextKeys = [...keys];
    nextKeys.splice(addIndex, 0, id);
    const nextInitialValues = [...initialValues];
    nextInitialValues.splice(addIndex, 0, defaultValue);
    const nextValue = [...currValue];
    nextValue.splice(addIndex, 0, defaultValue);

    const nextId = id + 1;
    this.setId(nextId);

    this.setKeys(nextKeys);
    this.setInitialValues(nextInitialValues, () => {
      if (addIndex !== currValue.length) {
        this.setFormValue(nextValue);
      }
    });
  };

  remove = (index: number) => {
    const { keys, initialValues } = this.state;
    const nextKeys = keys.filter((key, i) => {
      return i !== index;
    });

    const nextInitialValues = initialValues.filter((v, i) => i !== index);

    const currValue = this.currValue;
    const nextValue = currValue.filter((v, i) => i !== index);

    this.setKeys(nextKeys);
    this.setInitialValues(nextInitialValues);
    this.setFormValue(nextValue);
  };

  move = (from: number, to: number) => {
    if (from === to) {
      return;
    }

    const currValue = this.currValue;

    if (from < 0 || from >= currValue.length || to < 0 || to >= currValue.length) {
      return;
    }

    const { keys, initialValues } = this.state;
    const nextKeys = move(keys, from, to);
    const nextInitialValues = move(initialValues, from, to);
    const nextValue = move(currValue, from, to);

    this.setKeys(nextKeys);
    this.setInitialValues(nextInitialValues);
    this.setFormValue(nextValue);
  };

  get fields() {
    const { name } = this.props;
    const { keys, initialValues } = this.state;
    const fields = keys.map((key, index) => ({
      name: `${name}[${index}]`,
      key,
      initialValue: initialValues[index],
    }));
    return fields;
  }

  render() {
    const { children } = this.props;
    const fields = this.fields;
    const operation = {
      add: this.add,
      remove: this.remove,
      move: this.move,
    };
    return children(fields, operation);
  }
}

export default FormList;
