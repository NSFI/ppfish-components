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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import { zh_CN } from './lang/zh-CN';
import KEYCODE from '../../utils/KeyCode';
videojs.addLanguage('zh-CN', zh_CN);
var VideoViewer = /** @class */ (function (_super) {
    __extends(VideoViewer, _super);
    function VideoViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.getVideoPlayer = function () {
            return _this.player;
        };
        // 空格键控制 暂停、播放
        _this.handleSpaceKeyDown = function (e) {
            if (e.which === KEYCODE.SPACE) {
                e.preventDefault();
                if (_this.player) {
                    if (_this.player.paused()) {
                        _this.player.play();
                    }
                    else {
                        _this.player.pause();
                    }
                }
            }
        };
        return _this;
    }
    VideoViewer.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, download = _a.download, bigPlayButton = _a.bigPlayButton, otherProps = __rest(_a, ["download", "bigPlayButton"]);
        var initOptions = {
            //aspectRatio: '16:9',
            //autoSetup: false,
            //fluid: true,
            //inactivityTimeout: 3000,
            //liveui: true,
            //notSupportedMessage: '',
            //responsive: true,
            loadingSpinner: true,
            bigPlayButton: bigPlayButton,
            controlBar: {
                children: [
                    {
                        name: 'progressControl'
                    },
                    {
                        name: 'vjsPlay'
                    },
                    {
                        name: 'currentTimeDisplay'
                    },
                    {
                        name: 'timeDivider'
                    },
                    {
                        name: 'durationDisplay'
                    },
                    {
                        name: 'vjsFullScreen'
                    },
                    {
                        name: download ? 'vjsDownLoad' : ''
                    },
                    {
                        name: 'vjsVolume'
                    }
                ]
            },
            errorDisplay: {
                children: [
                    {
                        name: 'vjsErrorDisplay'
                    }
                ]
            }
        };
        var option = Object.assign({}, initOptions, otherProps);
        // instantiate video.js
        this.player = videojs(this.videoNode, option, function () {
            _this.player.on('timeupdate', function (e) {
                // 控制焦点
                _this.videoPlayerRef.focus();
            });
        });
    };
    // destroy player on unmount
    VideoViewer.prototype.componentWillUnmount = function () {
        if (this.player) {
            this.player.dispose();
        }
    };
    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/ video.js /pull/3856
    VideoViewer.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, className = _a.className;
        return (React.createElement("div", { className: prefixCls + "-wrap" },
            React.createElement("div", { "data-vjs-player": true, ref: function (node) { return (_this.videoPlayerRef = node); }, onKeyDown: this.handleSpaceKeyDown },
                React.createElement("video", { ref: function (node) { return (_this.videoNode = node); }, className: className }))));
    };
    VideoViewer.propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        poster: PropTypes.string,
        sources: PropTypes.array,
        autoplay: PropTypes.bool,
        loop: PropTypes.bool,
        muted: PropTypes.bool,
        preload: PropTypes.oneOf(['auto', 'none', 'metadata']),
        controls: PropTypes.bool,
        download: PropTypes.bool,
        bigPlayButton: PropTypes.bool
    };
    VideoViewer.defaultProps = {
        prefixCls: 'fishd-video-js',
        className: 'video-js',
        width: 640,
        height: 360,
        poster: '',
        sources: [],
        autoplay: false,
        loop: false,
        muted: false,
        preload: 'auto',
        controls: true,
        download: false,
        bigPlayButton: true // 是否显示大按钮
    };
    return VideoViewer;
}(React.Component));
export default VideoViewer;
