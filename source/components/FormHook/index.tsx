import InternalForm, { useForm, FormInstance, FormProps } from './Form';
import Item, { FormItemProps } from './FormItem';
import ErrorList, { ErrorListProps } from './ErrorList';
import List, { FormListProps } from './FormList';
import { FormProvider } from './context';
import { Rule, RuleObject, RuleRender } from './rcFieldForm/interface';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  useForm: typeof useForm;
  Item: typeof Item;
  List: typeof List;
  ErrorList: typeof ErrorList;
  Provider: typeof FormProvider;

  /** @deprecated Only for warning usage. Do not use. */
  create: () => void;
}

const FormHook = InternalForm as FormInterface;

FormHook.Item = Item;
FormHook.List = List;
FormHook.ErrorList = ErrorList;
FormHook.useForm = useForm;
FormHook.Provider = FormProvider;

export {
  FormInstance,
  FormProps,
  FormItemProps,
  ErrorListProps,
  Rule,
  RuleObject,
  RuleRender,
  FormListProps,
};

export default FormHook;
