import BaseModule from './BaseModule'

export default class DisplaySize extends BaseModule {
  onCreate () {
    // Create the container to hold the size display
    this.display = document.createElement('div')

    // Apply styles
    Object.assign(this.display.style, this.options.styles.display)

    // Attach it
    this.overlay.appendChild(this.display)
  }

  onUpdate () {
    if (!this.display || !this.activeEle) {
      return
    }

    const size = this.getCurrentSize()
    this.display.innerHTML = size.join(' &times; ')
    if (size[0] > 120 && size[1] > 30) {
      // position on top of image
      Object.assign(this.display.style, {
        right: '4px',
        bottom: '4px',
        left: 'auto'
      })
    } else if (this.activeEle.style.float === 'right') {
      // position off bottom left
      const displayRect = this.display.getBoundingClientRect()
      Object.assign(this.display.style, {
        right: 'auto',
        bottom: `-${displayRect.height + 4}px`,
        left: `-${displayRect.width + 4}px`
      })
    } else {
      // position off bottom right
      const displayRect = this.display.getBoundingClientRect()
      Object.assign(this.display.style, {
        right: `-${displayRect.width + 4}px`,
        bottom: `-${displayRect.height + 4}px`,
        left: 'auto'
      })
    }
  }

  getCurrentSize () {
    return [this.activeEle.offsetWidth, this.activeEle.offsetHeight]
  }
}
