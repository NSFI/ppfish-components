import  React, { useMemo } from 'react';
import classNames from 'classnames';
import FieldForm, { List } from './rcFieldForm';
import { FormProps as RcFormProps } from './rcFieldForm/Form';
import { ValidateErrorEntity } from './rcFieldForm/interface';
import { Options } from 'scroll-into-view-if-needed';
import { ColProps } from '../Grid';
import { FormContext, FormContextProps } from './context';
import { FormLabelAlign } from './interface';
import useForm, { FormInstance } from './hooks/useForm';
export type RequiredMark = boolean | 'optional';
export type FormLayout = 'horizontal' | 'inline' | 'vertical';

/**
 * 没有添加 Size
 * config context 中的全局配置未添加 getPrefixCls, direction, form 等情况
 * RequiredMark 暂不实现
 * colon 特意删除
 *
 * TODO 验证defaultProps
 */

export interface FormProps<Values = any> extends Omit<RcFormProps<Values>, 'form'> {
  prefixCls?: string;
  name?: string;
  layout?: FormLayout;
  labelAlign?: FormLabelAlign;
  labelWrap?: boolean;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  form?: FormInstance<Values>;
  scrollToFirstError?: Options | boolean;
  hideRequiredMark?: boolean;
}

const InternalForm: React.ForwardRefRenderFunction<FormInstance, FormProps> = (props, ref) => {

  const {
    prefixCls,
    className = '',
    form,
    labelAlign,
    labelWrap,
    labelCol,
    wrapperCol,
    hideRequiredMark,
    layout = 'horizontal',
    scrollToFirstError,
    onFinishFailed,
    name,
    ...restFormProps
  } = props;

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-horizontal`]: layout === 'horizontal',
      [`${prefixCls}-vertical`]: layout === 'vertical',
      [`${prefixCls}-inline`]: layout === 'inline',
      [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
    },
    className,
  );

  const [wrapForm] = useForm(form);
  const { __INTERNAL__ } = wrapForm;
  __INTERNAL__.name = name;

  const formContextValue = useMemo<FormContextProps>(
    () => ({
      name,
      labelAlign,
      labelCol,
      labelWrap,
      wrapperCol,
      vertical: layout === 'vertical',
      requiredMark: hideRequiredMark,
      itemRef: __INTERNAL__.itemRef,
    }),
    [name, labelAlign, labelCol, wrapperCol, layout, hideRequiredMark],
  );

  React.useImperativeHandle(ref, () => wrapForm);

  const onInternalFinishFailed = (errorInfo: ValidateErrorEntity) => {
    onFinishFailed?.(errorInfo);

    let defaultScrollToFirstError: Options = { block: 'nearest' };

    if (scrollToFirstError && errorInfo.errorFields.length) {
      if (typeof scrollToFirstError === 'object') {
        defaultScrollToFirstError = scrollToFirstError;
      }
      wrapForm.scrollToField(errorInfo.errorFields[0].name, defaultScrollToFirstError);
    }
  };

  return (
      <FormContext.Provider value={formContextValue}>
        <FieldForm
          id={name}
          {...restFormProps}
          name={name}
          onFinishFailed={onInternalFinishFailed}
          form={wrapForm}
          className={formClassName}
        />
      </FormContext.Provider>
  );
};


// 验证下被 forwardRef 包装后是否有效
(InternalForm as any).defaultProps = {
  prefixCls: 'fishd-form',
  layout: 'horizontal' as FormLayout,
  hideRequiredMark: false,
  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  },
}

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;


export { useForm, List, FormInstance };

export default Form;
