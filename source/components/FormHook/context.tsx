import * as React from 'react';
import omit from 'rc-util/lib/omit';
import { Meta } from './rcFieldForm/interface';
import { FormProvider as RcFormProvider } from './rcFieldForm';
import { FormProviderProps as RcFormProviderProps } from './rcFieldForm/FormContext';
import { ColProps } from '../Grid';
import { FormLabelAlign } from './interface';
import { RequiredMark } from './Form';
import { ValidateStatus } from './FormItem';

/** Form Context. Set top form style and pass to Form Item usage. */
export interface FormContextProps {
  vertical: boolean;
  name?: string;
  colon?: boolean;
  labelAlign?: FormLabelAlign;
  labelWrap?: boolean;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  requiredMark?: RequiredMark;
  itemRef: (name: (string | number)[]) => (node: React.ReactElement) => void;
}

export const FormContext = React.createContext<FormContextProps>({
  labelAlign: 'right',
  vertical: false,
  itemRef: (() => {}) as any,
});

/** `noStyle` Form Item Context. Used for error collection */
export type ReportMetaChange = (meta: Meta, uniqueKeys: React.Key[]) => void;
export const NoStyleItemContext = React.createContext<ReportMetaChange | null>(null);

/** Form Provider */
export interface FormProviderProps extends Omit<RcFormProviderProps, 'validateMessages'> {
  prefixCls?: string;
}

export const FormProvider: React.FC<FormProviderProps> = props => {
  const providerProps = omit(props, ['prefixCls']);
  return <RcFormProvider {...providerProps} />;
};

/** Used for ErrorList only */
export interface FormItemPrefixContextProps {
  prefixCls: string;
  status?: ValidateStatus;
}

export const FormItemPrefixContext = React.createContext<FormItemPrefixContextProps>({
  prefixCls: '',
});
