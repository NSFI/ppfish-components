import * as React from 'react';
import classNames from 'classnames';
import Avatar from './Avatar';
import Title from './Title';
import Paragraph from './Paragraph';
import './style/index.less';
function getComponentProps(prop) {
    if (prop && typeof prop === 'object') {
        return prop;
    }
    return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
    if (hasTitle && !hasParagraph) {
        return { shape: 'square' };
    }
    return { shape: 'circle' };
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
    if (!hasAvatar && hasParagraph) {
        return { width: '38%' };
    }
    if (hasAvatar && hasParagraph) {
        return { width: '50%' };
    }
    return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
    const basicProps = {};
    // Width
    if (!hasAvatar || !hasTitle) {
        basicProps.width = '61%';
    }
    // Rows
    if (!hasAvatar && hasTitle) {
        basicProps.rows = 3;
    }
    else {
        basicProps.rows = 2;
    }
    return basicProps;
}
class Skeleton extends React.Component {
    render() {
        const { loading, prefixCls, className, style, children, avatar, title, paragraph, active, } = this.props;
        if (loading || !('loading' in this.props)) {
            const hasAvatar = !!avatar;
            const hasTitle = !!title;
            const hasParagraph = !!paragraph;
            // Avatar
            let avatarNode;
            if (hasAvatar) {
                const avatarProps = Object.assign({}, getAvatarBasicProps(hasTitle, hasParagraph), getComponentProps(avatar));
                avatarNode = (React.createElement("div", { className: `${prefixCls}-header` },
                    React.createElement(Avatar, Object.assign({}, avatarProps))));
            }
            let contentNode;
            if (hasTitle || hasParagraph) {
                // Title
                let $title;
                if (hasTitle) {
                    const titleProps = Object.assign({}, getTitleBasicProps(hasAvatar, hasParagraph), getComponentProps(title));
                    $title = (React.createElement(Title, Object.assign({}, titleProps)));
                }
                // Paragraph
                let paragraphNode;
                if (hasParagraph) {
                    const paragraphProps = Object.assign({}, getParagraphBasicProps(hasAvatar, hasTitle), getComponentProps(paragraph));
                    paragraphNode = (React.createElement(Paragraph, Object.assign({}, paragraphProps)));
                }
                contentNode = (React.createElement("div", { className: `${prefixCls}-content` },
                    $title,
                    paragraphNode));
            }
            const cls = classNames(prefixCls, className, {
                [`${prefixCls}-with-avatar`]: hasAvatar,
                [`${prefixCls}-active`]: active,
            });
            return (React.createElement("div", { className: cls, style: style },
                avatarNode,
                contentNode));
        }
        return children;
    }
}
Skeleton.defaultProps = {
    prefixCls: 'fishd-skeleton',
    avatar: false,
    title: true,
    paragraph: true,
};
export default Skeleton;
