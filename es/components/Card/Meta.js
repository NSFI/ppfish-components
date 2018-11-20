var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import classNames from 'classnames';
export default (props) => {
    const { prefixCls = 'fishd-card', className, avatar, title, description } = props, others = __rest(props, ["prefixCls", "className", "avatar", "title", "description"]);
    const classString = classNames(`${prefixCls}-meta`, className);
    const avatarDom = avatar ? React.createElement("div", { className: `${prefixCls}-meta-avatar` }, avatar) : null;
    const titleDom = title ? React.createElement("div", { className: `${prefixCls}-meta-title` }, title) : null;
    const descriptionDom = description ?
        React.createElement("div", { className: `${prefixCls}-meta-description` }, description) : null;
    const MetaDetail = titleDom || descriptionDom ?
        React.createElement("div", { className: `${prefixCls}-meta-detail` },
            titleDom,
            descriptionDom) : null;
    return (React.createElement("div", Object.assign({}, others, { className: classString }),
        avatarDom,
        MetaDetail));
};
