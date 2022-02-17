import BaseModule from './BaseModule'

export default class Keyboard extends BaseModule {
  static injectInit (quill) {
    // left/right
    const bindings = quill.keyboard.bindings
    bindings[this.keys.LEFT].unshift(
      this.makeArrowHandler(this.keys.LEFT, false)
    )
    bindings[this.keys.RIGHT].unshift(
      this.makeArrowHandler(this.keys.RIGHT, false)
    )

    // // up
    // const upBinding = this.makeArrowHandler(this.keys.UP, false)
    // if (bindings[this.keys.UP]) {
    //   bindings[this.keys.UP].unshift(upBinding)
    // } else {
    //   quill.keyboard.addBinding(upBinding)
    // }
    // // down
    // const downBinding = this.makeArrowHandler(this.keys.DOWN, false)
    // if (bindings[this.keys.DOWN]) {
    //   bindings[this.keys.DOWN].unshift(downBinding)
    // } else {
    //   quill.keyboard.addBinding(downBinding)
    // }
  }

  static makeArrowHandler (key, shiftKey) {
    const where = key === Keyboard.keys.LEFT ? 'prefix' : 'suffix'
    return {
      key,
      shiftKey,
      altKey: null,
      [where]: /^$/,
      handler: function (range) {
        if (!this.quill.resizer) return true

        let index = range.index

        // check end of line
        const [line] = this.quill.getLine(range.index)
        const lineIndex = this.quill.getIndex(line)
        if (key === Keyboard.keys.RIGHT && lineIndex + line.length() - 1 === index) return true

        // get leaf/offset
        if (key === Keyboard.keys.RIGHT) {
          index += (range.length + 1)
        }
        let [leaf] = this.quill.getLeaf(index)
        const offset = leaf.offset(leaf.parent)

        // check start of line
        if (key === Keyboard.keys.LEFT && (index === 0 || index === lineIndex)) return true

        // get previous leaf
        if (key === Keyboard.keys.LEFT) {
          if (offset === 0) {
            index -= 1
            leaf = this.quill.getLeaf(index)[0]
          }
        }

        return !this.quill.resizer.judgeShow(leaf)
      }
    }
  }

  onCreate (e) {
    this.keyboardProxy = evt => this.keyboardHandle(evt)
    document.addEventListener('keydown', this.keyboardProxy, true)
  }

  onDestroy () {
    document.removeEventListener('keydown', this.keyboardProxy, true)
  }

  keyboardHandle (evt) {
    if (evt.defaultPrevented) return
    if (evt.shiftKey || evt.ctrlKey || evt.altKey) {
      return
    }
    if (!this.activeEle || evt.fromResize || evt.ctrlKey) return

    const code = evt.keyCode
    let index = this.blot.offset(this.quill.scroll)
    let nextBlot
    let handled = false

    // delete
    if (code === Keyboard.keys.BACKSPACE || code === Keyboard.keys.DELETE) {
      this.blot.deleteAt(0)
      this.blot.parent.optimize()
      handled = true

    // direction key
    } else if (code >= Keyboard.keys.LEFT && code <= Keyboard.keys.DOWN) {
      if (code === Keyboard.keys.RIGHT) {
        index++
      } else if (code === Keyboard.keys.UP) {
        index = this.getOtherLineIndex(-1)
        nextBlot = this.quill.getLeaf(index)[0]
      } else if (code === Keyboard.keys.DOWN) {
        index = this.getOtherLineIndex(1)
        nextBlot = this.quill.getLeaf(index)[0]
      }
      handled = true
    }

    if (handled) {
      evt.stopPropagation()
      evt.preventDefault()
    }

    if (nextBlot && this.resizer.judgeShow(nextBlot, nextBlot.domNode)) return

    this.quill.setSelection(index)
    this.resizer.hide()
  }

  getOtherLineIndex (dir) {
    let index = this.blot.offset(this.quill.scroll)
    const [line] = this.quill.getLine(index)
    const lineIndex = this.blot.offset(line) + 1

    const otherLine = dir > 0 ? line.next : line.prev

    if (otherLine) {
      let len = otherLine.length()
      if (otherLine.statics.blotName === 'block') len--
      index = otherLine.offset(this.quill.scroll) + Math.min(len, lineIndex)
    }

    return index
  }

  // 转发event到quill
  dispatchEvent (evt) {
    const event = new evt.constructor(evt)
    event.fromResize = true
    this.quill.root.dispatchEvent(event)
  }
}

Keyboard.keys = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46
}
