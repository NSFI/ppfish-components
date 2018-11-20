var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import PropTypes from 'prop-types';
import * as React from 'react';
import Icon from '../Icon';
import { Circle } from './src/index.js';
import classNames from 'classnames';
import './style/index.less';
const statusColorMap = {
    normal: '#108ee9',
    exception: '#ff5500',
    success: '#87d068',
};
const validProgress = (progress) => {
    if (!progress || progress < 0) {
        return 0;
    }
    else if (progress > 100) {
        return 100;
    }
    return progress;
};
export default class Progress extends React.Component {
    render() {
        const props = this.props;
        const { prefixCls, className, percent = 0, status, format, trailColor, size, successPercent, type, strokeWidth, width, showInfo, gapDegree = 0, gapPosition, strokeColor, strokeLinecap = 'round', extraContent, message, operation } = props, restProps = __rest(props, ["prefixCls", "className", "percent", "status", "format", "trailColor", "size", "successPercent", "type", "strokeWidth", "width", "showInfo", "gapDegree", "gapPosition", "strokeColor", "strokeLinecap", "extraContent", "message", "operation"]);
        const progressStatus = parseInt((successPercent ? successPercent.toString() : percent.toString()), 10) >= 100 &&
            !('status' in props) ? 'success' : (status || 'normal');
        let progressInfo;
        let progress;
        const textFormatter = format || (percentNumber => `${percentNumber}%`);
        if (showInfo) {
            let text;
            const iconType = (type === 'circle' || type === 'dashboard') ? 'hints-alone-' : 'hints-';
            if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
                text = textFormatter(validProgress(percent), validProgress(successPercent));
            }
            else if (progressStatus === 'exception') {
                text = React.createElement(Icon, { type: `${iconType}error` });
            }
            else if (progressStatus === 'success') {
                text = React.createElement(Icon, { type: `${iconType}success` });
            }
            progressInfo = React.createElement("span", { className: `${prefixCls}-text` }, text);
        }
        if (type === 'line') {
            const percentStyle = {
                width: `${validProgress(percent)}%`,
                height: strokeWidth || (size === 'small' ? 6 : 8),
                background: strokeColor,
                borderRadius: strokeLinecap === 'square' ? 0 : '100px',
            };
            const successPercentStyle = {
                width: `${validProgress(successPercent)}%`,
                height: strokeWidth || (size === 'small' ? 6 : 8),
                borderRadius: strokeLinecap === 'square' ? 0 : '100px',
            };
            const successSegment = successPercent !== undefined
                ? React.createElement("div", { className: `${prefixCls}-success-bg`, style: successPercentStyle })
                : null;
            progress = (React.createElement("div", { className: `${prefixCls}-line-ctner` },
                React.createElement("div", { className: `${prefixCls}-basic` },
                    React.createElement("div", { className: `${prefixCls}-outer` },
                        React.createElement("div", { className: `${prefixCls}-inner` },
                            React.createElement("div", { className: `${prefixCls}-bg`, style: percentStyle }, extraContent ? React.createElement("div", { className: `${prefixCls}-extra` }, extraContent) : null),
                            successSegment)),
                    progressInfo),
                message ? React.createElement("span", { className: `${prefixCls}-msg` }, message) : null,
                operation ? React.createElement("span", { className: `${prefixCls}-oper` }, operation) : null));
        }
        else if (type === 'circle' || type === 'dashboard') {
            const circleSize = width || 120;
            const circleStyle = {
                width: circleSize,
                height: circleSize,
                fontSize: circleSize * 0.15 + 6,
            };
            const circleWidth = strokeWidth || 6;
            const gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top';
            const gapDeg = gapDegree || type === 'dashboard' && 75;
            progress = (React.createElement("div", { className: `${prefixCls}-inner`, style: circleStyle },
                React.createElement(Circle, { percent: validProgress(percent), strokeWidth: circleWidth, trailWidth: circleWidth, strokeColor: statusColorMap[progressStatus], strokeLinecap: strokeLinecap, trailColor: trailColor, prefixCls: prefixCls, gapDegree: gapDeg, gapPosition: gapPos }),
                React.createElement("div", { className: `${prefixCls}-circle-info` },
                    progressInfo,
                    message ? React.createElement("span", { className: `${prefixCls}-msg` }, message) : null)));
        }
        const classString = classNames(prefixCls, {
            [`${prefixCls}-${type === 'dashboard' && 'circle' || type}`]: true,
            [`${prefixCls}-status-${progressStatus}`]: true,
            [`${prefixCls}-show-info`]: showInfo,
            [`${prefixCls}-${size}`]: size,
        }, className);
        return (React.createElement("div", Object.assign({}, restProps, { className: classString }),
            progress,
            (type === 'circle' || type === 'dashboard') && operation
                ? React.createElement("span", { className: `${prefixCls}-oper` }, operation)
                : null));
    }
}
Progress.defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    prefixCls: 'fishd-progress',
    size: 'default',
};
Progress.propTypes = {
    status: PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    type: PropTypes.oneOf(['line', 'circle', 'dashboard']),
    showInfo: PropTypes.bool,
    percent: PropTypes.number,
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeLinecap: PropTypes.oneOf(['round', 'square']),
    strokeColor: PropTypes.string,
    trailColor: PropTypes.string,
    format: PropTypes.func,
    gapDegree: PropTypes.number,
    default: PropTypes.oneOf(['default', 'small']),
};
