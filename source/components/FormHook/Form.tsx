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
 * 没有添加 Size  需要有一个全局的 SizeContext, 所有组件都要配合
 * config context 中的全局配置未添加 getPrefixCls, direction, form 等情况
 * RequiredMark - optional, rtl 暂不实现
 * colon 特意删除
 *
 * antd 中 form 的表单标签可换行功能 需要 Col 组件的支持
 *
 * 缺少 Space 组件
 *
 * 因为 Col 组件的不一样, 导致 form 的 layout 即使默认是horizontal, 如果没传span, 也会和 vertical 一样
 *
 * FormItem hasFeedback 属性没有 FormItemStatusContext 支持, 这里使用老的一套 有.has-feedback属性 input 则显示
 *
 * 置空存在在现在的Col 组件上存在动画问题, 查看高级搜索 demo, 去除 fields 样式
 *
 * DatePicker 中不能选择月, 待加强
 *
 * DateRangePicker 第一次点击时有 warning 需要处理  `DateTable: prop type `rangeState.endDate` is invalid`
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




const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

(Form as any).defaultProps = {
  prefixCls: 'fishd-formHook',
  layout: 'horizontal',
  labelAlign: 'left', // 按照 Form 的标准 默认靠左
  hideRequiredMark: false,
  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  },
}


export { useForm, List, FormInstance };

export default Form;
