import React from 'react';

export type ImageItem = {
  rotateValue?: number;
  src?: string;
  alt?: string;
  name?: string;
};

let conMaxWidth = 1024;
let conMaxHeight = 768;
const CON_MAX_WIDTH = conMaxWidth > window.innerWidth ? window.innerWidth : conMaxWidth; //容器最大宽度
const CON_MIN_WIDTH = 360; //容器最小宽度
const CON_MAX_HEIGHT = conMaxHeight > window.innerHeight ? window.innerHeight : conMaxHeight; //容器最大高度
const CON_MIN_HEIGHT = 360; //容器最小高度
const DEFAULT_RATIO = 0.8; //默认的图片显示比例

/**
 * 工具函数  start
 */
export function num2px(num) {
  return parseInt(num, 10) + 'px';
}

export function px2num(str) {
  return Number(str.replace('px', '')) || 0;
}

/**
 * el1元素的区域是否超过el2元素
 * @param  {[type]}  el1 [description]
 * @param  {[type]}  el2 [description]
 * @return {Boolean}     [description]
 */
export function isLarger(el1, el2) {
  return el1.clientHeight > el2.clientHeight || el1.clientWidth > el2.clientWidth;
}

export function isSourceChange(oldSource: ImageItem[], newSource: ImageItem[]): boolean {
  return JSON.stringify(oldSource) !== JSON.stringify(newSource);
}

export const setStyle = (el, css) => {
  for (let key in css) {
    el.style[key] = css[key];
  }
};

export const getImageSize = function (
  image: ImageItem & HTMLImageElement,
  callback: (naturalWidth: number, naturalHeight: number) => void,
  scope?: any,
) {
  let newImage;
  if (!image.src) {
    callback.call(scope, 0, 0);
  } else if (image.naturalWidth) {
    // 现代浏览器
    callback.call(scope, image.naturalWidth, image.naturalHeight);
  } else {
    // 低版本浏览器
    newImage = document.createElement('img');
    newImage.onload = function () {
      callback.call(scope, this.width, this.height);
    };
    newImage.src = image.src;
  }
};

export const isOne2One = image => {
  return Math.round(image.ratio * 100) === 100;
};

let downloadImgUrl: string | null = null;

export const downloadFn = (url, alt) => {
  let getBlobImage = img => {
    let canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return new Promise<Blob>(resolve => {
      canvas.toBlob(blob => {
        resolve(blob);
      });
    });
  };

  let img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    let promise = getBlobImage(img);
    promise.then(blob => {
      let dLink = document.createElement('a');
      dLink.download = alt || '';
      downloadImgUrl = window.URL.createObjectURL(blob);
      dLink.href = downloadImgUrl;
      dLink.onclick = () => {
        window.requestAnimationFrame(() => {
          window.URL.revokeObjectURL(downloadImgUrl);
          downloadImgUrl = null;
        });
      };
      dLink.click();
    });
  };
  // 在URL后添加随机数以避免浏览器缓存，使crossOrigin生效
  img.src = url;
};

export const isFullEnabled = () => {
  return (
    document.fullscreenEnabled ||
    document['mozFullScreenEnabled'] ||
    document['webkitFullscreenEnabled'] ||
    document['msFullscreenEnabled']
  );
};

export const calculateImg = (naturalWidth, naturalHeight) => {
  let width, height, imgRatio;

  if (naturalWidth == 0 || naturalHeight == 0) {
    width = CON_MIN_WIDTH;
    height = CON_MIN_HEIGHT;
    imgRatio = 0;
  } else {
    //计算容器的宽度
    width = naturalWidth * DEFAULT_RATIO; //默认0.8倍显示图片
    if (width > CON_MAX_WIDTH) {
      width = CON_MAX_WIDTH;
    } else if (width < CON_MIN_WIDTH) {
      width = CON_MIN_WIDTH;
    }

    //计算图片的缩放比例
    imgRatio = (naturalWidth && width / naturalWidth) || 0;

    //计算容器的高度
    height = naturalHeight * imgRatio;
    if (height > CON_MAX_HEIGHT) {
      height = CON_MAX_HEIGHT;
    } else if (height < CON_MIN_HEIGHT) {
      height = CON_MIN_HEIGHT;
    }
  }
  return { width, height, imgRatio };
};

export const getImgByChildren = (children): { name: string; src: string }[] | undefined => {
  if (children) {
    return React.Children.map(children, (child: React.ReactElement<HTMLImageElement>) => {
      let img = {
        name: '',
        src: '',
      };

      if (child.type === 'img') {
        img.name = child.props.name || child.props.alt;
        img.src = child.props.src;
      }

      return img;
    }).filter(item => item);
  }
};

export const getImgByProps = (source, children, imgs) => {
  let _imgs = null;
  if (source && source.length) {
    let sourceStr = JSON.stringify(source);
    if (sourceStr !== JSON.stringify(imgs)) {
      _imgs = JSON.parse(sourceStr);
    }
  } else if (children) {
    _imgs = getImgByChildren(children);
  }
  return _imgs;
};
