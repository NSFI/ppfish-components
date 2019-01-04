/* eslint-disable func-names */
import Dialog from '../index.tsx';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
const Simulate = TestUtils.Simulate;

const ESC_KEYCODE = 27;

const css = (element, attr) => {
  return element.currentStyle ? element.currentStyle[attr] :
    getComputedStyle(element, null)[attr];
};
const $ = function (...d) { return document.querySelectorAll(...d); };
const sleep = (ms) => () => new Promise(r => setTimeout(r, ms));
describe('<Modal />', () => {
  const title = '第一个title';
  let dialog;

  const container = document.createElement('div');
  container.id = 't1';
  document.body.appendChild(container);

  let callback1;

  class DialogWrap extends React.Component {
    state = {
      visible: false,
      maskClosable: true,
      keyboard: true,
    };
    render() {
      return (
        <Dialog
          {...this.props}
          visible={this.state.visible}
          maskClosable={this.state.maskClosable}
          keyboard={this.state.keyboard}
        />
      );
    }
  }

  beforeEach(() => {

    function onClose() {
      callback1 = 1;
      dialog.setState({
        visible: false,
      });
    }

    callback1 = 0;
    dialog = ReactDOM.render((
      <DialogWrap
        style={{ width: 600 }}
        title={title}
        onOk={onClose}
        onCancel={onClose}
      >
        <p>第一个dialog</p>
      </DialogWrap>), container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it('show', (done) => {
    jest.useFakeTimers();

    dialog.setState({
      visible: true,
    });
    setTimeout(() => {
      expect(css($('.fishd-modal-wrap')[0], 'display'))
        .toBe('block');
      done();
    }, 10);

    jest.runAllTimers();
  });

  it('close', (done) => {
    jest.useFakeTimers();

    dialog.setState({
      visible: true,
    });
    dialog.setState({
      visible: false,
    });
    setTimeout(() => {
      expect(css($('.fishd-modal-wrap')[0], 'display'))
        .toBe('none');
      done();
    }, 10);
    jest.runAllTimers();
  });

  it('create', () => {
    expect($('.fishd-modal').length).toBe(0);
  });

  it('mask', () => {
    dialog.setState({
      visible: true,
    });
    expect($('.fishd-modal-mask').length).toBe(1);
  });

  it('click close', (finish) => {
    jest.useRealTimers();
    Promise.resolve()
      .then(() => {
        dialog.setState({
          visible: true,
        });
      })
      .then(sleep(10))
      .then(() => {
        const btn = $('.fishd-modal-close')[0];
        Simulate.click(btn);
      })
      .then(sleep(400))
      .then(() => {
        expect(callback1).toBe(1);
        expect(css($('.fishd-modal-wrap')[0], 'display'))
          .toBe('none');
      })
      .then(finish);

  });

  it("destroy on hide should unmount child components on close", () => {
    jest.useFakeTimers();

    const wrapper = ReactDOM.render(<DialogWrap destroyOnClose>
      <input className="inputElem" />
    </DialogWrap>, container);
    wrapper.setState({
      visible: true,
    });
    $(".inputElem")[0].value = "test";
    expect($(".inputElem")[0].value).toBe("test");
    wrapper.setState({
      visible: false,
    });
    jest.advanceTimersByTime(30);
    wrapper.setState({
      visible: true,
    });
    expect($(".inputElem")[0].value).toBe("");
  });


  it('esc to close', (finish) => {
    jest.useRealTimers();


    Promise.resolve()
      .then(() => {
        dialog.setState({
          visible: true,
        });
      })
      .then(sleep(10))
      .then(() => {
        Simulate.keyDown($('.fishd-modal-wrap')[0], {
          keyCode: ESC_KEYCODE,
        });
      })
      .then(sleep(10))
      .then(() => {
        expect(callback1).toBe(1);
        expect(css($('.fishd-modal-wrap')[0], 'display'))
          .toBe('none');
      })
      .then(finish);


  });

  it('mask to close', (finish) => {
    jest.useRealTimers();

    Promise.resolve()
      .then(() => {
        dialog.setState({
          visible: true,
          maskClosable: true
        });
      })
      .then(sleep(400))
      .then(() => {
        const mask = $('.fishd-modal-wrap')[0];
        Simulate.click(mask);
      })
      .then(sleep(10))
      .then(() => {
        // jest.advanceTimersByTime(2000)
        // dialog should closed after mask click
        expect(callback1).toBe(1);
      })
      .then(sleep(400))
      .then(() => {
        expect(css($('.fishd-modal-wrap')[0], 'display')).toBe('none');
        dialog.setState({
          visible: true,
          maskClosable: false,
        });

      })
      .then(sleep(10))
      .then(() => {
        // dialog should stay on visible after mask click if set maskClosable to false
        // expect(callback1).toBe(0);
        expect(css($('.fishd-modal-wrap')[0], 'display'))
          .toBe('block');
      })
      .then(finish);


  });

  it('renderToBody', () => {
    const d = ReactDOM.render(<DialogWrap>
      <p className="renderToBody">1</p>
    </DialogWrap>, container);
    expect($('.renderToBody').length).toBe(0);
    expect($('.fishd-modal-wrap').length).toBe(0);
    d.setState({
      visible: true,
    });
    expect($('.fishd-modal-wrap').length).toBe(1);
    expect($('.renderToBody').length).toBe(1);
    expect($('.fishd-modal-wrap')[0].parentNode.parentNode).not.toBe(container);
    ReactDOM.unmountComponentAtNode(container);
    expect($('.renderToBody').length).toBe(0);
    expect($('.fishd-modal-wrap').length).toBe(0);
  });

  it('getContainer', () => {
    const returnedContainer = document.createElement('div');
    document.body.appendChild(returnedContainer);
    const d = ReactDOM.render(
      <DialogWrap getContainer={() => returnedContainer}>
        <p className="getContainer">Hello world!</p>
      </DialogWrap>,
      container
    );
    d.setState({
      visible: true,
    });
    // fix issue #10656, must change this test
    // expect($('.fishd-modal-wrap')[0].parentNode.parentNode).toBe(returnedContainer);
    expect($('.fishd-modal-wrap')[0].parentNode.parentNode.parentNode).toBe(returnedContainer);
  });

  // it('render footer padding correctly', () => {

  //   ReactDOM.render(<DialogWrap footer={'footer'} />, container);

  //   expect(css($('.fishd-modal-footer')[0], 'padding')).toBe('10px 20px');
  // });

  it('support input autoFocus', () => {
    const d = ReactDOM.render(
      <DialogWrap><input autoFocus /></DialogWrap>,
      container
    );
    d.setState({
      visible: true
    });
    expect(document.activeElement).toBe(document.querySelector('input'));
  });
});
