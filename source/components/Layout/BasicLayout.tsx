import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { BasicProps } from './Layout';

export default class BasicLayout extends React.Component<BasicProps, any> {
  static childContextTypes = {
    siderHook: PropTypes.object
  };
  state = { siders: [] };

  getChildContext() {
    return {
      siderHook: {
        addSider: (id: string) => {
          this.setState({
            siders: [...this.state.siders, id]
          });
        },
        removeSider: (id: string) => {
          this.setState({
            siders: this.state.siders.filter(currentId => currentId !== id)
          });
        }
      }
    };
  }

  render() {
    const { prefixCls, className, children, hasSider, ...others } = this.props;
    const divCls = classNames(className, prefixCls, {
      [`${prefixCls}-has-sider`]: hasSider || this.state.siders.length > 0
    });
    return (
      <div className={divCls} {...others}>
        {children}
      </div>
    );
  }
}
