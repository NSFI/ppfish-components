import BaseModule from './BaseModule'

export default class Resize extends BaseModule {
  onCreate () {
    // track resize handles
    this.boxes = []

    // add 4 resize handles
    this.addBox('nwse-resize') // top left
    this.addBox('nesw-resize') // top right
    this.addBox('nwse-resize') // bottom right
    this.addBox('nesw-resize') // bottom left

    this.positionBoxes()
  }

  onDestroy () {
    // reset drag handle cursors
    this.setCursor('')
  }

  positionBoxes () {
    const handleXOffset = `${-parseFloat(this.options.styles.handle.width) /
      2}px`
    const handleYOffset = `${-parseFloat(this.options.styles.handle.height) /
      2}px`

    // set the top and left for each drag handle
    ;[
      { left: handleXOffset, top: handleYOffset }, // top left
      { right: handleXOffset, top: handleYOffset }, // top right
      { right: handleXOffset, bottom: handleYOffset }, // bottom right
      { left: handleXOffset, bottom: handleYOffset } // bottom left
    ].forEach((pos, idx) => {
      Object.assign(this.boxes[idx].style, pos)
    })
  }

  addBox (cursor) {
    // create div element for resize handle
    const box = document.createElement('div')

    // Star with the specified styles
    Object.assign(box.style, this.options.styles.handle)
    box.style.cursor = cursor

    // Set the width/height to use 'px'
    box.style.width = `${this.options.styles.handle.width}px`
    box.style.height = `${this.options.styles.handle.height}px`

    // listen for mousedown on each box
    box.addEventListener('mousedown', this.handleMousedown.bind(this), false)
    // add drag handle to document
    this.overlay.appendChild(box)
    // keep track of drag handle
    this.boxes.push(box)
  }

  handleMousedown (evt) {
    this.blot.handling && this.blot.handling(true)
    // note which box
    this.dragBox = evt.target
    // note starting mousedown position
    this.dragStartX = evt.clientX
    this.dragStartY = evt.clientY
    // store the width before the drag
    this.preDragSize = {
      width: this.activeEle.offsetWidth,
      height: this.activeEle.offsetHeight
    }
    // store the natural size
    this.naturalSize = this.getNaturalSize()
    // set the proper cursor everywhere
    this.setCursor(this.dragBox.style.cursor)

    this.handleDragProxy = evt => this.handleDrag(evt)
    this.handleMouseupProxy = evt => this.handleMouseup(evt)
    // listen for movement and mouseup
    document.addEventListener('mousemove', this.handleDragProxy, false)
    document.addEventListener('mouseup', this.handleMouseupProxy, false)
  }

  handleMouseup () {
    // reset cursor everywhere
    this.setCursor('')
    this.blot.handling && this.blot.handling(false)
    // stop listening for movement and mouseup
    document.removeEventListener('mousemove', this.handleDragProxy)
    document.removeEventListener('mouseup', this.handleMouseupProxy)
  }

  handleDrag (evt) {
    if (!this.activeEle || !this.blot) {
      // activeEle not set yet
      return
    }
    // update size
    const deltaX = evt.clientX - this.dragStartX
    const deltaY = evt.clientY - this.dragStartY

    const options = this.options.parchment[this.blot.statics.blotName]
    const size = {}
    let direction = 1

    ;(options.attribute || ['width']).forEach(key => {
      size[key] = this.preDragSize[key]
    })

    // left-side
    if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
      direction = -1
    }

    if (size.width) {
      size.width = Math.round(this.preDragSize.width + deltaX * direction)
    }
    if (size.height) {
      size.height = Math.round(this.preDragSize.height + deltaY * direction)
    }

    Object.assign(this.activeEle.style, this.calcSize(size, options.limit))
    this.requestUpdate()
  }

  calcSize (size, limit = {}) {
    let { width, height } = size

    // keep ratio
    if (limit.ratio) {
      let limitHeight
      if (limit.minWidth) width = Math.max(limit.minWidth, width)
      if (limit.maxWidth) width = Math.min(limit.maxWidth, width)

      height = width * limit.ratio

      if (limit.minHeight && height < limit.minHeight) {
        limitHeight = true
        height = limit.minHeight
      }
      if (limit.maxHeight && height > limit.maxHeight) {
        limitHeight = true
        height = limit.maxHeight
      }

      if (limitHeight) {
        width = height / limit.ratio
      }
    } else {
      if (size.width) {
        if (limit.minWidth) width = Math.max(limit.minWidth, width)
        if (limit.maxWidth) width = Math.min(limit.maxWidth, width)
      }
      if (size.height) {
        if (limit.minHeight) height = Math.max(limit.minHeight, height)
        if (limit.maxHeight) height = Math.min(limit.maxHeight, height)
      }
    }

    if (width) size.width = width + 'px'
    if (height) size.height = height + 'px'

    return size
  }

  getNaturalSize () {
    const ele = this.activeEle
    let size = [0, 0]
    if (!ele.getAttribute('data-size')) {
      size = [
        ele.naturalWidth || ele.offsetWidth,
        ele.naturalHeight || ele.offsetHeight
      ]
      ele.setAttribute('data-size', size[0] + ',' + size[1])
    } else {
      size = ele.getAttribute('data-size').split(',')
    }
    return {
      width: parseInt(size[0]),
      height: parseInt(size[1])
    }
  }

  setCursor (value) {
    [document.body, this.activeEle].forEach(el => {
      el.style.cursor = value // eslint-disable-line no-param-reassign
    })
  }
}
