import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Affix, { AffixProps } from '../Affix';
import Button from '../../Button/index';

const events: {
  [key: string]: any;
} = {};

function $$(className) {
  return document.body.querySelectorAll(className);
}

class AffixMounter extends React.Component<Partial<AffixProps>> {
  container: HTMLElement;

  componentDidMount() {
    debugger;
    this.container.addEventListener = jest.fn().mockImplementation((event, cb) => {
      events[event] = cb;
    });
  }

  getTarget = () => {
    return this.container;
  };

  render() {
    return (
      <div
        style={{
          height: 100,
          overflowY: 'scroll',
        }}
        ref={node => {
          this.container = node;
        }}
      >
        <div
          className="background"
          style={{
            paddingTop: 60,
            height: 300,
          }}
        >
          <Affix target={() => this.container} {...this.props}>
            <Button>Fixed at the top of container</Button>
          </Affix>
        </div>
      </div>
    );
  }
}

describe('Affix Render', () => {
  let wrapper;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const scrollTo = (top, wrapper) => {
    $$('.background>div')[0].getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 100,
        height: 28,
        left: 0,
        right: 0,
        top: 50 - top,
        width: 195,
      };
    });
    wrapper.instance().container.scrollTop = top;

    act(() => {
      events.scroll({
        type: 'scroll',
      });
      jest.runAllTimers();
      wrapper.update();
    });
  };

  it('Anchor render perfectly', () => {
    document.body.innerHTML = '<div id="mounter" />';

    wrapper = mount(<AffixMounter />, { attachTo: document.getElementById('mounter') });
    jest.runAllTimers();

    scrollTo(0, wrapper);
    expect(wrapper.find('.fishd-affix')).toHaveLength(0);
    scrollTo(100, wrapper);
    expect(wrapper.find('.fishd-affix')).toHaveLength(1);
    scrollTo(0, wrapper);
    expect(wrapper.find('.fishd-affix')).toHaveLength(0);
  });

  it('support offsetBottom', () => {
    document.body.innerHTML = '<div id="mounter" />';

    wrapper = mount(<AffixMounter offsetBottom={0} />, {
      attachTo: document.getElementById('mounter'),
    });
    jest.runAllTimers();

    scrollTo(0, wrapper);
    expect(wrapper.find('.fishd-affix')).toHaveLength(1);

    scrollTo(100, wrapper);
    expect(wrapper.find('.fishd-affix')).toHaveLength(0);

    scrollTo(0, wrapper);
    expect(wrapper.find('.fishd-affix')).toHaveLength(1);
  });

  it('updatePosition when offsetTop changed', () => {
    document.body.innerHTML = '<div id="mounter" />';

    wrapper = mount(<AffixMounter offsetTop={0} />, {
      attachTo: document.getElementById('mounter'),
    });
    jest.runAllTimers();

    scrollTo(100, wrapper);
    expect(wrapper.find('.fishd-affix').instance().style.top).toBe('0px');
    act(() => {
      wrapper.setProps({
        offsetTop: 10,
      });
      jest.runAllTimers();
    });
    expect(wrapper.find('.fishd-affix').instance().style.top).toBe('10px');
  });
});
