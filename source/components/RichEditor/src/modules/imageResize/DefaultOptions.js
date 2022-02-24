export default {
  modules: ['DisplaySize', 'Toolbar', 'Resize', 'Keyboard'],
  keyboardSelect: true,
  selectedClass: 'selected',
  activeClass: 'active',

  parchment: {
    image: {
      attribute: ['width', 'height'],
      limit: {
        minWidth: 10,
        ratio: true // 默认按照原图片比例 缩放
      }
    },
    'embed-placeholder': {
      attribute: ['width', 'height'],
      limit: {
        minWidth: 200,
        ratio: 0.5625
      }
    },
    video: {
      attribute: ['width', 'height'],
      limit: {
        minWidth: 200,
        ratio: 0.5625
      }
    }
  },

  styles: {
    overlay: {
      position: 'absolute',
      boxSizing: 'border-box',
      border: '1px dashed #444'
    },
    handle: {
      position: 'absolute',
      height: '10px',
      width: '10px',
      backgroundColor: 'white',
      border: '1px solid #777',
      boxSizing: 'border-box',
      opacity: '0.80'
    },
    display: {
      position: 'absolute',
      padding: '4px 8px',
      textAlign: 'center',
      backgroundColor: 'white',
      color: '#333',
      border: '1px solid #777',
      boxSizing: 'border-box',
      opacity: '0.80',
      cursor: 'default',
      lineHeight: '1'
    },
    toolbar: {
      position: 'absolute',
      top: '-12px',
      right: '0',
      left: '0',
      height: '0',
      minWidth: '120px',
      textAlign: 'center',
      color: '#333',
      boxSizing: 'border-box',
      cursor: 'default'
    },
    toolbarButton: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      background: 'white',
      border: '1px solid #999',
      verticalAlign: 'middle',
      lineHeight: '20px'
    },
    toolbarButtonSvg: {}
  }
}
