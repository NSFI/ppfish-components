import * as React from 'react';
import { useForm as useRcForm, FormInstance as RcFormInstance } from '../rcFieldForm';
import scrollIntoView from 'scroll-into-view-if-needed';
import { ScrollOptions, NamePath, InternalNamePath } from '../interface';
import { toArray, getFieldId } from '../util';

export interface FormInstance<Values = any> extends RcFormInstance<Values> {
  scrollToField: (name: NamePath, options?: ScrollOptions) => void;
  /** This is an internal usage. Do not use in your prod */
  __INTERNAL__: {
    /** No! Do not use this in your code! */
    name?: string;
    /** No! Do not use this in your code! */
    itemRef: (name: InternalNamePath) => (node: React.ReactElement) => void;
  };
  getFieldInstance: (name: NamePath) => any;
}

function toNamePathStr(name: NamePath) {
  const namePath = toArray(name);
  return namePath.join('_');
}

export default function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] {
  const [rcForm] = useRcForm();
  const itemsRef = React.useRef<Record<string, React.ReactElement>>({});

  const wrapForm: FormInstance<Values> = React.useMemo(
    () =>
      form ?? {
        ...rcForm,
        __INTERNAL__: {
          itemRef: (name: InternalNamePath) => (node: React.ReactElement) => {
            const namePathStr = toNamePathStr(name);
            if (node) {
              itemsRef.current[namePathStr] = node;
            } else {
              delete itemsRef.current[namePathStr];
            }
          },
        },
        scrollToField: (name: NamePath, options: ScrollOptions = {}) => {
          const namePath = toArray(name);
          const fieldId = getFieldId(namePath, wrapForm.__INTERNAL__.name);
          const node: HTMLElement | null = fieldId ? document.getElementById(fieldId) : null;

          if (node) {
            scrollIntoView(node, {
              scrollMode: 'if-needed',
              block: 'nearest',
              ...options,
            });
          }
        },
        getFieldInstance: (name: NamePath) => {
          const namePathStr = toNamePathStr(name);
          return itemsRef.current[namePathStr];
        },
      },
    [form, rcForm],
  );

  return [wrapForm];
}
