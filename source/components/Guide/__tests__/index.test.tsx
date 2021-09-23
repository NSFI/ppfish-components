import React from 'react';
import { mount } from 'enzyme';
import Guide from '../index';
import { ESC_KEY_CODE, LEFT_KEY_CODE, RIGHT_KEY_CODE } from '../src/common/constants';
import { act } from 'react-dom/test-utils';

describe('Guide', () => {
  describe('fixed mode', () => {
    const steps = [
      {
        title: '标题 1',
        subtitle: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
        content: (
          <img
            alt="图片"
            style={{ width: '100%' }}
            src={'//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe'}
          />
        ),
      },
      {
        title: '标题 2',
        content: (
          <img
            alt="图片"
            style={{ width: '100%' }}
            src={'//ysf.qiyukf.net/080b89be8a980ab9951a1b0de643d939'}
          />
        ),
      },
      {
        content: (
          <img
            alt="图片"
            style={{ width: '100%' }}
            src={'//ysf.qiyukf.net/260c0731b07b2933fe04f1a4d629450c'}
          />
        ),
      },
    ];

    it('should support onClose', () => {
      const onClose = jest.fn();
      const wrapper = mount(
        <Guide mode={'fixed'} visible={true} onClose={onClose} steps={steps} />,
      );
      const skipBtn = wrapper.find('.skip').at(0);
      skipBtn.simulate('click');
      expect(onClose).toHaveBeenCalledTimes(1);

      wrapper.setProps({ visible: true });
      wrapper.update();

      const nextBtn = wrapper.find('.fishd-guide-next-btn').at(0);
      nextBtn.simulate('click');
      nextBtn.simulate('click');
      nextBtn.simulate('click');
      expect(onClose).toHaveBeenCalledTimes(2);
    });

    it('should support button text: doneBtnText, prevBtnText, nextBtnText, skipBtnText', () => {
      const onClose = jest.fn();
      const btnTextConfig = {
        skipBtnText: 'skip btn',
        prevBtnText: 'prev btn',
        nextBtnText: 'next btn',
        doneBtnText: 'done btn',
      };
      const wrapper = mount(
        <Guide mode={'fixed'} visible={true} onClose={onClose} steps={steps} {...btnTextConfig} />,
      );
      const skipBtn = wrapper.find('.skip');
      const nextBtn = wrapper.find('.fishd-guide-next-btn').at(0);
      nextBtn.simulate('click');
      wrapper.update();
      const prevBtn = wrapper.find('.fishd-guide-prev-btn').at(0);
      expect(skipBtn.text()).toBe(btnTextConfig.skipBtnText);
      expect(prevBtn.text()).toBe(btnTextConfig.prevBtnText);
      expect(nextBtn.text()).toBe(`${btnTextConfig.nextBtnText} (2/3)`);

      nextBtn.simulate('click');
      wrapper.update();
      const doneBtn = wrapper.find('.fishd-guide-done-btn').at(0);
      expect(doneBtn.text()).toBe(`${btnTextConfig.doneBtnText} (3/3)`);
    });

    it('should support keyboardControl', () => {
      const onClose = jest.fn();
      const wrapper = mount(
        <Guide
          mode={'fixed'}
          keyboardControl={true}
          visible={true}
          onClose={onClose}
          steps={steps}
        />,
      );
      const rightEvent = new KeyboardEvent('keyup', { keyCode: RIGHT_KEY_CODE } as any);
      const leftEvent = new KeyboardEvent('keyup', { keyCode: LEFT_KEY_CODE } as any);
      const escEvent = new KeyboardEvent('keyup', { keyCode: ESC_KEY_CODE } as any);
      const Global = global as any;

      expect(document.querySelector('.fishd-guide-fixed-subtitle').textContent).toBe(
        steps[0].subtitle,
      );
      Global.dispatchEvent(rightEvent);
      expect(document.querySelector('.fishd-modal-title').textContent).toBe(steps[1].title);
      Global.dispatchEvent(leftEvent);
      expect(document.querySelector('.fishd-guide-fixed-subtitle').textContent).toBe(
        steps[0].subtitle,
      );

      Global.dispatchEvent(rightEvent);
      Global.dispatchEvent(rightEvent);
      Global.dispatchEvent(rightEvent);
      expect(onClose).toHaveBeenCalledTimes(1);

      wrapper.setProps({ visible: true });
      wrapper.update();
      Global.dispatchEvent(escEvent);
      expect(onClose).toHaveBeenCalledTimes(2);
    });
  });

  describe('normal mode', () => {
    const getBoundingClientRectMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
    let originStyle = Object.prototype['style'];
    beforeAll(() => {
      Object.prototype['style'] = {};
      getBoundingClientRectMock.mockImplementation(function (this: HTMLElement) {
        return {
          top: 100,
          bottom: 0,
          left: 100,
          right: 200,
          width: 100,
          height: 100,
        } as any;
      });
    });

    afterAll(() => {
      Object.prototype['style'] = originStyle;
      getBoundingClientRectMock.mockRestore();
    });

    const Global = global as any;
    const normalSteps = [
      {
        element: '.guide-demo-step1',
        popover: {
          className: 'custom',
          title: '第1步',
          description: '第1步介绍',
          position: 'bottomLeft',
        },
      },
      {
        counterPosition: 'leftBottom',
        element: '.guide-demo-step2',
        popover: {
          title: '第2步',
          description: '第2步介绍',
          position: 'right',
        },
      },
    ];
    const NormalDemo = props => {
      const { guideProps } = props;
      return (
        <div className="guide-demo">
          <div className="guide-demo-cont">
            <h3 className="item guide-demo-step1">第1步</h3>
            <h3 className="item guide-demo-step2">第2步</h3>
          </div>
          <Guide steps={normalSteps} {...guideProps} />
        </div>
      );
    };
    it('should support onClose', () => {
      jest.useFakeTimers();
      const onClose = jest.fn();
      const container = document.createElement('div');
      Global.document.body.appendChild(container);
      const wrapper = mount(<NormalDemo guideProps={{ visible: true, onClose }} />, {
        attachTo: container,
      });
      act(() => {
        jest.runAllTimers();
      });
      act(() => {
        const nextBtn = document.querySelector('.fishd-guide-driver-next-btn') as HTMLElement;
        nextBtn.click();
        nextBtn.click();
        jest.runAllTimers();
      });
      expect(onClose).toHaveBeenCalledTimes(1);

      wrapper.setProps({
        guideProps: {
          visible: true,
          onClose,
        },
      });
      act(() => {
        jest.runAllTimers();
        const skipBtn = document.querySelector('.fishd-guide-driver-skip-btn') as HTMLElement;
        skipBtn.click();
      });
      expect(onClose).toHaveBeenCalledTimes(2);

      const itemNode = document.querySelector<HTMLElement>('#fishd-guide-driver-popover-item');
      expect(itemNode.style.display).toBe('none');
    });

    it('should support button text: doneBtnText, prevBtnText, nextBtnText, skipBtnText', () => {
      jest.useFakeTimers();
      const container = document.createElement('div');
      Global.document.body.appendChild(container);
      const onClose = jest.fn();
      const btnTextConfig = {
        skipBtnText: 'skip btn',
        prevBtnText: 'prev btn',
        nextBtnText: 'next btn',
        doneBtnText: 'done btn',
      };
      const wrapper = mount(
        <NormalDemo
          guideProps={{
            visible: true,
            onClose,
            ...btnTextConfig,
          }}
        />,
        { attachTo: container },
      );
      act(() => {
        jest.runAllTimers();
      });
      const skipBtn = document.querySelector('.fishd-guide-driver-skip-btn') as HTMLElement;
      const nextBtn = document.querySelector('.fishd-guide-driver-next-btn') as HTMLElement;
      act(() => {
        nextBtn.click();
        jest.runAllTimers();
      });
      const prevBtn = document.querySelector('.fishd-guide-driver-prev-btn') as HTMLElement;
      expect(skipBtn.innerHTML).toBe(btnTextConfig.skipBtnText);
      expect(prevBtn.innerHTML).toBe(btnTextConfig.prevBtnText);
      expect(nextBtn.innerHTML).toBe(`${btnTextConfig.nextBtnText} (1/2)`);

      act(() => {
        nextBtn.click();
        jest.runAllTimers();
      });
      const doneBtn = document.querySelector('.fishd-guide-driver-next-btn') as HTMLElement;
      expect(doneBtn.innerHTML).toBe(`${btnTextConfig.doneBtnText} (2/2)`);
    });

    it('should support keyboardControl', () => {
      jest.useFakeTimers();
      const container = document.createElement('div');
      Global.document.body.appendChild(container);
      const onClose = jest.fn();
      const wrapper = mount(
        <NormalDemo
          guideProps={{
            visible: true,
            onClose,
            keyboardControl: true,
          }}
        />,
        { attachTo: container },
      );
      act(() => {
        jest.runAllTimers();
      });
      const rightEvent = new KeyboardEvent('keyup', { keyCode: RIGHT_KEY_CODE } as any);
      const leftEvent = new KeyboardEvent('keyup', { keyCode: LEFT_KEY_CODE } as any);
      const escEvent = new KeyboardEvent('keyup', { keyCode: ESC_KEY_CODE } as any);

      expect(document.querySelector('.fishd-guide-driver-popover-title').innerHTML).toBe(
        normalSteps[0].popover.title,
      );
      act(() => {
        Global.dispatchEvent(rightEvent);
        jest.runAllTimers();
      });
      expect(document.querySelector('.fishd-guide-driver-popover-title').innerHTML).toBe(
        normalSteps[1].popover.title,
      );
      act(() => {
        Global.dispatchEvent(leftEvent);
        jest.runAllTimers();
      });
      expect(document.querySelector('.fishd-guide-driver-popover-title').innerHTML).toBe(
        normalSteps[0].popover.title,
      );

      act(() => {
        Global.dispatchEvent(rightEvent);
        Global.dispatchEvent(rightEvent);
        jest.runAllTimers();
      });
      expect(onClose).toHaveBeenCalledTimes(1);

      wrapper.setProps({
        visible: true,
        onClose,
        keyboardControl: true,
      });
      act(() => {
        wrapper.update();
        jest.runAllTimers();
      });
      act(() => {
        Global.dispatchEvent(escEvent);
        jest.runAllTimers();
      });
      expect(onClose).toHaveBeenCalledTimes(2);
    });
  });
});
