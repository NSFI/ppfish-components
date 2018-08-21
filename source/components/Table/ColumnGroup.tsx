import * as React from 'react';

export interface ColumnGroupProps {
  title?: React.ReactNode;
}

export default class ColumnGroup extends React.Component<ColumnGroupProps, React.ComponentState> {
  static __FISHD_TABLE_COLUMN_GROUP = true;
}
