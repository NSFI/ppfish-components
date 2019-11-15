import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '../Tooltip/index.tsx';
import ResizeObserver from 'resize-observer-polyfill';

/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */

const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

const TooltipOverlayStyle = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
};

export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0;
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, '');
};

const EllipsisText = ({text, length, tooltip, fullWidthRecognition, tooltipProps, ...other}) => {
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
  const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
  if (textLength <= length || length < 0) {
    return <span {...other}>{text}</span>;
  }
  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  if (tooltip) {
    return (
      <Tooltip {...tooltipProps} overlayStyle={TooltipOverlayStyle} title={text}>
        <span>
          {displayText}
          {tail}
        </span>
      </Tooltip>
    );
  }

  return (
    <span {...other}>
      {displayText}
      {tail}
    </span>
  );
};

EllipsisText.propTypes = {
  text: PropTypes.string,
  length: PropTypes.number,
  tooltip: PropTypes.bool,
  fullWidthRecognition: PropTypes.bool,
  tooltipProps: PropTypes.object,
};


export default class Ellipsis extends Component {

  static defaultProps = {
    prefix: 'fishd-ellipsis',
    fullWidthRecognition: false,
    tooltip: true,
    tooltipProps: {},
  };

  static propTypes = {
    prefix: PropTypes.string,
    lines: PropTypes.number,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    length: PropTypes.number,
    tooltip: PropTypes.bool,
    tooltipProps: PropTypes.object,
    fullWidthRecognition: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
  };

  state = {
    text: '',
    targetCount: 0,
    isEllipsisActive: false,
  };

  componentDidMount() {
    if (this.node) {
      this.computeLine();
    }
    // detect ellipsis active in width/lines mode
    if (this.props.width || this.props.lines) {
      let target;
      if (this.props.width) {
        target = this.widthNode;
      } else if (this.props.lines && isSupportLineClamp) {
        target = this.lineClampNode;
      } else {
        return;
      }
      this.detectEllipsisActive(target);
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          if (entry.target === target) {
            this.detectEllipsisActive(target);
          }
        });
      });
      this.resizeObserver.observe(target);
    }
  }

  componentDidUpdate(perProps) {
    const {lines, children} = this.props;
    if (lines !== perProps.lines || children !== perProps.children) {
      this.computeLine();
    }
  }

  componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect();
  }

  detectEllipsisActive = (node) => {
    this.setState({
      isEllipsisActive: node.offsetHeight < node.scrollHeight || node.offsetWidth < node.scrollWidth
    });
  };

  computeLine = () => {
    const {lines} = this.props;
    if (lines && !isSupportLineClamp) {
      const text = this.shadowChildren.innerText || this.shadowChildren.textContent;
      const lineHeight = parseInt(getComputedStyle(this.root).lineHeight, 10);
      const targetHeight = lines * lineHeight;
      this.content.style.height = `${targetHeight}px`;
      const totalHeight = this.shadowChildren.offsetHeight;
      const shadowNode = this.shadow.firstChild;

      if (totalHeight <= targetHeight) {
        this.setState({
          text,
          targetCount: text.length,
        });
        return;
      }

      // bisection
      const len = text.length;
      const mid = Math.ceil(len / 2);

      const count = this.bisection(targetHeight, mid, 0, len, text, shadowNode);

      this.setState({
        text,
        targetCount: count,
      });
    }
  };

  bisection = (th, m, b, e, text, shadowNode) => {
    const suffix = '...';
    let mid = m;
    let end = e;
    let begin = b;
    shadowNode.innerHTML = text.substring(0, mid) + suffix;
    let sh = shadowNode.offsetHeight;

    if (sh <= th) {
      shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh > th || mid === begin) {
        return mid;
      }
      begin = mid;
      if (end - begin === 1) {
        mid = 1 + begin;
      } else {
        mid = Math.floor((end - begin) / 2) + begin;
      }
      return this.bisection(th, mid, begin, end, text, shadowNode);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh <= th) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;
    return this.bisection(th, mid, begin, end, text, shadowNode);
  };

  handleRoot = n => {
    this.root = n;
  };

  handleContent = n => {
    this.content = n;
  };

  handleNode = n => {
    this.node = n;
  };

  handleShadow = n => {
    this.shadow = n;
  };

  handleShadowChildren = n => {
    this.shadowChildren = n;
  };

  render() {
    const {text, targetCount, isEllipsisActive} = this.state;
    const {
      children,
      lines,
      length,
      width,
      className,
      tooltip,
      style,
      fullWidthRecognition,
      prefix,
      tooltipProps,
      ...restProps
    } = this.props;

    const cls = classNames(`${prefix}-ellipsis`, className, {
      [`${prefix}-width-mode`]: width,
      [`${prefix}-line`]: lines && !isSupportLineClamp,
      [`${prefix}-lineClamp`]: lines && isSupportLineClamp,
    });

    // 一种限制都没有返回原值
    if (!lines && !length && !width) {
      return (
        <span className={cls} {...restProps}>
          {children}
        </span>
      );
    }

    // 宽度限制
    if (width) {
      const node = (
        <span ref={node => this.widthNode = node} className={cls} {...restProps} style={{...style, maxWidth: width}}>
          {children}
        </span>
      );
      return tooltip ? (
        <Tooltip {...tooltipProps} overlayStyle={TooltipOverlayStyle} title={isEllipsisActive ? children : null}>
          {node}
        </Tooltip>
      ) : (
        node
      );
    }

    // 字数限制
    if (length) {
      return (
        <EllipsisText
          className={cls}
          tooltipProps={tooltipProps}
          length={length}
          text={children || ''}
          tooltip={tooltip}
          fullWidthRecognition={fullWidthRecognition}
          {...restProps}
        />
      );
    }

    //行数限制
    const id = `fishd-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;

    // support document.body.style.webkitLineClamp
    if (isSupportLineClamp) {
      const style = `#${id}{-webkit-line-clamp:${lines};-webkit-box-orient: vertical;}`;

      const node = (
        <div ref={node => this.lineClampNode = node} id={id} className={cls} {...restProps}>
          <style>{style}</style>
          {children}
        </div>
      );

      return tooltip ? (
        <Tooltip {...tooltipProps} overlayStyle={TooltipOverlayStyle} title={isEllipsisActive ? children : null}>
          {node}
        </Tooltip>
      ) : (
        node
      );
    }

    const childNode = (
      <span ref={this.handleNode}>
        {targetCount > 0 && text.substring(0, targetCount)}
        {targetCount > 0 && targetCount < text.length && '...'}
      </span>
    );

    return (
      <div {...restProps} ref={this.handleRoot} className={cls}>
        <div ref={this.handleContent}>
          {tooltip ? (
            <Tooltip overlayStyle={TooltipOverlayStyle} title={text}>
              {childNode}
            </Tooltip>
          ) : (
            childNode
          )}
          <div className={`${prefix}-shadow`} ref={this.handleShadowChildren}>
            {children}
          </div>
          <div className={`${prefix}-shadow`} ref={this.handleShadow}>
            <span>{text}</span>
          </div>
        </div>
      </div>
    );
  }
}
