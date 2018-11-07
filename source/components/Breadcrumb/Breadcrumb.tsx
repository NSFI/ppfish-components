import * as React from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import warning from 'warning';
import BreadcrumbItem from './BreadcrumbItem';
import classNames from 'classnames';
import Icon from '../Icon';

export interface Route {
  path: string;
  breadcrumbName: string;
}

export interface BreadcrumbProps {
  prefixCls?: string;
  routes?: Route[];
  params?: any;
  separator?: React.ReactNode;
  itemRender?: (route: any, params: any, routes: Array<any>, paths: Array<string>) => React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  size?: string;
  maxWidth?: number;
}

function getBreadcrumbName(route: Route, params: any) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement,
  );
  return name;
}

function defaultItemRender(route: Route, params: any, routes: Route[], paths: string[]) {
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  return isLastItem
    ? <span>{name}</span>
    : <a href={`#/${paths.join('/')}`}>{name}</a>;
}

export default class Breadcrumb extends React.Component<BreadcrumbProps, any> {
  static Item: typeof BreadcrumbItem;

  static defaultProps = {
    prefixCls: 'fishd-breadcrumb',
    separator: <Icon type="arrow-line-regular" />,
    size: 'default'
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    size: PropTypes.string,
    separator: PropTypes.node,
    routes: PropTypes.array,
    params: PropTypes.object,
    linkRender: PropTypes.func,
    nameRender: PropTypes.func,
  };

  componentDidMount() {
    const props = this.props;
    warning(
      !('linkRender' in props || 'nameRender' in props),
      '`linkRender` and `nameRender` are removed, please use `itemRender` instead, ' +
      'see: https://u.ant.design/item-render.',
    );
  }

  render() {
    let crumbs;
    const {
      separator, prefixCls, style, className, routes, params = {},
      children, itemRender = defaultItemRender, maxWidth, size
    } = this.props;

    if (routes && routes.length > 0) {
      const paths: string[] = [];
      crumbs = routes.map((route) => {
        route.path = route.path || '';
        let path: string = route.path.replace(/^\//, '');
        Object.keys(params).forEach(key => {
          path = path.replace(`:${key}`, params[key]);
        });
        if (path) {
          paths.push(path);
        }
        return (
          <BreadcrumbItem separator={separator} key={route.breadcrumbName || path} maxWidth={maxWidth}>
            {itemRender(route, params, routes, paths)}
          </BreadcrumbItem>
        );
      });
    } else if (children) {
      crumbs = React.Children.map(children, (element: any, index) => {
        if (!element) {
          return element;
        }
        warning(
          element.type && element.type.__FISHD_BREADCRUMB_ITEM,
          'Breadcrumb only accepts Breadcrumb.Item as it\'s children',
        );
        return cloneElement(element, {
          separator,
          maxWidth,
          key: index,
        });
      });
    }

    let cls = classNames(className, prefixCls, {
      'small': size === 'small'
    });

    return (
      <div className={cls} style={style}>
        {crumbs}
      </div>
    );
  }
}
