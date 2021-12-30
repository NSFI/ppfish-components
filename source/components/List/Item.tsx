import React from 'react';
import classNames from 'classnames';
import { Col } from '../Grid';
import { ListGridType, ColumnType } from './index';
import ListGridContext from './context';

export interface ListItemProps {
  className?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  actions?: Array<React.ReactNode>;
  grid?: ListGridType;
}

export interface ListItemMetaProps {
  avatar?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  description?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
}

export const Meta = (props: ListItemMetaProps) => {
  const { prefixCls = 'fishd-list', className, avatar, title, description, ...others } = props;

  const classString = classNames(`${prefixCls}-item-meta`, className);

  const content = (
    <div className={`${prefixCls}-item-meta-content`}>
      {title && <h4 className={`${prefixCls}-item-meta-title`}>{title}</h4>}
      {description && <div className={`${prefixCls}-item-meta-description`}>{description}</div>}
    </div>
  );

  return (
    <div {...others} className={classString}>
      {avatar && <div className={`${prefixCls}-item-meta-avatar`}>{avatar}</div>}
      {(title || description) && content}
    </div>
  );
};

function getGrid(grid: ListGridType, t: ColumnType) {
  return grid[t] && Math.floor(24 / grid[t]!);
}

export default class Item extends React.Component<ListItemProps, any> {
  static Meta: typeof Meta = Meta;

  static contextType = ListGridContext

  context!: React.ContextType<typeof ListGridContext>

  render() {
    const { grid } = this.context;
    const { prefixCls = 'fishd-list', children, actions, extra, className, ...others } = this.props;
    const classString = classNames(`${prefixCls}-item`, className);

    const metaContent: React.ReactElement<any>[] = [];

    const otherContent: React.ReactElement<any>[] = [];

    React.Children.forEach(children, (element: React.ReactElement<any>) => {
      if (element && element.type && element.type === Meta) {
        metaContent.push(element);
      } else {
        otherContent.push(element);
      }
    });

    const contentClassString = classNames(`${prefixCls}-item-content`, {
      [`${prefixCls}-item-content-single`]: metaContent.length < 1
    });
    const content =
      otherContent.length > 0 ? <div className={contentClassString}>{otherContent}</div> : null;

    let actionsContent;
    if (actions && actions.length > 0) {
      const actionsContentItem = (action: React.ReactNode, i: number) => (
        <li key={`${prefixCls}-item-action-${i}`}>
          {action}
          {i !== actions.length - 1 && <em className={`${prefixCls}-item-action-split`} />}
        </li>
      );
      actionsContent = (
        <ul className={`${prefixCls}-item-action`}>
          {actions.map((action, i) => actionsContentItem(action, i))}
        </ul>
      );
    }

    const extraContent = (
      <div className={`${prefixCls}-item-extra-wrap`}>
        <div className={`${prefixCls}-item-main`}>
          {metaContent}
          {content}
          {actionsContent}
        </div>
        <div className={`${prefixCls}-item-extra`}>{extra}</div>
      </div>
    );

    const mainContent = grid ? (
      <Col
        span={getGrid(grid, 'column')}
        xs={getGrid(grid, 'xs')}
        sm={getGrid(grid, 'sm')}
        md={getGrid(grid, 'md')}
        lg={getGrid(grid, 'lg')}
        xl={getGrid(grid, 'xl')}
        xxl={getGrid(grid, 'xxl')}
      >
        <div {...others} className={classString}>
          {extra && extraContent}
          {!extra && metaContent}
          {!extra && content}
          {!extra && actionsContent}
        </div>
      </Col>
    ) : (
      <div {...others} className={classString}>
        {extra && extraContent}
        {!extra && metaContent}
        {!extra && content}
        {!extra && actionsContent}
      </div>
    );

    return mainContent;
  }
}
