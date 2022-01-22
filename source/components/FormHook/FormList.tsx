import * as React from 'react';
import { List } from './rcFieldForm';
import { ValidatorRule, StoreValue } from './rcFieldForm/interface';
import warning from '../../utils/warning';
import { FormItemPrefixContext } from './context';

export interface FormListFieldData {
  name: number;
  key: number;
}

export interface FormListOperation {
  add: (defaultValue?: StoreValue, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

export interface FormListProps {
  prefixCls?: string;
  name: string | number | (string | number)[];
  rules?: ValidatorRule[];
  initialValue?: any[];
  children: (
    fields: FormListFieldData[],
    operation: FormListOperation,
    meta: { errors: React.ReactNode[]; warnings: React.ReactNode[] },
  ) => React.ReactNode;
}

const FormList: React.FC<FormListProps> = ({ prefixCls, children, ...props }) => {
  warning(!!props.name, 'Form.List' + 'Miss `name` prop.');

  const contextValue = React.useMemo(
    () => ({
      prefixCls,
      status: 'error' as const,
    }),
    [prefixCls],
  );

  return (
    <List {...props}>
      {(fields, operation, meta) => (
        <FormItemPrefixContext.Provider value={contextValue}>
          {children(
            fields.map(field => ({ ...field, fieldKey: field.key })),
            operation,
            {
              errors: meta.errors,
              warnings: meta.warnings,
            },
          )}
        </FormItemPrefixContext.Provider>
      )}
    </List>
  );
};

FormList.defaultProps = {
  prefixCls: 'fishd-form',
};

export default FormList;
