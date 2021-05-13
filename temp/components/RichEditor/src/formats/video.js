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
import Quill from 'quill';
import { getAttrs } from './image';
var BlockEmbed = Quill.import('blots/block/embed');
var Video = /** @class */ (function (_super) {
    __extends(Video, _super);
    function Video() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Video.create = function (value) {
        var node = _super.create.call(this, value);
        if (Object.prototype.toString.call(value) == "[object Object]") {
            // 默认带控制条
            if (value['controls'] === false) {
                delete value['controls'];
            }
            else {
                value['controls'] = true;
            }
            Object.keys(value).forEach(function (key) {
                var valType = typeof value[key];
                if (valType == 'function' || valType == 'object') {
                    return;
                }
                try {
                    node.setAttribute(key, value[key]);
                }
                catch (e) {
                    console.error(e); // eslint-disable-line
                }
            });
        }
        return node;
    };
    Video.formats = function (node) {
        return getAttrs(node);
    };
    Video.value = function (node) {
        return getAttrs(node);
    };
    Video.prototype.format = function (name, value) {
        _super.prototype.format.call(this, name, value);
    };
    return Video;
}(BlockEmbed));
Video.blotName = 'myVideo';
Video.className = 'ql-video';
Video.tagName = 'video';
export default Video;
