import Modal from './Modal';
import confirm from './confirm';
Modal.info = function (props) {
    const config = Object.assign({ type: 'info', iconType: 'hints-notification', okCancel: false }, props);
    return confirm(config);
};
Modal.success = function (props) {
    const config = Object.assign({ type: 'success', iconType: 'hints-success', okCancel: false }, props);
    return confirm(config);
};
Modal.error = function (props) {
    const config = Object.assign({ type: 'error', iconType: 'hints-error', okCancel: false }, props);
    return confirm(config);
};
Modal.warning = Modal.warn = function (props) {
    const config = Object.assign({ type: 'warning', iconType: 'hints-warning', okCancel: false }, props);
    return confirm(config);
};
Modal.confirm = function (props) {
    const config = Object.assign({ type: 'confirm', okCancel: true }, props);
    return confirm(config);
};
export default Modal;
