/// <reference module="dom">
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
let enquire: any;
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
    } as any as MediaQueryList;
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  enquire = require('enquire.js');
}

import * as React from 'react';
import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Partial<Record<Breakpoint, string>>;

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | Partial<Record<Breakpoint, number>>;
  type?: 'flex';
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  prefixCls?: string;
}

export interface RowState {
  screens: BreakpointMap;
}

const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

const Row: React.FC<RowProps> = props => {
  const {
    gutter,
    type,
    justify,
    align,
    className,
    style,
    children,
    prefixCls = 'fishd-row',
    ...others
  } = props;

  const [screens, setScreens] = React.useState({});
  React.useEffect(() => {
    Object.keys(responsiveMap).map((screen: Breakpoint) =>
      enquire.register(responsiveMap[screen], {
        match: () => {
          if (typeof gutter !== 'object') {
            return;
          }

          setScreens({ ...screens, [screen]: true });
        },
        unmatch: () => {
          if (typeof gutter !== 'object') {
            return;
          }
          setScreens({ ...screens, [screen]: false });
        },
        // Keep a empty destory to avoid triggering unmatch when unregister
        destroy() {},
      }),
    );

    return () => {
      Object.keys(responsiveMap).map((screen: Breakpoint) =>
        enquire.unregister(responsiveMap[screen]),
      );
    };
  }, []);

  const getGutter = () => {
    if (typeof gutter === 'object') {
      for (let i = 0; i <= responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
          return gutter[breakpoint];
        }
      }
    }
    return gutter;
  };

  const calcGutter = getGutter();

  const getClasses = () =>
    classNames(
      {
        [prefixCls]: !type,
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${type}-${justify}`]: type && justify,
        [`${prefixCls}-${type}-${align}`]: type && align,
      },
      className,
    );

  const getStyle = () =>
    (calcGutter as number) > 0
      ? {
          marginLeft: (calcGutter as number) / -2,
          marginRight: (calcGutter as number) / -2,
          ...style,
        }
      : style;

  const cols = Children.map(children, (col: React.ReactElement<HTMLDivElement>) => {
    if (!col) {
      return null;
    }
    if (col.props && (calcGutter as number) > 0) {
      return cloneElement(col, {
        style: {
          paddingLeft: (calcGutter as number) / 2,
          paddingRight: (calcGutter as number) / 2,
          ...col.props.style,
        },
      });
    }
    return col;
  });

  const otherProps = { ...others };

  return (
    <div {...otherProps} className={getClasses()} style={getStyle()}>
      {cols}
    </div>
  );
};

Row.defaultProps = {
  gutter: 0,
};

export default Row;
