import React from 'react';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import InputNumber, { InputNumberProps } from '..';
import focusTest from '../../../../tools/tests/focusTest.js';

const assignMethodsToWrapper: (any) => any = wrapper => {
  const methods = {
    findInput() {
      return this.find('input');
    },
    changeValue(value, which) {
      this.findInput().simulate('keyDown', { which });
      this.findInput().simulate('change', { target: { value } });
      this.findInput().simulate('keyUp', { which });
      return this;
    },
    focusInput() {
      return this.findInput().simulate('focus');
    },
    blurInput() {
      return this.findInput().simulate('blur');
    },
    getInputValue() {
      return this.findInput().props().value;
    },
  };

  Object.keys(methods).map(key => {
    wrapper[key] = methods[key];
  });

  type Wrapper = typeof wrapper;

  interface EnhancerWrapper extends Wrapper {
    findInput: () => Wrapper;
    focusInput: () => Wrapper;
    blurInput: () => Wrapper;
    changeValue: (value: string, which?: number) => Wrapper;
    getInputValue: () => string;
  }

  return wrapper as EnhancerWrapper;
};

describe('InputNumber', () => {
  focusTest(InputNumber);

  it('should return null when blur a empty input number', () => {
    const onChange = jest.fn();
    const wrapper = mount(<InputNumber defaultValue="1" onChange={onChange} />);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('should call onStep when press up or down button', () => {
    const onStep = jest.fn();
    const wrapper = mount(<InputNumber defaultValue={1} onStep={onStep} />);
    wrapper.find('.fishd-input-number-handler-up').simulate('mousedown');
    expect(onStep).toBeCalledTimes(1);
    expect(onStep).toHaveBeenLastCalledWith(2, { offset: 1, type: 'up' });
    wrapper.find('.fishd-input-number-handler-down').simulate('mousedown');
    expect(onStep).toBeCalledTimes(2);
    expect(onStep).toHaveBeenLastCalledWith(1, { offset: 1, type: 'down' });
  });

  it('props keyboard should work', () => {
    const onChange = jest.fn();
    const wrapper = mount(<InputNumber keyboard={false} onChange={onChange} />);

    wrapper.find('input').simulate('keyDown', { which: KeyCode.UP });
    expect(onChange).not.toHaveBeenCalled();

    wrapper.find('input').simulate('keyDown', { which: KeyCode.DOWN });
    expect(onChange).not.toHaveBeenCalled();

    wrapper.setProps({ keyboard: true });
    wrapper.find('input').simulate('keyDown', { which: KeyCode.DOWN });
    expect(onChange).toHaveBeenCalledWith(-1);
    wrapper.find('input').simulate('keyDown', { which: KeyCode.UP });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('pressEnter value should be ok', () => {
    const Demo = () => {
      const [value, setValue] = React.useState(1);
      const inputRef = React.useRef<HTMLInputElement>(null);
      return (
        <InputNumber
          ref={inputRef}
          value={value}
          onPressEnter={() => {
            setValue(Number(inputRef.current.value));
          }}
        />
      );
    };

    const wrapper = assignMethodsToWrapper(mount(<Demo />));

    wrapper.findInput().simulate('focus');
    wrapper.changeValue('3');
    wrapper.findInput().simulate('keyDown', { which: KeyCode.ENTER });
    expect(wrapper.getInputValue()).toEqual('3');
    wrapper.changeValue('5');
    wrapper.findInput().simulate('keyDown', { which: KeyCode.ENTER });
    expect(wrapper.getInputValue()).toEqual('5');
  });
});

describe('InputNumber.Input', () => {
  function prepareWrapper(text: string, props?: Partial<InputNumberProps>, skipInputCheck = false) {
    const wrapper = assignMethodsToWrapper(mount(<InputNumber {...props} />));
    wrapper.focusInput();
    for (let i = 0; i < text.length; i += 1) {
      const inputTxt = text.slice(0, i + 1);
      wrapper.changeValue(inputTxt);
    }

    if (!skipInputCheck) {
      expect(wrapper.getInputValue()).toEqual(text);
    }

    wrapper.blurInput();

    return wrapper;
  }

  it('input valid number', () => {
    const wrapper = prepareWrapper('6');

    expect(wrapper.getInputValue()).toEqual('6');
  });

  it('input invalid number', () => {
    const wrapper = prepareWrapper('xx');

    expect(wrapper.getInputValue()).toEqual('');
  });

  it('input invalid string with number', () => {
    const wrapper = prepareWrapper('2x');

    expect(wrapper.getInputValue()).toEqual('2');
  });

  it('input invalid decimal point with max number', () => {
    const wrapper = prepareWrapper('15.', { max: 10 });
    expect(wrapper.getInputValue()).toEqual('10');
  });

  it('input invalid decimal point with min number', () => {
    const wrapper = prepareWrapper('3.', { min: 5 });
    expect(wrapper.getInputValue()).toEqual('5');
  });

  it('input negative symbol', () => {
    const wrapper = prepareWrapper('-');
    expect(wrapper.getInputValue()).toEqual('');
  });

  it('input negative number', () => {
    const wrapper = prepareWrapper('-98');
    expect(wrapper.getInputValue()).toEqual('-98');
  });

  // https://github.com/ant-design/ant-design/issues/9439
  it('input negative zero', () => {
    const wrapper = prepareWrapper('-0', {}, true);
    expect(wrapper.getInputValue()).toEqual('0');
  });

  it('input decimal number with integer step', () => {
    const wrapper = prepareWrapper('1.2', { step: 1.2 });
    expect(wrapper.getInputValue()).toEqual('1.2');
  });

  it('input decimal number with decimal step', () => {
    const wrapper = prepareWrapper('1.2', { step: 0.1 });
    expect(wrapper.getInputValue()).toEqual('1.2');
  });

  it('input empty text and blur', () => {
    const wrapper = prepareWrapper('');
    expect(wrapper.getInputValue()).toEqual('');
  });

  it('blur on default input', () => {
    const onChange = jest.fn();
    const wrapper = assignMethodsToWrapper(mount(<InputNumber onChange={onChange} />));
    wrapper.blurInput();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('pressEnter works', () => {
    const onPressEnter = jest.fn();
    const wrapper = mount(<InputNumber onPressEnter={onPressEnter} />);
    wrapper.find('input').simulate('keyDown', { which: KeyCode.ENTER });
    expect(onPressEnter).toHaveBeenCalled();
  });

  it('pressEnter value should be ok', () => {
    const Demo = () => {
      const [value, setValue] = React.useState(1);
      const inputRef = React.useRef<HTMLInputElement>(null);
      return (
        <InputNumber
          ref={inputRef}
          value={value}
          onPressEnter={() => {
            setValue(Number(inputRef.current.value));
          }}
        />
      );
    };

    const wrapper = assignMethodsToWrapper(mount(<Demo />));
    wrapper.focusInput();
    wrapper.changeValue('3');
    wrapper.find('input').simulate('keyDown', { which: KeyCode.ENTER });
    expect(wrapper.getInputValue()).toEqual('3');
    wrapper.changeValue('5');
    wrapper.find('input').simulate('keyDown', { which: KeyCode.ENTER });
    expect(wrapper.getInputValue()).toEqual('5');
  });
});
