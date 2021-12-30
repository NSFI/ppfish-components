import { isLarger, num2px, px2num, setStyle } from '../utils';
import { getStyle } from '../../../utils';
import { useCallback } from 'react';

let moving = '';

const usePictureMouse = ({ state, setState, imgElRef, elRef, isFullscreen, mask }) => {
  const { show, image, container } = state;

  const handleMouseMove = useCallback(
    e => {
      if (!moving || !show) return;
      e.preventDefault();

      let con = container,
        conStyle = { ...con.style };

      if (moving === 'img') {
        setStyle(imgElRef.current, {
          'margin-left': num2px(e.pageX - image.startX + image.marginL),
          'margin-top': num2px(e.pageY - image.startY + image.marginT),
        });
      } else if (moving === 'con' && con && con.rect) {
        conStyle.left = num2px(e.pageX - con.startX + con.rect.left);
        conStyle.top = num2px(e.pageY - con.startY + con.rect.top);

        setState({
          container: Object.assign({}, container, { style: conStyle }),
        });
      }
    },
    [show, container, image],
  );

  const handleMouseUp = useCallback(
    e => {
      if (!show) return;
      e.preventDefault();
      moving = '';
    },
    [show],
  );

  const handleMouseDown = useCallback(
    e => {
      if (!show) return;
      e.preventDefault();

      let tar = e.target;
      let con = {
        rect: {
          left: 0,
          top: 0,
        },
        startX: 0,
        startY: 0,
      };
      let _image = {
        startX: 0,
        startY: 0,
        marginL: 0,
        marginT: 0,
      };

      if (tar === imgElRef.current && (isFullscreen || isLarger(imgElRef.current, elRef.current))) {
        //点击在图片上，并且是全屏模式或者图片比容器大，此时移动图片
        _image.startX = e.pageX;
        _image.startY = e.pageY;
        _image.marginL = px2num(getStyle(imgElRef.current, 'margin-left'));
        _image.marginT = px2num(getStyle(imgElRef.current, 'margin-top'));

        moving = 'img';
        setState({
          image: Object.assign({}, image, _image),
        });
      } else if (!isFullscreen) {
        //非全屏模式下，移动容器
        let elPos = elRef.current.getBoundingClientRect();

        if (mask) {
          con.rect = {
            left: elPos.left,
            top: elPos.top,
          };
        } else {
          con.rect = {
            left: elPos.left + window.pageXOffset,
            top: elPos.top + window.pageYOffset,
          };
        }

        con.startX = e.pageX;
        con.startY = e.pageY;

        moving = 'con';
        setState({
          container: Object.assign({}, container, con),
        });
      }
    },
    [show, isFullscreen, container, mask],
  );

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

export default usePictureMouse;
