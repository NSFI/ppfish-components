import Modal, { ModalFuncProps } from './Modal';
import confirm from './confirm';
import './style/index.less';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

Modal.info = function (props: ModalFuncProps) {
  const config = {
    type: 'info',
    iconType: 'hints-notification',
    okCancel: false,
    ...props
  };
  return confirm(config);
};

Modal.success = function (props: ModalFuncProps) {
  const config = {
    type: 'success',
    iconType: 'hints-success',
    okCancel: false,
    ...props
  };
  return confirm(config);
};

Modal.error = function (props: ModalFuncProps) {
  const config = {
    type: 'error',
    iconType: 'hints-error',
    okCancel: false,
    ...props
  };
  return confirm(config);
};

Modal.warning = Modal.warn = function (props: ModalFuncProps) {
  const config = {
    type: 'warning',
    iconType: 'hints-warning',
    okCancel: false,
    ...props
  };
  return confirm(config);
};

Modal.confirm = function (props: ModalFuncProps) {
  const config = {
    type: 'confirm',
    okCancel: true,
    ...props
  };
  return confirm(config);
};

export default Modal;
