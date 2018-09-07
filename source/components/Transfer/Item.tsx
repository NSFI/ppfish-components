import * as React from 'react';
import classNames from 'classnames';
import PureRenderMixin from '../Checkbox/src/PureRenderMixin';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import Lazyload from 'react-lazy-load';

export default class Item extends React.Component<any, any> {
  shouldComponentUpdate(...args: any[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  render() {
    const {
      mode,
      direction,
      renderedText,
      renderedEl,
      item,
      lazy,
      checked,
      prefixCls,
      onClick,
      onClose
    } = this.props;

    const className = classNames({
      [`${prefixCls}-content-item`]: true,
      [`${prefixCls}-content-item-disabled`]: item.disabled,
    });

    const listItem = (
      <li
        className={className}
        title={renderedText}
      >
        <span className={`${prefixCls}-content-item-text`} onClick={item.disabled ? undefined : () => onClick(item, direction)}>
          { mode === 'multiple' ? <Checkbox checked={checked} disabled={item.disabled} /> : null }
          <span>{renderedEl}</span>
        </span>
        {
          mode === 'single' && direction === 'right' ?
            <span className={`${prefixCls}-content-item-close`} onClick={item.disabled ? undefined : () => onClose(item)}>
              <Icon type="close-modal-line"/>
            </span>
            : null
        }
      </li>
    );
    let children: JSX.Element | null = null;
    if (lazy) {
      const lazyProps = {
        height: 32,
        offset: 500,
        throttle: 0,
        debounce: false,
        ...lazy,
      };
      children = <Lazyload {...lazyProps}>{listItem}</Lazyload>;
    } else {
      children = listItem;
    }

    return children;
  }
}

