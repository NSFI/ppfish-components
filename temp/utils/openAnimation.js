import cssAnimation from 'css-animation';
import raf from 'raf';
function animate(node, show, done) {
    var height;
    var requestAnimationFrameId;
    return cssAnimation(node, 'fishd-motion-collapse', {
        start: function () {
            if (!show) {
                node.style.height = node.offsetHeight + "px";
                node.style.opacity = '1';
            }
            else {
                height = node.offsetHeight;
                node.style.height = '0px';
                node.style.opacity = '0';
            }
        },
        active: function () {
            if (requestAnimationFrameId) {
                raf.cancel(requestAnimationFrameId);
            }
            requestAnimationFrameId = raf(function () {
                node.style.height = (show ? height : 0) + "px";
                node.style.opacity = show ? '1' : '0';
            });
        },
        end: function () {
            if (requestAnimationFrameId) {
                raf.cancel(requestAnimationFrameId);
            }
            node.style.height = '';
            node.style.opacity = '';
            done();
        },
    });
}
var animation = {
    enter: function (node, done) {
        return animate(node, true, done);
    },
    leave: function (node, done) {
        return animate(node, false, done);
    },
    appear: function (node, done) {
        return animate(node, true, done);
    },
};
export default animation;
