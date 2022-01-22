import * as React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import { Field, FormInstance, FieldContext, ListContext } from './rcFieldForm';
import { FieldProps } from './rcFieldForm/Field';
import { Meta, NamePath } from './rcFieldForm/interface';
import { supportRef } from 'rc-util/lib/ref';
import omit from 'rc-util/lib/omit';
import { Row } from '../Grid';
import { tuple } from '../../utils/type';
import warning from '../../utils/warning';
import FormItemLabel, { FormItemLabelProps, LabelTooltipType } from './FormItemLabel';
import FormItemInput, { FormItemInputProps } from './FormItemInput';
import { FormContext, NoStyleItemContext } from './context';
import { toArray, getFieldId } from './util';
import { cloneElement, isValidElement } from '../../utils/reactNode';
import useFrameState from './hooks/useFrameState';
import useDebounce from './hooks/useDebounce';
import useItemRef from './hooks/useItemRef';

const NAME_SPLIT = '__SPLIT__';

interface FieldError {
  errors: string[];
  warnings: string[];
}

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type ValidateStatus = typeof ValidateStatuses[number];

type RenderChildren<Values = any> = (form: FormInstance<Values>) => React.ReactNode;
type RcFieldProps<Values = any> = Omit<FieldProps<Values>, 'children'>;
type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactNode;

interface MemoInputProps {
  value: any;
  update: any;
  children: React.ReactNode;
}

const MemoInput = React.memo(
  ({ children }: MemoInputProps) => children as JSX.Element,
  (prev, next) => prev.value === next.value && prev.update === next.update,
);

export interface FormItemProps<Values = any>
  extends FormItemLabelProps,
    FormItemInputProps,
    RcFieldProps<Values> {
  prefixCls?: string;
  noStyle?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: ChildrenType<Values>;
  id?: string;
  hasFeedback?: boolean;
  validateStatus?: ValidateStatus;
  required?: boolean;
  hidden?: boolean;
  initialValue?: any;
  messageVariables?: Record<string, string>;
  tooltip?: LabelTooltipType;
  /** @deprecated No need anymore */
  fieldKey?: React.Key | React.Key[];
}

function hasValidName(name?: NamePath): Boolean {
  if (name === null) {
    warning(false, 'Form.Item' + '`null` is passed as `name` property');
  }
  return !(name === undefined || name === null);
}

function genEmptyMeta(): Meta {
  return {
    errors: [],
    warnings: [],
    touched: false,
    validating: false,
    name: [],
  };
}

