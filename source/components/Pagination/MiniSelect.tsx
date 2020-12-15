import * as React from 'react';
import Select, { Option } from '../Select';

interface OptionProps {
  disabled?: boolean;
  value?: string | number;
  title?: string;
  children?: React.ReactNode;
}

export default class MiniSelect extends React.Component<any, any> {
  static Option = Option;

  render() {
    return <Select size="small" {...this.props} />;
  }
}
