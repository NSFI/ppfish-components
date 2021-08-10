import React from 'react';
import { mount } from 'enzyme';
import Carousel, { CarouselRef } from '../index';

const sleep = (timeout = 500) => new Promise(resolve => setTimeout(resolve, timeout));

describe('Carousel', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should has innerSlider', () => {
    const ref = React.createRef<CarouselRef>();
    const wrapper = mount(
      <Carousel ref={ref}>
        <div />
      </Carousel>,
    );
    const { innerSlider } = ref.current;
    expect(typeof innerSlider.slickNext).toBe('function');
  });

  it('should has prev, next and go function', async () => {
    // jest.useRealTimers();
    const ref = React.createRef<CarouselRef>();
    const wrapper = mount(
      <Carousel speed={1} ref={ref} dots={false}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const { prev, next, goTo } = ref.current;
    expect(typeof prev).toBe('function');
    expect(typeof next).toBe('function');
    expect(typeof goTo).toBe('function');
    expect(ref.current.innerSlider.state.currentSlide).toBe(0);
    goTo(2);
    // await sleep();
    jest.runAllTimers();
    expect(ref.current.innerSlider.state.currentSlide).toBe(2);
    ref.current.prev();
    // await sleep();
    jest.runAllTimers();
    expect(ref.current.innerSlider.state.currentSlide).toBe(1);
    next();
    jest.runAllTimers();
    // await sleep();
    expect(ref.current.innerSlider.state.currentSlide).toBe(2);
  });

  it('should trigger autoPlay after window resize', async () => {
    const ref = React.createRef<CarouselRef>();

    jest.useRealTimers();
    const wrapper = mount(
      <Carousel ref={ref} autoplay>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const spy = jest.spyOn(ref.current.innerSlider, 'autoPlay');
    window.resizeTo(1000, 0);
    expect(spy).not.toHaveBeenCalled();
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(spy).toHaveBeenCalled();
  });

  it('cancel resize listener when unmount', async () => {
    const wrapper = mount(
      <Carousel autoplay>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const spy = jest.spyOn(window, 'removeEventListener');
    wrapper.unmount();
    expect(spy).toHaveBeenCalled();
  });

  describe('should works for dotPosition', () => {
    ['left', 'right', 'top', 'bottom'].forEach(
      (dotPosition: 'left' | 'right' | 'top' | 'bottom') => {
        it(dotPosition, () => {
          const wrapper = mount(
            <Carousel dotsPosition={dotPosition}>
              <div />
            </Carousel>,
          );
          expect(wrapper.render()).toMatchSnapshot();
        });
      },
    );
  });

  describe('should active when children change', () => {
    it('should active', () => {
      const wrapper = mount(<Carousel />);
      wrapper.setProps({
        children: <div />,
      });
      wrapper.update();
      expect(wrapper.find('.slick-active').length).toBeTruthy();
    });

    it('should keep initialSlide', () => {
      // react unsafe lifecycle don't works in React 15
      // https://github.com/akiran/react-slick/commit/97988e897750e1d8f7b10a86b655f50d75d38298
      if (process.env.REACT === '15') {
        return;
      }
      const wrapper = mount(<Carousel initialSlide={1} />);
      wrapper.setProps({
        children: [<div key="1" />, <div key="2" />, <div key="3" />],
      });
      wrapper.update();
      expect(wrapper.find('.slick-dots li').at(1).hasClass('slick-active')).toBeTruthy();
    });
  });
});