function FormItem<Values = any>(props: FormItemProps<Values>): React.ReactElement {
  const {
    name,
    noStyle,
    dependencies,
    prefixCls,
    style,
    className,
    shouldUpdate,
    hasFeedback,
    help,
    rules,
    validateStatus,
    children,
    required,
    label,
    messageVariables,
    trigger = 'onChange',
    validateTrigger,
    hidden,
    ...restProps
  } = props;
  const { name: formName, requiredMark } = useContext(FormContext);
  const isRenderProps = typeof children === 'function';
  const notifyParentMetaChange = useContext(NoStyleItemContext);

  const { validateTrigger: contextValidateTrigger } = useContext(FieldContext);
  const mergedValidateTrigger =
    validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  const hasName = hasValidName(name);

  // ========================= MISC =========================
  // Get `noStyle` required info
  const listContext = React.useContext(ListContext);
  const fieldKeyPathRef = React.useRef<React.Key[]>();

  // ======================== Errors ========================
  // >>>>> Collect sub field errors
  const [subFieldErrors, setSubFieldErrors] = useFrameState<Record<string, FieldError>>({});

  // >>>>> Current field errors
  const [meta, setMeta] = React.useState<Meta>(() => genEmptyMeta());

  const onMetaChange = (nextMeta: Meta & { destroy?: boolean }) => {
    // This keyInfo is not correct when field is removed
    // Since origin keyManager no longer keep the origin key anymore
    // Which means we need cache origin one and reuse when removed
    const keyInfo = listContext?.getKey(nextMeta.name);

    // Destroy will reset all the meta
    setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta);

    // Bump to parent since noStyle
    if (noStyle && notifyParentMetaChange) {
      let namePath = nextMeta.name;

      if (!nextMeta.destroy) {
        if (keyInfo !== undefined) {
          const [fieldKey, restPath] = keyInfo;
          namePath = [fieldKey, ...restPath];
          fieldKeyPathRef.current = namePath;
        }
      } else {
        // Use origin cache data
        namePath = fieldKeyPathRef.current || namePath;
      }
      notifyParentMetaChange(nextMeta, namePath);
    }
  };

  // >>>>> Collect noStyle Field error to the top FormItem
  const onSubItemMetaChange = (subMeta: Meta & { destroy: boolean }, uniqueKeys: React.Key[]) => {
    // Only `noStyle` sub item will trigger
    setSubFieldErrors(prevSubFieldErrors => {
      const clone = {
        ...prevSubFieldErrors,
      };

      // name: ['user', 1] + key: [4] = ['user', 4]
      const mergedNamePath = [...subMeta.name.slice(0, -1), ...uniqueKeys];
      const mergedNameKey = mergedNamePath.join(NAME_SPLIT);

      if (subMeta.destroy) {
        // Remove
        delete clone[mergedNameKey];
      } else {
        // Update
        clone[mergedNameKey] = subMeta;
      }

      return clone;
    });
  };

  // >>>>> Get merged errors
  const [mergedErrors, mergedWarnings] = React.useMemo(() => {
    const errorList: string[] = [...meta.errors];
    const warningList: string[] = [...meta.warnings];

    Object.values(subFieldErrors).forEach(subFieldError => {
      errorList.push(...(subFieldError.errors || []));
      warningList.push(...(subFieldError.warnings || []));
    });

    return [errorList, warningList];
  }, [subFieldErrors, meta.errors, meta.warnings]);

  const debounceErrors = useDebounce(mergedErrors);
  const debounceWarnings = useDebounce(mergedWarnings);

  // ===================== Children Ref =====================
  const getItemRef = useItemRef();

  // ======================== Render ========================
  function renderLayout(
    baseChildren: React.ReactNode,
    fieldId?: string,
    isRequired?: boolean,
  ): React.ReactNode {
    if (noStyle && !hidden) {
      return baseChildren;
    }
    // ======================== Status ========================
    let mergedValidateStatus: ValidateStatus = '';
    if (validateStatus !== undefined) {
      mergedValidateStatus = validateStatus;
    } else if (meta?.validating) {
      mergedValidateStatus = 'validating';
    } else if (debounceErrors.length) {
      mergedValidateStatus = 'error';
    } else if (debounceWarnings.length) {
      mergedValidateStatus = 'warning';
    } else if (meta?.touched) {
      mergedValidateStatus = 'success';
    }

    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-with-help`]: help || debounceErrors.length || debounceWarnings.length,
      [`${className}`]: !!className,

      // Status
      [`${prefixCls}-item-has-feedback`]: mergedValidateStatus && hasFeedback,
      [`${prefixCls}-item-has-success`]: mergedValidateStatus === 'success',
      [`${prefixCls}-item-has-warning`]: mergedValidateStatus === 'warning',
      [`${prefixCls}-item-has-error`]: mergedValidateStatus === 'error',
      [`${prefixCls}-item-is-validating`]: mergedValidateStatus === 'validating',
      [`${prefixCls}-item-hidden`]: hidden,
    };

    // ======================= Children =======================
    return (
      <Row
        className={classNames(itemClassName)}
        style={style}
        key="row"
        {...omit(restProps, [
          'colon',
          'extra',
          'fieldKey',
          'getValueFromEvent',
          'getValueProps',
          'htmlFor',
          'id', // It is deprecated because `htmlFor` is its replacement.
          'initialValue',
          'isListField',
          'labelAlign',
          'labelWrap',
          'labelCol',
          'normalize',
          'preserve',
          'tooltip',
          'validateFirst',
          'valuePropName',
          'wrapperCol',
          '_internalItemRender' as any,
        ])}
      >
        {/* Label */}
        <FormItemLabel
          htmlFor={fieldId}
          required={isRequired}
          requiredMark={requiredMark}
          {...props}
          prefixCls={prefixCls}
        />
        {/* Input Group */}
        <FormItemInput
          {...props}
          {...meta}
          errors={debounceErrors}
          warnings={debounceWarnings}
          prefixCls={prefixCls}
          status={mergedValidateStatus}
          validateStatus={mergedValidateStatus}
          help={help}
        >
          <NoStyleItemContext.Provider value={onSubItemMetaChange}>
            {baseChildren}
          </NoStyleItemContext.Provider>
        </FormItemInput>
      </Row>
    );
  }

  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(children) as JSX.Element;
  }

  let variables: Record<string, string> = {};
  if (typeof label === 'string') {
    variables.label = label;
  } else if (name) {
    variables.label = String(name);
  }
  if (messageVariables) {
    variables = { ...variables, ...messageVariables };
  }

  // >>>>> With Field
  return (
    <Field
      {...props}
      messageVariables={variables}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
      onMetaChange={onMetaChange}
    >
      {(control, renderMeta, context) => {
        const mergedName = toArray(name).length && renderMeta ? renderMeta.name : [];
        const fieldId = getFieldId(mergedName, formName);

        const isRequired =
          required !== undefined
            ? required
            : !!(
                rules &&
                rules.some(rule => {
                  if (rule && typeof rule === 'object' && rule.required && !rule.warningOnly) {
                    return true;
                  }
                  if (typeof rule === 'function') {
                    const ruleEntity = rule(context);
                    return ruleEntity && ruleEntity.required && !ruleEntity.warningOnly;
                  }
                  return false;
                })
              );

        // ======================= Children =======================
        const mergedControl: typeof control = {
          ...control,
        };

        let childNode: React.ReactNode = null;

        warning(
          !(shouldUpdate && dependencies),
          'Form.Item' +
            "`shouldUpdate` and `dependencies` shouldn't be used together." +
            ' See https://ant.design/components/form/#dependencies.',
        );
        if (Array.isArray(children) && hasName) {
          warning(false, 'Form.Item'+
            ' `children` is array of render props cannot have `name`.');
          childNode = children;
        } else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {
          warning(
            !!(shouldUpdate || dependencies),
            'Form.Item' +
              '`children` of render props only work with `shouldUpdate` or `dependencies`.',
          );
          warning(
            !hasName,
            'Form.Item' +
              "Do not use `name` with `children` of render props since it's not a field.",
          );
        } else if (dependencies && !isRenderProps && !hasName) {
          warning(
            false,
            'Form.Item' + 'Must set `name` or use render props when `dependencies` is set.',
          );
        } else if (isValidElement(children)) {
          warning(
            children.props.defaultValue === undefined,
            'Form.Item ' +
              '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.',
          );

          const childProps = { ...children.props, ...mergedControl };
          if (!childProps.id) {
            childProps.id = fieldId;
          }

          if (supportRef(children)) {
            childProps.ref = getItemRef(mergedName, children);
          }

          // We should keep user origin event handler
          const triggers = new Set<string>([
            ...toArray(trigger),
            ...toArray(mergedValidateTrigger),
          ]);

          triggers.forEach(eventName => {
            childProps[eventName] = (...args: any[]) => {
              mergedControl[eventName]?.(...args);
              children.props[eventName]?.(...args);
            };
          });

          childNode = (
            <MemoInput value={mergedControl[props.valuePropName || 'value']} update={children}>
              {cloneElement(children, childProps)}
            </MemoInput>
          );
        } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
          childNode = (children as RenderChildren)(context);
        } else {
          warning(
            !mergedName.length,
            'Form.Item' +
              '`name` is only used for validate React element. ' +
              'If you are using Form.Item as layout display, please remove `name` instead.',
          );
          childNode = children;
        }

        return renderLayout(childNode, fieldId, isRequired);
      }}
    </Field>
  );
}

FormItem.defaultProps = {
  hasFeedback: false,
  prefixCls: 'fishd-form',
  colon: true
};

export default FormItem;
