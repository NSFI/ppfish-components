var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'omit.js';
import Video from './Video';
import VideoModal from './VideoModal';
import Icon from '../Icon';
var VideoViewer = /** @class */ (function (_super) {
    __extends(VideoViewer, _super);
    function VideoViewer(props) {
        var _this = _super.call(this, props) || this;
        // 点击缩略图
        _this.handleThumbClick = function (e) {
            if (_this.props.failedMessage !== null)
                return;
            _this.setState({
                videoModalVisible: true
            }, function () {
                var video = _this.video && _this.video.current;
                var player = video && video.getVideoPlayer();
                if (player && typeof player.play === 'function') {
                    player.play();
                }
            });
            _this.props.onThumbClick && _this.props.onThumbClick(e);
        };
        // 模态框关闭的回调
        _this.onClose = function () {
            var video = _this.video && _this.video.current;
            var player = video && video.getVideoPlayer();
            if (player && typeof player.pause === 'function') {
                player.pause();
            }
            _this.props.modalProps.afterClose && _this.props.modalProps.afterClose();
        };
        // 点击模态框关闭按钮
        _this.handleCancel = function (e) {
            _this.setState({
                videoModalVisible: false
            });
            _this.props.modalProps.onCancel && _this.props.modalProps.onCancel();
        };
        _this.state = {
            videoModalVisible: false
        };
        _this.video = React.createRef();
        return _this;
    }
    VideoViewer.prototype.render = function () {
        var _a;
        var videoModalVisible = this.state.videoModalVisible;
        var _b = this.props, prefixCls = _b.prefixCls, width = _b.width, height = _b.height, poster = _b.poster, modalProps = _b.modalProps, videoProps = _b.videoProps, failedMessage = _b.failedMessage;
        var otherModalProps = omit(modalProps, ['visible', 'afterClose', 'onCancel']);
        var otherVideoProps = omit(videoProps, ['autoPlay']);
        var thumbCls = classnames((_a = {},
            _a[prefixCls + "-thumb"] = true,
            _a[prefixCls + "-thumb-disabled"] = failedMessage !== null,
            _a));
        var wrapStyle = { width: width, height: height };
        return (React.createElement("div", { className: prefixCls + "-wrap", style: wrapStyle },
            React.createElement("div", { className: thumbCls, onClick: this.handleThumbClick },
                failedMessage === null ? (React.createElement("div", { className: classnames([
                        prefixCls + "-thumb-status",
                        prefixCls + "-thumb-big-play-button"
                    ]) },
                    React.createElement(Icon, { type: "play" }))) : (React.createElement("div", { className: classnames([
                        prefixCls + "-thumb-status",
                        prefixCls + "-thumb-failed-message"
                    ]) },
                    React.createElement("span", null, failedMessage))),
                React.createElement(Video, { width: width, height: height, poster: poster, sources: otherVideoProps.sources, controls: false })),
            React.createElement(VideoModal, __assign({}, otherModalProps, { visible: videoModalVisible, afterClose: this.onClose, onCancel: this.handleCancel }),
                React.createElement(Video, __assign({}, otherVideoProps, { ref: this.video, autoplay: true, bigPlayButton: false })))));
    };
    VideoViewer.propTypes = {
        prefixCls: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        poster: PropTypes.string,
        failedMessage: PropTypes.string,
        modalProps: PropTypes.object,
        videoProps: PropTypes.object,
        onThumbClick: PropTypes.func
    };
    VideoViewer.defaultProps = {
        prefixCls: 'fishd-video-viewer',
        poster: null,
        width: 240,
        height: 135,
        failedMessage: null
    };
    VideoViewer.Video = Video;
    VideoViewer.VideoModal = VideoModal;
    return VideoViewer;
}(React.Component));
export default VideoViewer;
